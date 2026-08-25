export const openSocialModalEvent = "open-social-modal";
export const closeSocialModalEvent = "close-social-modal";

export function openSocialModal(title?: string) {
  window.dispatchEvent(
    new CustomEvent(openSocialModalEvent, { detail: { title } }),
  );
}

export function closeSocialModal() {
  window.dispatchEvent(new Event(closeSocialModalEvent));
}