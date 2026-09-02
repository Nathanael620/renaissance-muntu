export type ApiErrorKind =
  | "configuration"
  | "network"
  | "validation"
  | "rate_limit"
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
  if (!apiBaseUrl) {
    throw new ApiError("configuration", "L'URL de l'API n'est pas configurée.");
  }

  return `${apiBaseUrl}/${path.replace(/^\/+/, "")}`;
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
  if (status >= 500) {
    return new ApiError("server", "Le serveur rencontre un problème temporaire.", { status });
  }
  return new ApiError("http", fallback, { status });
}

export async function apiPost<TResponse>(path: string, payload: unknown): Promise<TResponse> {
  let response: Response;

  try {
    response = await fetch(buildApiUrl(path), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError("network", "Le backend est inaccessible.");
  }

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
