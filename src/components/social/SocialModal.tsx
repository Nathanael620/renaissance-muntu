import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  closeSocialModal,
  closeSocialModalEvent,
  openSocialModalEvent,
} from "./socialModalEvents";

/** Icônes réseaux (Lucide n'exporte plus les marques). */
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9c0-.6.4-1 1-1z" />
    </svg>
  );
}
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconTikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
    </svg>
  );
}
function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12.2s0-3.2-.4-4.7c-.2-.8-.9-1.4-1.7-1.6C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.9.4c-.8.2-1.5.8-1.7 1.6C2 9 2 12.2 2 12.2s0 3.2.4 4.7c.2.8.9 1.4 1.7 1.6 1.7.4 7.9.4 7.9.4s6.2 0 7.9-.4c.8-.2 1.5-.8 1.7-1.6.4-1.5.4-4.7.4-4.7zM10 15.5v-6l5.2 3-5.2 3z" />
    </svg>
  );
}
function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 2h3.4l-7.4 8.5L22.8 22h-6.7l-5.2-7.2L4.7 22H1.3l7.9-9.1L1.2 2h6.9l4.7 6.5L18.9 2zm-1.2 18h1.9L7.1 3.9H5.1L17.7 20z" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.8h2.9v9.8H5.5V9.8Zm4.7 0h2.8v1.34h.04c.39-.75 1.35-1.54 2.78-1.54 2.97 0 3.52 1.95 3.52 4.48v6.52h-2.9V14.8c0-1.12-.02-2.56-1.56-2.56-1.57 0-1.81 1.22-1.81 2.48v4.87H10.2V9.8Z" />
    </svg>
  );
}

const socialNetworks = [
  { icon: IconFacebook, label: "Facebook", href: "https://www.facebook.com/share/1AX46GCkQg/" },
  { icon: IconX, label: "X", href: "https://x.com/Elimba_Dikalo" },
  { icon: IconLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/pour-la-renaissance-du-muntu-532a1542a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { icon: IconYoutube, label: "YouTube", href: "https://youtube.com/@pourlarenaissancedumuntu?si=7Ji0YRGdDkcPW0Ml" },
  { icon: IconInstagram, label: "Instagram", href: "https://www.instagram.com/pourlarenaissancedu?utm_source=qr&igsh=MXh5dTFqZThyZjF4cw==" },
  { icon: IconTikTok, label: "TikTok", href: "https://www.tiktok.com/@pour.la.renaissan?_r=1&_t=ZS-98qX3f0yDEl" },
];

/**
 * SocialModal — modal global « Choisissez un réseau ».
 * S'ouvre via openSocialModal() (event global), monté dans MainLayout.
 */
export default function SocialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>("Choisissez le réseau où nous suivre");

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent).detail as { title?: string } | undefined;
      if (detail?.title) setTitle(detail.title);
      setIsOpen(true);
    };
    const onClose = () => setIsOpen(false);
    window.addEventListener(openSocialModalEvent, onOpen);
    window.addEventListener(closeSocialModalEvent, onClose);
    return () => {
      window.removeEventListener(openSocialModalEvent, onOpen);
      window.removeEventListener(closeSocialModalEvent, onClose);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
      onClick={closeSocialModal}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeSocialModal}
          aria-label="Fermer"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-anthracite transition-colors hover:bg-creme hover:text-vert"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <h3 className="-mt-4 font-serif text-2xl font-semibold uppercase tracking-wide text-vert">
          {title}
        </h3>
        <p className="mt-2 font-sans text-sm text-anthracite/80">
          Sélectionnez le réseau de votre choix&nbsp;:
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {socialNetworks.map((network) => {
            const Icon = network.icon;
            return (
              <a
                key={network.label}
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-or/30 bg-creme px-4 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-vert transition-all duration-200 hover:border-or hover:bg-vert hover:text-white"
              >
                <Icon className="h-5 w-5" aria-hidden />
                {network.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}