import type { MouseEvent } from "react";

/**
 * Navigation interne client-side (même convention que Navbar / Footer / Piliers).
 * Les liens commençant par "/" déclenchent un changement de route côté client.
 * Si l'URL contient une ancre, on y défile après changement de route.
 * Les ancres pures (hash uniquement) utilisent le défilement natif.
 */
export function navigateTo(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("/")) {
    event.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new Event("routechange"));
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const id = href.slice(hashIndex + 1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }
}