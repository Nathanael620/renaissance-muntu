import { apiPost } from "./apiClient";

export type ContactMessagePayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export type ContactMessageResponse = {
  message?: string;
  [key: string]: unknown;
};

export function submitContactMessage(
  payload: ContactMessagePayload,
): Promise<ContactMessageResponse> {
  return apiPost<ContactMessageResponse>("/api/contact", payload);
}
