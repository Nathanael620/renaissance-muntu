/**
 * Bibliothèque du Muntu — données des ouvrages (100 % front-end).
 *
 * Architecture extensible : seule la catégorie "livre" est implémentée.
 * Les autres catégories (essais, manifestes, vidéos, podcasts,
 * études & recherches) pourront être ajoutées plus tard en enrichissant
 * `libraryItems`, sans toucher aux composants.
 *
 * Règles :
 * - Les prix ne sont jamais inventés : non renseigné => « PRIX À DÉFINIR ».
 * - Les URLs Chariow individuelles ne sont jamais inventées : non renseignée
 *   => bouton « LIRE » désactivé (« Lien disponible prochainement »).
 */

import africainCover from "../assets/images/L'Africain.jpeg";
import magnificatFrCover from "../assets/images/Le magnificat.jpeg";
import magnificatEnCover from "../assets/images/Magnificat en EN.jpeg";

/** Boutique officielle Chariow — ouverture dans un nouvel onglet. */
export const CHARIOW_STORE_URL =
  "https://app.chariow.com/stores/store_8wx36tfpvbwa/home" as const;

/**
 * TODO: renseigner ici les URLs Chariow individuelles de chaque livre
 * dès qu'elles seront fournies (ex. "https://.../livre-xyz").
 * Tant qu'elles sont absentes, le bouton « LIRE » reste désactivé.
 */
export type LibraryCategory =
  | "livre"
  | "essai"
  | "manifeste"
  | "video"
  | "podcast"
  | "etude-recherche";

export interface LibraryItem {
  id: string;
  category: LibraryCategory;
  title: string;
  /** À remplacer par le véritable auteur dès qu'il est communiqué. */
  author?: string;
  cover: string;
  language?: string;
  /** Prix en devise locale — non renseigné => « PRIX À DÉFINIR ». */
  price?: number;
  currency?: string;
  /** URL Chariow individuiael du livre — absente => bouton « LIRE » désactivé. */
  shopUrl?: string;
  /** Description courte optionnelle. */
  description?: string;
}

export const libraryItems: LibraryItem[] = [
  {
    id: "livre-001",
    category: "livre",
    title: "L'Africain",
    // TODO: renseigner l'auteur
    author: "À communiquer",
    cover: africainCover,
    language: "Français",
    // price: 5000, // TODO: renseigner le prix définitif (FCFA)
    currency: "FCFA",
    // shopUrl: "https://app.chariow.com/...", // TODO: URL Chariow du livre
  },
  {
    id: "livre-002",
    category: "livre",
    title: "Le Magnificat",
    // TODO: renseigner l'auteur
    author: "À communiquer",
    cover: magnificatFrCover,
    language: "Français",
    // price: 5000, // TODO: renseigner le prix définitif (FCFA)
    currency: "FCFA",
    // shopUrl: "https://app.chariow.com/...", // TODO: URL Chariow du livre
  },
  {
    id: "livre-003",
    category: "livre",
    title: "Magnificat",
    // TODO: renseigner l'auteur
    author: "À communiquer",
    cover: magnificatEnCover,
    language: "English",
    // price: 5000, // TODO: renseigner le prix définitif (FCFA)
    currency: "FCFA",
    // shopUrl: "https://app.chariow.com/...", // TODO: URL Chariow du livre
  },
];

/** Catalogue « Livres » — la page ne rend que cette liste. */
export const libraryBooks = libraryItems.filter(
  (item) => item.category === "livre",
);