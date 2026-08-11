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
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 9H3.5v12h3V9zM5 3.5A1.75 1.75 0 1 0 5 7a1.75 1.75 0 0 0 0-3.5zM20.5 21h-3v-6.2c0-1.7-.7-2.3-1.7-2.3s-1.9.8-1.9 2.4V21h-3V9h3v1.6c.6-.9 1.8-1.9 3.6-1.9 2.4 0 3 1.6 3 4.5V21z" />
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

/**
 * Footer institutionnel — maquette + DCFT
 */
export default function Footer() {
  return (
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
              { Icon: IconFacebook, label: "Facebook" },
              { Icon: IconLinkedin, label: "LinkedIn" },
              { Icon: IconYoutube, label: "YouTube" },
              { Icon: IconInstagram, label: "Instagram" },
            ].map(({ Icon, label }) => (
              <li key={label}>
                <a
                  href="#contact"
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
        <FooterCol title="Nos départements" links={footerLinks.departements} />
        <FooterCol title="Ressources" links={footerLinks.ressources} />
        <FooterCol title="Actualités" links={footerLinks.actualites} />

        {/* Contact */}
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-or-clair">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 font-sans text-sm text-white/85">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-or" aria-hidden />
              <a href={`mailto:${contact.email}`} className="hover:text-or transition-colors">
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
            href={`mailto:${contact.email}`}
            className="btn-or mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-wide"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
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
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
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
