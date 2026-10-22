import { adminRequest, initializeCsrf } from "./apiClient";

export type AdminRole = "super_admin" | "admin" | "editor" | "viewer";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
};

const adminApi = "/api/admin/v1";

export async function getCurrentAdmin(): Promise<AdminUser> {
  const response = await adminRequest<{ user: AdminUser }>(`${adminApi}/me`, "GET");
  return response.user;
}

export async function loginAdmin(payload: {
  email: string;
  password: string;
  remember: boolean;
}): Promise<AdminUser> {
  await initializeCsrf();
  const response = await adminRequest<{ user: AdminUser }>(`${adminApi}/login`, "POST", payload);
  return response.user;
}

export async function logoutAdmin(): Promise<void> {
  await initializeCsrf();
  await adminRequest<void>(`${adminApi}/logout`, "POST", {});
}

export async function acceptAdminInvitation(payload: {
  token: string;
  password: string;
  password_confirmation: string;
}): Promise<{ message: string; email: string }> {
  await initializeCsrf();
  return adminRequest(`${adminApi}/invitations/accept`, "POST", payload);
}

export function adminGet<TResponse>(path: string): Promise<TResponse> {
  return adminRequest<TResponse>(`${adminApi}${path}`, "GET");
}

export async function adminWrite<TResponse>(
  path: string,
  method: "POST" | "PATCH" | "PUT" | "DELETE",
  payload?: unknown,
): Promise<TResponse> {
  await initializeCsrf();
  return adminRequest<TResponse>(`${adminApi}${path}`, method, payload);
}
