/**
 * supportService — abstraction pour gestion des dons et demandes de partenariat
 */
import { apiPost } from "./apiClient";

export function handleDonation(): void {
  // TODO: Replace with PayPal integration when account is configured.
  // Use PAYPAL_DONATION_URL from config when available.
  // TODO: Replace with the official PayPal donation URL/button once the PayPal account is configured.
  // For now, show a user-friendly message.
  window.alert("Le paiement en ligne sera bientôt disponible. Merci pour votre soutien !");
}

/**
 * When PayPal account is configured, set the donation URL here (or in a central config).
 * Example: export const PAYPAL_DONATION_URL = "https://www.paypal.com/donate?hosted_button_id=...";
 * Leave undefined until the real URL is provided.
 */
export const PAYPAL_DONATION_URL: string | undefined = undefined;

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
