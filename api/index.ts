const allowedMethods = new Set(["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"]);
const forwardedRequestHeaders = [
  "accept",
  "content-type",
  "cookie",
  "origin",
  "referer",
  "user-agent",
  "x-requested-with",
  "x-xsrf-token",
];
const forwardedResponseHeaders = ["content-type", "vary"];

function jsonError(message: string, status: number): Response {
  return Response.json({ message }, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const requestUrl = new URL(request.url);
    const proxyPath = requestUrl.searchParams.get("proxyPath");

    if (!proxyPath || /%2e|%2f|%5c/i.test(proxyPath)) {
      return jsonError("Chemin API invalide.", 400);
    }

    const segments = proxyPath.split("/");
    if (
      segments.some((segment) => !segment || segment === "." || segment === "..") ||
      !(proxyPath.startsWith("api/") || proxyPath.startsWith("sanctum/"))
    ) {
      return jsonError("Chemin API invalide.", 400);
    }

    if (!allowedMethods.has(request.method)) {
      return jsonError("Method not allowed.", 405);
    }

    const requestOrigin = request.headers.get("origin");
    if (requestOrigin && requestOrigin !== requestUrl.origin) {
      return jsonError("Origin not allowed.", 403);
    }

    const configuredOrigin = process.env.LARAVEL_API_ORIGIN;
    if (!configuredOrigin) {
      return jsonError("The API backend is not configured.", 503);
    }

    let upstreamOrigin: URL;
    try {
      upstreamOrigin = new URL(configuredOrigin);
    } catch {
      return jsonError("The API backend configuration is invalid.", 500);
    }

    if (
      upstreamOrigin.protocol !== "https:" ||
      upstreamOrigin.username ||
      upstreamOrigin.password ||
      upstreamOrigin.pathname !== "/" ||
      upstreamOrigin.search ||
      upstreamOrigin.hash
    ) {
      return jsonError("The API backend configuration is invalid.", 500);
    }

    const upstreamUrl = new URL(`/${proxyPath}`, upstreamOrigin);
    requestUrl.searchParams.forEach((value, key) => {
      if (key !== "proxyPath") {
        upstreamUrl.searchParams.append(key, value);
      }
    });

    const headers = new Headers();
    for (const name of forwardedRequestHeaders) {
      const value = request.headers.get(name);
      if (value) {
        headers.set(name, value);
      }
    }

    try {
      const upstreamResponse = await fetch(upstreamUrl, {
        method: request.method,
        headers,
        body: request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.arrayBuffer(),
        cache: "no-store",
        redirect: "manual",
      });

      if (upstreamResponse.status >= 300 && upstreamResponse.status < 400) {
        return jsonError("The API backend returned an unexpected redirect.", 502);
      }

      const responseHeaders = new Headers({ "Cache-Control": "private, no-store" });
      for (const name of forwardedResponseHeaders) {
        const value = upstreamResponse.headers.get(name);
        if (value) {
          responseHeaders.set(name, value);
        }
      }
      for (const cookie of upstreamResponse.headers.getSetCookie()) {
        const secureCookie =
          requestUrl.protocol === "https:" && !/(?:^|;)\s*secure(?:;|$)/i.test(cookie)
            ? `${cookie}; Secure`
            : cookie;
        responseHeaders.append("Set-Cookie", secureCookie);
      }

      return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        headers: responseHeaders,
      });
    } catch (error) {
      console.error("Laravel API proxy request failed.", {
        method: request.method,
        error: error instanceof Error ? error.name : "Unknown upstream error",
      });

      return jsonError("The API backend is unavailable.", 502);
    }
  },
};
