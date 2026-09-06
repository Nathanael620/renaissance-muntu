/**
 * Données de la page « Notre Équipe ».
 *
 * Les informations officielles (noms, fonctions, biographies, photographies)
 * seront fournies ultérieurement. Les entrées ci-dessous sont des PLACEHOLDERS :
 * elles peuvent être complétées ou supprimées sans modifier la structure de la page.
 *
 * ── Ajouter une photographie ──────────────────────────────────────────────
 * 1. Placez le fichier dans `public/images/equipe/` (ex. membre-01.jpg)
 * 2. Renseignez le champ `image` de la fiche : image: "/images/equipe/membre-01.jpg"
 * 3. Tant qu'une fiche a `image: null`, un cadre élégant « Photographie à venir »
 *    est affiché automatiquement (aucune image cassée possible).
 */

export type MembreStatut = "collectif" | "direction";

export interface MembreEquipe {
  /** Nom complet du membre — à renseigner. */
  name: string;
  /** Fonction officielle — à renseigner. */
  role: string;
  /** Courte présentation institutionnelle — à renseigner. */
  description: string;
  /** Domaines d'expertise (facultatif). */
  expertises: string[];
  /** Chemin de la photographie — `null` tant que la photo officielle n'est pas fournie. */
  image: string | null;
  /** « collectif » (section Membres) ou « direction » (section Équipe dirigeante). */
  statut: MembreStatut;
}

/** Placeholder standard tant que les informations officielles ne sont pas fournies. */
export const equipePlaceholder = {
  name: "Nom à renseigner",
  role: "Fonction à renseigner",
  description: "Présentation à renseigner",
} as const;

const placeholderMember = (statut: MembreStatut): MembreEquipe => ({
  name: equipePlaceholder.name,
  role: equipePlaceholder.role,
  description: equipePlaceholder.description,
  expertises: [],
  image: null,
  statut,
});

/**
 * Membres de l'équipe — entrées de démonstration clairement identifiées.
 * Complétez / supprimez ces fiches selon la composition officielle.
 * Pour déclarer un membre de l'équipe dirigeante, utilisez `statut: "direction"`.
 */
export const teamMembers: MembreEquipe[] = [
  placeholderMember("collectif"),
  placeholderMember("collectif"),
  placeholderMember("collectif"),
  placeholderMember("collectif"),
];

/** Membres du collectif (section « Membres de l'équipe »). */
export const equipeCollectif = teamMembers.filter(
  (membre) => membre.statut === "collectif",
);

/** Membres de l'équipe dirigeante (section « Équipe dirigeante »). */
export const equipeDirection = teamMembers.filter(
  (membre) => membre.statut === "direction",
);

/** Cibles de navigation des domaines d'engagement — routes EXISTANTES du site. */
export const equipePillarTargets: Record<string, string> = {
  "renaissance-des-peuples": "/#piliers",
  elimba: "/elimba",
  "transmission-muntu": "/transmission-muntu",
  "academie-muntu": "/academie-muntu",
  "bibliotheque-muntu": "/bibliotheque",
};

/** Compétences transverses de l'équipe — exprimées hors des cinq piliers officiels. */
export const equipeCompetencesTransverses = [
  "Dialogue",
  "Recherche",
  "Leadership",
  "Transmission des savoirs",
] as const;