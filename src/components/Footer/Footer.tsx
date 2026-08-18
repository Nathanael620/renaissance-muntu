import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import logo from "../../assets/icons/renaissance.png";
import { brand, contact, footerLinks } from "../../data/siteData";

/** Icônes réseaux (Lucide n'exporte plus les marques) */
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1z" />
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

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.04C6.48 2.04 2 6.52 2 12.04c0 2.12.66 4.08 1.8 5.7L2 22l4.4-1.16c1.58.98 3.44 1.58 5.6 1.58 5.52 0 10-4.48 10-10 0-5.52-4.48-10-10-10zm5.2 13.3c-.18.5-1.06 1.04-1.6 1.18-.42.11-.86.12-1.28.02-1.04-.24-2.34-.96-3.86-2.48-1.5-1.5-2.22-2.8-2.48-3.84-.1-.42-.09-.86.02-1.28.14-.54.68-1.42 1.18-1.6.28-.1.6-.08.87.05.23.11.5.32.81.63.32.32.57.68.76.93.18.24.3.4.44.44.13.04.28.02.5-.06.22-.09 1.18-.44 1.36-.49.18-.05.31-.08.45.06.14.14.5.47.81.78.3.32.54.61.63.82.1.27.12.6.04.88-.08.28-.45 1.1-.49 1.28-.04.22-.1.37-.02.5.04.12.2.26.44.44.25.19.61.44.93.76.31.31.52.58.63.81.13.27.15.6.05.88z" />
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

/**
 * Footer institutionnel — maquette + DCFT
 */
export default function Footer() {
  const [showVideosModal, setShowVideosModal] = useState(false);

  const socialVideoLinks = {
    facebook: "https://www.facebook.com/share/1AX46GCkQg/",
    tiktok: "https://www.tiktok.com/@pour.la.renaissan?_r=1&_t=ZS-98qX3f0yDEl",
    youtube: "https://youtube.com/@pourlarenaissancedumuntu?si=7Ji0YRGdDkcPW0Ml",
    instagram: "https://www.instagram.com/pourlarenaissancedu?utm_source=qr&igsh=MXh5dTFqZThyZjF4cw==",
  } as const;
  return (
    <>
      <footer id="contact" className="bg-vert-fonce text-white" role="contentinfo">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-6 lg:gap-6 lg:px-10 lg:py-16">
        {/* Marque + réseaux */}
        <div className="lg:col-span-1">
          <div className="inline-block rounded-md bg-white px-2 py-2">
            <img src={logo} alt={brand.name} className="h-14 w-auto object-contain" />
          </div>
          <p className="mt-4 font-sans text-xs leading-relaxed text-white/70">
            {brand.slogan}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Réseaux sociaux">
            {[
              { Icon: IconFacebook, label: "Facebook", href: "https://www.facebook.com/share/1AX46GCkQg/" },
              { Icon: IconX, label: "X", href: "https://x.com/Elimba_Dikalo" },
              { Icon: IconLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/pour-la-renaissance-du-muntu-532a1542a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { Icon: IconYoutube, label: "YouTube", href: "https://youtube.com/@pourlarenaissancedumuntu?si=7Ji0YRGdDkcPW0Ml" },
              { Icon: IconInstagram, label: "Instagram", href: "https://www.instagram.com/pourlarenaissancedu?utm_source=qr&igsh=MXh5dTFqZThyZjF4cw==" },
              { Icon: IconTikTok, label: "TikTok", href: "https://www.tiktok.com/@pour.la.renaissan?_r=1&_t=ZS-98qX3f0yDEl" },
            ].map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-or hover:text-or"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterCol title="L'Institut" links={footerLinks.institut} />
        <FooterCol title="Nos piliers" links={footerLinks.departements} />
        <FooterCol
          title="Ressources"
          links={footerLinks.ressources}
          onVideosClick={() => setShowVideosModal(true)}
        />
        <FooterCol title="Actualités" links={footerLinks.actualites} />

        {/* Contact */}
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-or-clair">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 font-sans text-sm text-white/85">
            <li className="flex items-start gap-2 min-w-0">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-or" aria-hidden />
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-or transition-colors break-all"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-or" aria-hidden />
              <span>{contact.phone}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-or" aria-hidden />
              <span>{contact.address}</span>
            </li>
          </ul>
          <a
            href={`https://wa.me/15142243872`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Contacter via WhatsApp ${contact.phone}`}
            className="btn-or mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-wide"
          >
            <IconWhatsApp className="h-3.5 w-3.5" />
            Nous écrire
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-4 py-4 text-center font-sans text-[11px] text-white/60 md:flex-row md:px-8 lg:px-10 md:text-left">
          <p>© {new Date().getFullYear()} {brand.name} — Tous droits réservés.</p>
          <nav aria-label="Liens légaux" className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href="#mentions" className="hover:text-or transition-colors">
              Mentions légales
            </a>
            <a href="#confidentialite" className="hover:text-or transition-colors">
              Politique de confidentialité
            </a>
            <a href="#plan" className="hover:text-or transition-colors">
              Plan du site
            </a>
          </nav>
        </div>
      </div>
      </footer>
        {showVideosModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowVideosModal(false)}
          >
            <div
              className="max-w-sm rounded-lg bg-white p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
          <h3 className="mb-4 text-lg font-semibold">Voir les vidéos sur</h3>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => window.open(socialVideoLinks.facebook, "_blank", "noopener")}
              className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Facebook
            </button>
            <button
              type="button"
              onClick={() => window.open(socialVideoLinks.tiktok, "_blank", "noopener")}
              className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
            >
              TikTok
            </button>
            <button
              type="button"
              onClick={() => window.open(socialVideoLinks.youtube, "_blank", "noopener")}
              className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
            >
              YouTube
            </button>
            <button
              type="button"
              onClick={() => window.open(socialVideoLinks.instagram, "_blank", "noopener")}
              className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Instagram
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowVideosModal(false)}
            className="mt-2 inline-flex items-center justify-center rounded-md bg-vert px-4 py-2 text-sm text-white"
          >
            Fermer
          </button>
        </div>
      </div>
      )}
    </>
  );
}

function FooterCol({
  title,
  links,
  onVideosClick,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  onVideosClick?: () => void;
}) {
  return (
    <div className="border-white/10 lg:border-l lg:border-or/20 lg:pl-5">
      <h3 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-or-clair">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={(event) => {
                if (link.label === "Vidéos" && onVideosClick) {
                  event.preventDefault();
                  onVideosClick();
                  return;
                }
                if (link.href.startsWith("/")) {
                  event.preventDefault();
                  window.history.pushState({}, "", link.href);
                  window.dispatchEvent(new Event("routechange"));
                  // Si le lien pointe vers une ancre de la page d'accueil
                  // (ex. /#vision), on défile vers elle après le changement de route.
                  const hashIndex = link.href.indexOf("#");
                  if (hashIndex !== -1) {
                    const id = link.href.slice(hashIndex + 1);
                    setTimeout(() => {
                      const el = document.getElementById(id);
                      if (el)
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 80);
                  }
                }
              }}
              className="font-sans text-sm text-white/80 transition-colors hover:text-or"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
