/**
 * Données institutionnelles — alignées DCFT §3, §6, §7 et maquette2
 */

export const brand = {
  name: "POUR LA RENAISSANCE DU MUNTU",
  shortName: "MUNTU",
  tagline: "Dignité • Conscience • Éveil",
  slogan: "Une vision Africaine de la renaissance de l'etre humain, des peuples et de la civilisation.",
  citation:
    "La renaissance des peuples commence toujours par la renaissance de la conscience.",
} as const;

/** Liens de navigation principale (maquette navbar) */
export const navLinks = [
  { label: "ACCUEIL", href: "/" },
  { label: "VISION", href: "/#objectifs" },
  { label: "NOS PILIERS", href: "/#piliers" },
  { label: "BIBLIOTHÈQUE", href: "#bibliotheque" },
  { label: "ACADÉMIE", href: "#academie" },
  { label: "TRANSMISSION", href: "#transmission" },
  { label: "ACTUALITÉS", href: "#actualites" },
  { label: "RESSOURCES", href: "#ressources" },
  { label: "CONTACT", href: "#contact" },
] as const;

export const heroContent = {
  titleLines: ["POUR LA", "RENAISSANCE", "DU MUNTU"],
  subtitle:
    "Une vision africaine de la renaissance de l'être humain, des peuples et de la civilisation.",
  body: "Nous croyons que les grandes transformations commencent toujours par une transformation intérieure. Aucun peuple ne peut bâtir une paix durable sans vérité. Aucune nation ne peut s'élever sans responsabilité. Aucune civilisation ne peut traverser les siècles sans transmettre ce qui nourrit son âme.",
  ctaPrimary: "DÉCOUVRIR LA VISION",
  ctaSecondary: "EXPLORER NOS PILIERS",
  pillarCard: {
    label: "PILIER FONDATEUR",
    title: "ELIMB'A DIKALO",
    tagline: "Soyez le cœur battant de notre vision",
    keywords: "DIALOGUE • RESPONSABILITÉ • ÉCOLOGIE SPIRITUELLE DES PEUPLES",
    cta: "EN SAVOIR PLUS",
  },
} as const;

/** Les 5 piliers — ordre officiel DCFT §7 */
export const pillars = [
  {
    id: 1,
    slug: "renaissance-des-peuples",
    title: "RENAISSANCE DES PEUPLES",
    themes: ["Culture", "Traditions", "Patrimoine", "Décolonisation des consciences"],
    image: "renaissance.png",
  },
  {
    id: 2,
    slug: "elimba",
    title: "ELIMB'A DIKALO",
    themes: ["Dialogue", "Responsabilité", "Écologie spirituelle des peuples"],
    image: "elimba.png",
  },
  {
    id: 3,
    slug: "transmission-muntu",
    title: "TRANSMISSION DU NTU",
    themes: ["Famille", "Jeunesse", "Éducation"],
    image: "transmission.png",
  },
  {
    id: 4,
    slug: "academie-muntu",
    title: "ACADÉMIE DU MUNTU",
    themes: ["Conférences", "Formations", "Leadership"],
    image: "academie.png",
  },
  {
    id: 5,
    slug: "bibliotheque-muntu",
    title: "BIBLIOTHÈQUE DU MUNTU",
    themes: ["Livres", "Essais", "Manifestes", "Recherche"],
    image: "bibliotheque.png",
  },
] as const;

export const architectureItems = [
  {
    title: "POUR LA RENAISSANCE DU MUNTU",
    subtitle: "(L'INSTITUT)",
    themes: [] as string[],
  },
  {
    title: "RENAISSANCE DES PEUPLES",
    subtitle: "",
    themes: ["Culture", "Traditions", "Patrimoine", "Décolonisation des consciences"],
  },
  {
    title: "ELIMB'A DIKALO",
    subtitle: "",
    themes: ["Dialogue", "Responsabilité", "Écologie spirituelle des peuples"],
  },
  {
    title: "TRANSMISSION MUNTU",
    subtitle: "",
    themes: ["Famille", "Jeunesse", "Éducation"],
  },
  {
    title: "ACADÉMIE MUNTU",
    subtitle: "",
    themes: ["Conférences", "Formations", "Leadership"],
  },
  {
    title: "BIBLIOTHÈQUE MUNTU",
    subtitle: "",
    themes: ["Livres", "Essais", "Manifestes", "Recherche"],
  },
] as const;

export const actions = [
  { label: "Conférences", icon: "FilePen", href: "#conferences" },
  { label: "Formations", icon: "GraduationCap", href: "#formations" },
  { label: "Publications", icon: "FileText", href: "#publications" },
  { label: "Recherche", icon: "Microscope", href: "#recherche" },
  { label: "Leadership", icon: "User", href: "#leadership" },
  { label: "Débats", icon: "MessagesSquare", href: "#debats" },
  { label: "Rencontres", icon: "Globe", href: "#rencontres" },
  { label: "Projets", icon: "ShieldCheck", href: "#projets" },
] as const;

export const ressources = [
  { label: "Livres", href: "#livres" },
  { label: "Essais", href: "#essais" },
  { label: "Manifestes", href: "#manifestes" },
  { label: "Vidéos", href: "#videos" },
  { label: "Podcasts", href: "#podcasts" },
  { label: "Études & Recherches", href: "#etudes-recherches" },
] as const;

export const parcours = [
  {
    title: "DÉCOUVERTE",
    description: "Une vision du monde",
    icon: "Eye",
  },
  {
    title: "COMPRÉHENSION",
    description: "Pourquoi le Muntu ?",
    icon: "Lightbulb",
  },
  {
    title: "EXPLORATION",
    description: "Les 5 grands piliers",
    icon: "PenLine",
  },
  {
    title: "APPROFONDISSEMENT",
    description: "Livres • Formations • Recherches • Conférences",
    icon: "BookOpen",
  },
  {
    title: "ENGAGEMENT",
    description: "Rejoindre le mouvement",
    icon: "Users",
  },
] as const;

export const visionText =
  "« Pour la Renaissance du Muntu » est une vision socio-spirituelle qui œuvre à la renaissance des consciences, à la restauration de la dignité humaine, à la transmission des héritages féconds, à la construction d'une culture de paix, au dialogue, à la responsabilité et au bien commun." as const;

export const engagementText =
  "Ensemble, cultivons la conscience, la responsabilité et le service du bien commun pour bâtir un avenir de paix, de dignité et de prospérité partagée." as const;

export const soutienText =
  "Votre soutien fait la différence. Aidez-nous à faire grandir cette vision pour une Afrique plus consciente, plus unie et plus prospère." as const;

export const footerLinks = {
  institut: [
    { label: "Notre vision", href: "#vision" },
    { label: "Notre philosophie", href: "#mission" },
    { label: "Notre mission", href: "#mission" },
    { label: "Nos valeurs", href: "#vision" },
    { label: "Notre histoire", href: "#vision" },
    { label: "Notre equipe", href: "#vision" },
  ],
  departements: [
    { label: "Renaissance des peuples", href: "/" },
    { label: "Elimb'a Dikalo", href: "/elimba" },
    { label: "Transmission du Ntu ", href: "#transmission" },
    { label: "Académie du Muntu", href: "#academie" },
    { label: "Bibliothèque du Muntu", href: "#bibliotheque" },
  ],
  ressources: [
    { label: "Livres", href: "#ressources" },
    { label: "Essais", href: "#ressources" },
    { label: "Manifestes", href: "#ressources" },
    { label: "Vidéos", href: "#ressources" },
    { label: "Podcasts", href: "#ressources" },
    { label: "Etudes & Recherches", href: "#ressources" },
  ],
  actualites: [
    { label: "Actualités", href: "#actualites" },
    { label: "Événements", href: "#actualites" },
    { label: "Communiqués", href: "#actualites" },
    { label: "Galerie", href: "#actualites" },
    { label: "Presse", href: "#actualites" },
  ],
} as const;

export const contact = {
  email: "elimbadikalo.renaissancemuntu@gmail.com",
  phone: "+1 (514) 224-3872",
  address: "Afrique — Diaspora mondiale",
} as const;
