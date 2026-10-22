export type ApiErrorKind =
  | "configuration"
  | "network"
  | "validation"
  | "rate_limit"
  | "unauthorized"
  | "forbidden"
  | "csrf"
  | "server"
  | "http"
  | "unexpected_response";

export type ValidationErrors = Record<string, string[]>;

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly validationErrors?: ValidationErrors;

  constructor(
    kind: ApiErrorKind,
    message: string,
    options?: { status?: number; validationErrors?: ValidationErrors },
  ) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = options?.status;
    this.validationErrors = options?.validationErrors;
  }
}

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

function buildApiUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return new URL(path).toString();
  if (!apiBaseUrl) {
    throw new ApiError("configuration", "L'URL de l'API n'est pas configurée.");
  }

  const base = new URL(apiBaseUrl);
  let relativePath = path.replace(/^\/+/, "");
  let basePath = base.pathname.replace(/\/+$/, "");

  if (basePath.endsWith("/api") && relativePath.startsWith("sanctum/")) {
    basePath = basePath.slice(0, -4);
  } else if (basePath.endsWith("/api") && relativePath.startsWith("api/")) {
    relativePath = relativePath.slice(4);
  }

  base.pathname = `${basePath}/`.replace(/\/{2,}/g, "/");
  return new URL(relativePath, base).toString();
}

function getValidationErrors(body: unknown): ValidationErrors | undefined {
  if (!body || typeof body !== "object" || !("errors" in body)) return undefined;

  const errors = body.errors;
  if (!errors || typeof errors !== "object") return undefined;

  return Object.entries(errors).reduce<ValidationErrors>((result, [field, value]) => {
    if (Array.isArray(value)) {
      result[field] = value.filter((item): item is string => typeof item === "string");
    } else if (typeof value === "string") {
      result[field] = [value];
    }
    return result;
  }, {});
}

function getResponseMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "message" in body && typeof body.message === "string") {
    return body.message;
  }
  return fallback;
}

function createHttpError(status: number, body: unknown): ApiError {
  const fallback = "Le serveur n'a pas pu traiter la demande.";

  if (status === 422) {
    return new ApiError("validation", getResponseMessage(body, fallback), {
      status,
      validationErrors: getValidationErrors(body),
    });
  }
  if (status === 429) {
    return new ApiError("rate_limit", "Trop de demandes ont été envoyées.", { status });
  }
  if (status === 401) {
    return new ApiError("unauthorized", "Votre session a expiré. Veuillez vous reconnecter.", { status });
  }
  if (status === 403) {
    return new ApiError("forbidden", "Vous n'êtes pas autorisé à effectuer cette action.", { status });
  }
  if (status === 419) {
    return new ApiError("csrf", "La session de sécurité a expiré. Veuillez réessayer.", { status });
  }
  if (status >= 500) {
    return new ApiError("server", "Le serveur rencontre un problème temporaire.", { status });
  }
  return new ApiError("http", fallback, { status });
}

type RequestOptions = {
  credentials?: RequestCredentials;
  csrf?: boolean;
};

function getCsrfToken(): string | undefined {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="))
    ?.slice("XSRF-TOKEN=".length);

  return token ? decodeURIComponent(token) : undefined;
}

async function request<TResponse>(
  path: string,
  method: string,
  payload?: unknown,
  options: RequestOptions = {},
): Promise<TResponse> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (payload !== undefined) headers["Content-Type"] = "application/json";

  if (options.csrf) {
    const token = getCsrfToken();
    if (token) headers["X-XSRF-TOKEN"] = token;
  }

  let response: Response;

  try {
    response = await fetch(buildApiUrl(path), {
      method,
      credentials: options.credentials ?? "omit",
      headers,
      ...(payload === undefined ? {} : { body: JSON.stringify(payload) }),
    });
  } catch {
    throw new ApiError("network", "Le backend est inaccessible.");
  }

  if (response.status === 204) return undefined as TResponse;

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    if (!response.ok) throw createHttpError(response.status, undefined);
    throw new ApiError("unexpected_response", "La réponse du serveur est invalide.", {
      status: response.status,
    });
  }

  if (!response.ok) throw createHttpError(response.status, body);

  if (!body || typeof body !== "object") {
    throw new ApiError("unexpected_response", "La réponse du serveur est invalide.", {
      status: response.status,
    });
  }

  return body as TResponse;
}

export async function apiPost<TResponse>(path: string, payload: unknown): Promise<TResponse> {
  await initializeCsrf();
  return request<TResponse>(path, "POST", payload, {
    credentials: "include",
    csrf: true,
  });
}

export function apiGet<TResponse>(path: string): Promise<TResponse> {
  return request<TResponse>(path, "GET");
}

export async function initializeCsrf(): Promise<void> {
  try {
    const response = await fetch(buildApiUrl("/sanctum/csrf-cookie"), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw createHttpError(response.status, undefined);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("network", "Le backend est inaccessible.");
  }
}

export function adminRequest<TResponse>(
  path: string,
  method: string,
  payload?: unknown,
): Promise<TResponse> {
  return request<TResponse>(path, method, payload, {
    credentials: "include",
    csrf: method !== "GET" && method !== "HEAD",
  }).catch((error: unknown) => {
    if (
      error instanceof ApiError &&
      error.status === 401 &&
      !path.endsWith("/login") &&
      !path.endsWith("/invitations/accept")
    ) {
      window.dispatchEvent(new Event("admin-session-expired"));
    }
    throw error;
  });
}
