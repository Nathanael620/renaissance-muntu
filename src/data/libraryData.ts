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
 *   => bouton « ACHETER » désactivé (« Achat disponible prochainement »).
 * - Le bouton « CONSULTER » ouvre la page détail : /bibliotheque/consulter/:id.
 */

import africainCover from "../assets/images/l-africain.jpeg";
import magnificatFrCover from "../assets/images/le-magnificat.jpeg";
import magnificatEnCover from "../assets/images/magnificat-en.jpeg";
import magnificatVeBackCover from "../assets/images/4eme_de_couverture_magnificat_ve.png";

/** Boutique officielle Chariow — ouverture dans un nouvel onglet. */
export const CHARIOW_STORE_URL =
  "https://ycjmkfmn.mychariow.com" as const;

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
  /** Visuel de la 4e de couverture — à fournir (placeholder en attendant). */
  backCover?: string;
  /** Texte de 4e de couverture / résumé (utilisé si pas d'image). */
  backCoverText?: string;
  language?: string;
  /** Prix en devise locale — non renseigné => « PRIX À DÉFINIR ». */
  price?: number;
  currency?: string;
  /** URL Chariow individuelle du livre — absente => bouton « ACHETER » désactivé. */
  shopUrl?: string;
  /** Description courte optionnelle (carte). */
  description?: string;
  /** Présentation détaillée optionnelle (page de consultation). */
  summary?: string;
  edition?: string;
  pages?: string;
  isbn?: string;
}

/** Résumé / 4e de couverture de « Le Magnificat de la pensée » (VF). */
const magnificatVfBackCoverText = `Pourquoi autant de sang, de désolation, de destruction, de chaos partout où passe cette race dite supérieure ? Sur quoi ces élites leucodermes basent-elles leur prétendue supériorité ? Est-ce de cette barbarie que ce crétin de Jules Ferry parlait lorsqu'il affirmait que sa race supérieure avait le droit et le devoir de civiliser les races inférieures ? Une civilisation qui est synonyme de pillages, de massacres, de viols, d'occupation, de vols et de bases militaires chez autrui, est-ce bien ce à quoi faisait allusion le colonisateur français Jules Ferry ? Ce court règne occidental par le chaos va-t-il les rattraper ? Certainement. Aussi certain que personne ne peut échapper à la Loi universelle d'actions-réactions.

À l'heure du renversement des pôles de puissance à travers le monde, les plus puissants d'hier le sont de moins en moins. Mon intention derrière mon écriture est d'informer, de prévenir et non d'inciter à la révolte, à la violence ou à toute autre forme d'action destructrice. Ne dit-on pas que posséder la connaissance, c'est posséder le pouvoir ? Ce pouvoir et ce respect tant recherchés par les jeunes sont des informations.

Mon travail cible tous les peuples sans aucune discrimination qui acceptent de cultiver la non-violence. L'objectif est d'amener ceux qui ont tourné le dos crimes de leurs élites à prendre conscience de certaines actions horriles contre les populations et les gouvernements des pays étrangers. Ce qui explique pourquoi j'ai choisi de citer certaines personnes en entier afin d'éviter toute interprétation.`;

export const libraryItems: LibraryItem[] = [
  {
    id: "livre-001",
    category: "livre",
    title: "Le Magnificat de la pensée blanche",
    author: "Oscar Elimby",
    cover: magnificatFrCover,
    language: "Français",
    price: 14000,
    currency: "FCFA",
    shopUrl: "https://ycjmkfmn.mychariow.com/prd_884nk6hy",
    edition: "Zero Revenge Books",
    pages: "312",
    backCoverText: magnificatVfBackCoverText,
    // summary: "..." // TODO: présentation détaillée
  },
  {
    id: "livre-002",
    category: "livre",
    title: "The Magnificate Of White Thought Manuscript",
    author: "Oscar Elimby",
    cover: magnificatEnCover,
    language: "English",
    price: 14000,
    currency: "FCFA",
    shopUrl: "https://ycjmkfmn.mychariow.com/prd_n8j2nhhx",
    edition: "Zero Revenge Books",
    pages: "290",
    backCover: magnificatVeBackCover,
    // summary: "..." // TODO: présentation détaillée
  },
  {
    id: "livre-003",
    category: "livre",
    title: "L'Africain plus Résistant que le titane",
    author: "Oscar Elimby",
    cover: africainCover,
    language: "Français",
    price: 14000,
    currency: "FCFA",
    edition: "Zero Revenge Books",
    // TODO: URL Chariow de ce livre dès qu'elle sera fournie :
    // shopUrl: "https://app.chariow.com/...",
    // backCover: ... // TODO: visuel de la 4e de couverture à fournir
    // summary: "..." // TODO: présentation détaillée
  },
];

/** Catalogue « Livres » — la page ne rend que cette liste. */
export const libraryBooks = libraryItems.filter(
  (item) => item.category === "livre",
);