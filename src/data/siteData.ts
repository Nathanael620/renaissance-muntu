/**
 * Données institutionnelles — alignées DCFT §3, §6, §7 et maquette2
 */

export const brand = {
  name: "POUR LA RENAISSANCE DU MUNTU",
  shortName: "MUNTU",
  tagline: "Une vision africaine de la renaissance de l'être humain, des peuples et de la civilisation",
  slogan: "Pour la formation d’une jeunesse consciente, digne et protégée",
  citation:
    "La renaissance des peuples commence toujours par la renaissance de la conscience"
} as const;

/** Liens de navigation principale (maquette navbar) */
export const navLinks = [
  { label: "ACCUEIL", href: "/" },
  { label: "VISION", href: "/#vision" },
  { label: "NOS PILIERS", href: "/#piliers" },
  { label: "BIBLIOTHÈQUE", href: "/bibliotheque" },
  { label: "ACADÉMIE", href: "/academie-muntu" },
  { label: "TRANSMISSION", href: "/transmission-muntu" },
  { label: "ACTUALITÉS", href: "/#actualites" },
  { label: "RESSOURCES", href: "/#ressources" },
  { label: "CONTACT", href: "#contact" },
] as const;

export const heroContent = {
  titleLines: ["POUR LA", "RENAISSANCE", "DU MUNTU"],
  subtitle: "Une vision africaine de la renaissance de l'être humain, des peuples et de la civilisation",
  body:" Nous croyons que les grandes transformations commencent toujours par une transformation intérieure. Aucun peuple ne peut bâtir une paix durable sans vérité.Aucune nation ne peut s'élever sans responsabilité.Aucune civilisation ne peut traverser les siècles sans transmettre ce qui nourrit son âme.",
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
  { label: "Livres & Essais", href: "/bibliotheque#nos-livres" },
  { label: "Manifestes", href: "/manifestes" },
  { label: "Vidéos", href: "#videos", opensModal: true },
  { label: "Podcasts", href: "#podcasts", opensModal: true },
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
  "Une Afrique et une diaspora portées par une jeunesse intérieurement digne, consciente, éveillée, libre, stable, enracinée et capable de bâtir l’avenir sans imitation ni vengeance." as const;

/** Identité institutionnelle — INSTITUT POUR LA RENAISSANCE DU MUNTU (doc officiel). */
export const institutIdentite = {
  titre: "",
  sousTitre: "Pour la formation d’une jeunesse consciente, digne et protégée",
  nom: " POUR LA RENAISSANCE DU MUNTU",
  natureJuridique: "est non confessionnelle",
  domaines: [
    "éducation",
    " jeunesse",
    " cohésion sociale",
    "prévention de la violence",
    "valorisation culturelle et spirituelle africaine",
  ],
} as const;

/** Mission — document officiel. */
export const missionInfo = {
  general:
    "Former et accompagner les jeunes afin de restaurer leur dignité intérieure (MUNTU), activer leur force vitale et leur discernement (NTU), et favoriser l’émergence d’une jeunesse africaine consciente, non violente, responsable et actrice de paix durable.",
  explicative:
    "POUR LA RENAISSANCE DU MUNTU veut répondre aux blessures invisibles laissées par l’histoire (esclavage, colonisation, néocolonisation) en agissant sur la dimension intérieure, mentale, morale et spirituelle de la jeunesse.",
  orientations: [
    "Décoloniser l’esprit sans haine",
    "Prévenir la violence et la radicalisation",
    "Restaurer l’estime de soi et la dignité humaine",
    "Renforcer la protection intérieure et la lucidité",
    "Transformer la conscience individuelle en action collective constructive",
  ],
} as const;

/** Valeurs fondamentales — document officiel (6 valeurs). */
export const valeurs = [
  { title: "Dignité humaine", text: "toute personne a une valeur intrinsèque" },
  {
    title: "Non-violence consciente",
    text: "refus de la haine, de la naïveté et de la destruction",
  },
  { title: "Lucidité et discernement", text: "comprendre avant d’agir" },
  {
    title: "Responsabilité",
    text: "individuelle, collective et intergénérationnelle",
  },
  { title: "Spiritualité de vie", text: "force intérieure, protection, équilibre" },
  { title: "Transmission", text: "relier les générations" },
] as const;

/** Objectifs — document officiel (objectif général + 5 axes hiérarchisés). */
export const objectifs = {
  general:
    "Contribuer à la formation d’une jeunesse africaine intérieurement libérée, moralement solide et socialement engagée, capable de prévenir la violence et de bâtir une paix durable.",
  axes: [
    {
      title: "Restaurer le MUNTU",
      items: [
        "Revaloriser la dignité humaine africaine",
        "Réconcilier les jeunes avec leur identité",
        "Lutter contre le complexe d’infériorité",
      ],
    },
    {
      title: "Activer le NTU",
      items: [
        "Développer la stabilité émotionnelle",
        "Renforcer la protection intérieure",
        "Favoriser le discernement et la maîtrise de soi",
      ],
    },
    {
      title: "Décoloniser l’esprit sans haïr",
      items: [
        "Comprendre l’histoire sans vengeance",
        "Déconstruire les schémas mentaux hérités",
        "Former des esprits critiques et autonomes",
      ],
    },
    {
      title: "Prévenir la violence et la radicalisation",
      items: [
        "Offrir des alternatives éducatives et spirituelles",
        "Canaliser les frustrations",
        "Promouvoir la non-violence stratégique",
      ],
    },
    {
      title: "Former des leaders responsables, dignes, conscients et éveillés",
      items: [
        "Encourager l’engagement citoyen",
        "Développer une éthique de l’action",
        "Favoriser les initiatives locales durables",
      ],
    },
  ],
} as const;

export const engagementText =
  "Contribuer à la formation d’une jeunesse africaine intérieurement libérée, moralement solide et socialement engagée, capable de prévenir la violence et de bâtir une paix durable." as const;

export const soutienText =
  "Former et accompagner les jeunes afin de restaurer leur dignité intérieure (MUNTU), activer leur force vitale et leur discernement (NTU), et favoriser l’émergence d’une jeunesse africaine consciente, non violente, responsable et actrice de paix durable." as const;

export const footerLinks = {
  institut: [
    { label: "Notre vision", href: "/#vision" },
    { label: "Notre philosophie", href: "/#mission" },
    { label: "Notre mission", href: "/#mission-title" },
    { label: "Nos valeurs", href: "/#valeurs-fondamentales" },
    { label: "Notre histoire", href: "/#vision" },
    { label: "Notre equipe", href: "/#vision" },
  ],
  departements: [
    { label: "Renaissance des peuples", href: "/" },
    { label: "Elimb'a Dikalo", href: "/elimba" },
    { label: "Transmission du Ntu ", href: "/transmission-muntu" },
    { label: "Académie du Muntu", href: "/academie-muntu" },
    { label: "Bibliothèque du Muntu", href: "/bibliotheque" },
  ],
  ressources: [
    { label: "Livres & Essais", href: "/bibliotheque#nos-livres" },
    { label: "Manifestes", href: "/manifestes" },
    { label: "Vidéos", href: "/#ressources" },
    { label: "Podcasts", href: "/#ressources" },
    { label: "Etudes & Recherches", href: "/#ressources" },
  ],
  actualites: [
    { label: "Actualités", href: "/#actualites" },
    { label: "Événements", href: "/#actualites" },
    { label: "Communiqués", href: "/#actualites" },
    { label: "Galerie", href: "/#actualites" },
    { label: "Presse", href: "/#actualites" },
  ],
} as const;

export const contact = {
  email: "elimbadikalo.renaissancemuntu@gmail.com",
  phone: "+1 (514) 224-3872",
  address: "Afrique — Diaspora mondiale",
} as const;
