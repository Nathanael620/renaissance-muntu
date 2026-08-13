/**
 * supportService — abstraction pour gestion des dons et demandes de partenariat
 * TODO: brancher l'API PayPal / backend réel plus tard.
 */

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

export async function submitPartnershipRequest(_data: PartnershipRequest): Promise<{ ok: boolean }>{
  // TODO: Implement API call to submit partnership request.
  // This function is a stub to be replaced by a real POST to the backend.
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 800));
}
