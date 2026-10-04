import type { MouseEvent } from "react";
import { navigateToPath } from "../routing/routes";

/**
 * Navigation interne client-side (même convention que Navbar / Footer / Piliers).
 * Les liens commençant par "/" déclenchent un changement de route côté client.
 * Si l'URL contient une ancre, on y défile après changement de route.
 * Les ancres pures (hash uniquement) utilisent le défilement natif.
 */
export function navigateTo(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("/")) {
    event.preventDefault();
    navigateToPath(href);
  }
}