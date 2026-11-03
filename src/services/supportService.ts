/**
 * supportService — abstraction pour gestion des dons et demandes de partenariat
 */
import { apiGet, apiPost } from "./apiClient";

export const DONATION_CURRENCY =
  import.meta.env.VITE_DONATION_CURRENCY?.trim().toUpperCase() || "CAD";

export function handleDonation(): void {
  const donationForm = document.getElementById("donation-form");
  donationForm?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export type DonationCheckoutPayload = {
  donor_name: string;
  donor_email: string;
  donor_address: string | null;
  donor_city: string | null;
  donor_province: string | null;
  donor_postal_code: string | null;
  donor_country: string | null;
  amount: number;
};

export function generateDonationCheckoutIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);
    return `checkout-${Array.from(buffer, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  }

  return `checkout-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;
}

export type DonationCheckoutResponse = {
  message: string;
  checkout_url: string;
  reference: string;
};

export type DonationStatus = "completed" | "pending" | "not_completed";

export async function getDonationStatus(sessionId: string): Promise<DonationStatus> {
  const response = await apiGet<{ status: DonationStatus }>(
    `/api/donations/status/${encodeURIComponent(sessionId)}`,
  );

  if (!["completed", "pending", "not_completed"].includes(response.status)) {
    throw new Error("Le statut du paiement est invalide.");
  }

  return response.status;
}

export async function createDonationCheckout(
  payload: DonationCheckoutPayload,
  idempotencyKey: string,
): Promise<DonationCheckoutResponse> {
  const response = await apiPost<DonationCheckoutResponse>(
    "/api/donations/checkout-session",
    payload,
    { "Idempotency-Key": idempotencyKey },
  );

  if (
    typeof response.checkout_url !== "string" ||
    !response.checkout_url ||
    typeof response.reference !== "string" ||
    !response.reference
  ) {
    throw new Error("La réponse du serveur est incomplète.");
  }

  return response;
}

export type PartnershipRequest = {
  fullName: string;
  organization?: string;
  email: string;
  phone?: string;
  partnershipType?: string;
  message?: string;
};

/**
 * Soumet une demande de partenariat au backend Laravel.
 *
 * Les champs `fullName`/`partnershipType` propres au formulaire sont convertis
 * ici en `name`/`partnership_type` attendus par l'API.
 */
export async function submitPartnershipRequest(data: PartnershipRequest): Promise<{ ok: boolean }> {
  const payload = {
    name: data.fullName,
    organization: data.organization ?? "",
    email: data.email,
    phone: data.phone ?? "",
    partnership_type: data.partnershipType ?? "",
    message: data.message ?? "",
  };

  await apiPost("/api/partnerships", payload);

  return { ok: true };
}
