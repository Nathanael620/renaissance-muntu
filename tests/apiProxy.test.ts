import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { afterEach, test } from "node:test";

const originalFetch = globalThis.fetch;
const originalBackendOrigin = process.env.LARAVEL_API_ORIGIN;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalBackendOrigin === undefined) {
    delete process.env.LARAVEL_API_ORIGIN;
  } else {
    process.env.LARAVEL_API_ORIGIN = originalBackendOrigin;
  }
});

test("routes API and Sanctum paths to the proxy before the SPA fallback", () => {
  const vercelConfig = JSON.parse(
    readFileSync(new URL("../vercel.json", import.meta.url), "utf8"),
  ) as {
    rewrites: Array<{ source: string; destination: string }>;
  };
  const apiRewrites = vercelConfig.rewrites.slice(0, 2);
  const spaFallback = vercelConfig.rewrites.at(-1);

  assert.equal(existsSync(new URL("../api/index.ts", import.meta.url)), true);
  assert.deepEqual(apiRewrites, [
    {
      source: "/api/sanctum/:path*",
      destination: "/api?proxyPath=sanctum/:path*",
    },
    {
      source: "/api/:path*",
      destination: "/api?proxyPath=api/:path*",
    },
  ]);
  assert.deepEqual(spaFallback, {
    source: "/(.*)",
    destination: "/index.html",
  });

  const cases = [
    {
      path: "/api/admin/v1/me",
      source: apiRewrites[1].source,
      destination: apiRewrites[1].destination,
      expected: "/api?proxyPath=api/admin/v1/me",
    },
    {
      path: "/api/sanctum/csrf-cookie",
      source: apiRewrites[0].source,
      destination: apiRewrites[0].destination,
      expected: "/api?proxyPath=sanctum/csrf-cookie",
    },
  ];

  for (const { path, source, destination, expected } of cases) {
    const prefix = source.slice(0, source.indexOf(":path*"));
    assert.ok(path.startsWith(prefix));
    assert.equal(destination.replace(":path*", path.slice(prefix.length)), expected);
  }
});

test("proxies CSRF and login requests with same-origin cookies", async () => {
  process.env.LARAVEL_API_ORIGIN = "https://backend.example.test";
  const upstreamRequests: Array<{ url: URL; init: RequestInit }> = [];
  globalThis.fetch = async (input, init) => {
    const url = new URL(input.toString());
    upstreamRequests.push({ url, init: init ?? {} });

    if (url.pathname === "/sanctum/csrf-cookie") {
      const headers = new Headers();
      headers.append("Set-Cookie", "XSRF-TOKEN=csrf; Path=/; SameSite=Lax");
      headers.append("Set-Cookie", "laravel-session=session; Path=/; HttpOnly; SameSite=Lax");
      return new Response(null, { status: 204, headers });
    }

    return Response.json({ user: { id: 7 } }, { status: 200 });
  };

  const csrfResponse = await (await import("../api/index.ts")).default.fetch(
    new Request("https://renaissance-muntu.vercel.app/api?proxyPath=sanctum%2Fcsrf-cookie", {
      headers: { origin: "https://renaissance-muntu.vercel.app" },
    }),
  );

  assert.equal(csrfResponse.status, 204);
  assert.equal(upstreamRequests[0].url.pathname, "/sanctum/csrf-cookie");
  assert.equal(csrfResponse.headers.getSetCookie().length, 2);
  assert.ok(csrfResponse.headers.getSetCookie().every((cookie) => /;\s*Secure(?:;|$)/i.test(cookie)));

  const loginResponse = await (await import("../api/index.ts")).default.fetch(
    new Request("https://renaissance-muntu.vercel.app/api?proxyPath=api%2Fadmin%2Fv1%2Flogin&page=2", {
      method: "POST",
      headers: {
        origin: "https://renaissance-muntu.vercel.app",
        cookie: "XSRF-TOKEN=csrf; laravel-session=session",
        "x-xsrf-token": "csrf",
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: "test@example.invalid", password: "not-a-real-password" }),
    }),
  );

  assert.equal(loginResponse.status, 200);
  assert.equal(upstreamRequests[1].url.pathname, "/api/admin/v1/login");
  assert.equal(upstreamRequests[1].url.searchParams.get("page"), "2");
  assert.equal(
    new Headers(upstreamRequests[1].init.headers).get("cookie"),
    "XSRF-TOKEN=csrf; laravel-session=session",
  );
  assert.equal(new Headers(upstreamRequests[1].init.headers).get("x-xsrf-token"), "csrf");
  assert.deepEqual(await loginResponse.json(), { user: { id: 7 } });
});

test("rejects cross-origin and invalid proxy requests", async () => {
  process.env.LARAVEL_API_ORIGIN = "https://backend.example.test";
  let upstreamCalled = false;
  globalThis.fetch = async () => {
    upstreamCalled = true;
    return Response.json({});
  };
  const proxy = (await import("../api/index.ts")).default;

  const crossOriginResponse = await proxy.fetch(
    new Request("https://renaissance-muntu.vercel.app/api?proxyPath=api%2Fadmin%2Fv1%2Flogout", {
      method: "POST",
      headers: { origin: "https://attacker.example" },
    }),
  );
  const traversalResponse = await proxy.fetch(
    new Request("https://renaissance-muntu.vercel.app/api?proxyPath=api%2F..%2Fadmin"),
  );

  assert.equal(crossOriginResponse.status, 403);
  assert.equal(traversalResponse.status, 400);
  assert.equal(upstreamCalled, false);
});
