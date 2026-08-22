import { useEffect, useId, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import logo from "../../assets/icons/renaissance.png";
import { brand, navLinks } from "../../data/siteData";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { cn } from "../../utils/cn";
import SupportButton from "../support/SupportButton";

/**
 * Navbar — maquette2 desktop (overlay hero) + mobile (barre blanche + menu).
 * Sticky selon DCFT §9.1.
 */
export default function Navbar() {
  const scrolled = useScrollPosition(40);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  /* Ferme le menu mobile au resize ≥ 1024px */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Bloque le scroll body quand le drawer est ouvert */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        /* Mobile : fond blanc solide (maquette) */
        "bg-white lg:bg-transparent",
        /* Desktop scroll : fond vert semi-opaque pour lisibilité */
        scrolled && "lg:bg-vert/90 lg:backdrop-blur-sm lg:shadow-md",
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2.5 md:px-6 lg:px-8 lg:py-3">
        {/* ——— Logo ——— */}
        <a
          href="#accueil"
          className="flex shrink-0 items-center rounded-sm bg-white px-2 py-1.5 shadow-sm transition-opacity hover:opacity-90"
          aria-label={brand.name}
        >
          <img
            src={logo}
            alt={brand.name}
            className="h-12 w-auto object-contain md:h-14 lg:h-[60px]"
          />
        </a>

        {/* ——— Liens desktop (≥ 1024px) ——— */}
        <nav
          className="hidden flex-1 items-center justify-center lg:flex"
          aria-label="Navigation principale"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 xl:gap-x-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    if (link.href.startsWith("/")) {
                      event.preventDefault();
                      window.history.pushState({}, "", link.href);
                      window.dispatchEvent(new Event("routechange"));
                      // If the link contains a hash, attempt to scroll to the target
                      const hashIndex = link.href.indexOf("#");
                      if (hashIndex !== -1) {
                        const id = link.href.slice(hashIndex + 1);
                        setTimeout(() => {
                          const el = document.getElementById(id);
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 80);
                      }
                    }
                  }}
                  className={cn(
                    "font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-white",
                    "border-b-2 border-transparent pb-0.5 transition-colors duration-200",
                    "hover:border-or hover:text-or-clair",
                    link.label === "ACCUEIL" && "border-or",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ——— CTA + burger ——— */}
        <div className="flex items-center gap-2 md:gap-3">
          <SupportButton
            className={cn(
              "btn-or hidden items-center gap-2 rounded-full px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-wide shadow-md sm:inline-flex",
              "md:px-5 md:text-xs",
            )}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/80">
              <Heart className="h-3 w-3 fill-white text-white" aria-hidden />
            </span>
            <span className="hidden xl:inline">Soutenir le Mouvement</span>
            <span className="xl:hidden">Soutenir le Mouvement</span>
          </SupportButton>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-anthracite transition-colors hover:bg-creme lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ——— Menu mobile / tablette ——— */}
      <div
        id={menuId}
        className={cn(
          "lg:hidden overflow-hidden border-t border-or/20 bg-white transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Navigation mobile" className="px-4 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    if (link.href.startsWith("/")) {
                      event.preventDefault();
                      window.history.pushState({}, "", link.href);
                      window.dispatchEvent(new Event("routechange"));
                      const hashIndex = link.href.indexOf("#");
                      if (hashIndex !== -1) {
                        const id = link.href.slice(hashIndex + 1);
                        setTimeout(() => {
                          const el = document.getElementById(id);
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 80);
                      }
                    }
                    setOpen(false);
                  }}
                  className="block rounded-md px-3 py-3 font-sans text-sm font-medium uppercase tracking-wide text-vert transition-colors hover:bg-creme hover:text-or"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <SupportButton
            className="btn-or mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-sans text-xs font-semibold uppercase tracking-wide"
            onClick={() => setOpen(false)}
          >
            <Heart className="h-4 w-4 fill-white text-white" aria-hidden />
            Soutenir le Mouvement
          </SupportButton>
        </nav>
      </div>
    </header>
  );
}
