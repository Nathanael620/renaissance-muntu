export const openContactModalEvent = "open-contact-modal";

export function requestContactModal() {
  window.dispatchEvent(new Event(openContactModalEvent));
}
