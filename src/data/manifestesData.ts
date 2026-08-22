/**
 * Manifestes — textes fondateurs consultables en ligne.
 *
 * Sources de vérité : « Manifeste de la jeunesse africaine.pdf » et
 * « MANIFESTE RÉVOLUTIONNAIRE-L'AFRIQUE ÉTAIT À NEUTRALISER.pdf »
 * (textes reproduits fidèlement, sans résumé ni reformulation).
 *
 * Architecture générique : ajouter un manifeste revient à ajouter une
 * entrée dans le tableau `manifestes` — aucun composant n'a besoin d'être
 * modifié pour afficher un nouveau texte.
 */

/** Bloc de contenu d'une section d'un manifeste. */
export type ManifestoBlock =
  | { type: "paragraph"; text: string }
  | { type: "bulletList"; items: string[] }
  | { type: "orderedList"; items: string[] }
  /** Phrase structurante mise en évidence (traitement visuel, texte intact). */
  | { type: "highlighted"; text: string };

/** Section d'un manifeste (préambule, partie numérotée I–VI, déclaration…). */
export interface ManifestoSection {
  /** Numéro romain éventuel (ex. « I »). */
  number?: string;
  /** Titre exact de la section dans le document source. */
  title: string;
  /** Libellé court pour la table des matières (repli sur `title`). */
  shortLabel?: string;
  /** Contenus dans l'ordre du document source. */
  blocks: ManifestoBlock[];
}

/** Référence bibliographique des « Repères » d'un manifeste. */
export interface ManifestoReference {
  text: string;
}

/** Références « pour approfondir » d'un manifeste. */
export interface ManifestoReferences {
  /** Titre exact de la rubrique dans le document source. */
  title: string;
  /** Libellé court pour la table des matières. */
  shortLabel?: string;
  /** Numéroter la liste des références (ex. bibliographie 1…6). */
  numbered?: boolean;
  items: ManifestoReference[];
}

/** Manifeste complet (structure de lecture). */
export interface Manifesto {
  /** Identifiant d'URL — ex. "/manifestes/jeunesse-africaine". */
  slug: string;
  title: string;
  subtitle: string;
  /** Mention d'inspiration (ex. Cheikh Anta Diop), telle que dans le document. */
  inspiration?: string;
  /** Étiquette courte affichée sur la carte (ex. « À lire »). */
  badge?: string;
  preamble: ManifestoSection;
  sections: ManifestoSection[];
  finalDeclaration: ManifestoSection;
  references: ManifestoReferences;
}

export const manifestes: Manifesto[] = [
  {
    slug: "afrique-a-neutraliser",
    title: "Manifeste révolutionnaire",
    subtitle: "L’Afrique n’était pas à civiliser\nIl était à neutraliser",
    badge: "À lire",
    preamble: {
      title: "Introduction",
      blocks: [
        {
          type: "highlighted",
          text: "Nous n’étions pas à civiliser — nous étions à neutraliser",
        },
        { type: "paragraph", text: "Ils ne sont pas venus civiliser l’Afrique." },
        { type: "paragraph", text: "Ils sont venus la neutraliser." },
        {
          type: "paragraph",
          text: "Car on ne civilise pas un continent qui frappe monnaie, qui administre des empires, qui enseigne dans des universités, qui commerce avec trois continents.",
        },
        { type: "paragraph", text: "On neutralise une puissance." },
      ],
    },
    sections: [
      {
        number: "I",
        title: "Le mensonge fondateur",
        blocks: [
          { type: "paragraph", text: "Le mensonge colonial n’était pas seulement économique." },
          { type: "paragraph", text: "Il était ontologique." },
          { type: "paragraph", text: "On a dit que l’Afrique n’avait pas d’histoire." },
          { type: "paragraph", text: "Or, comme le rappelait Cheikh Anta Diop :" },
          {
            type: "bulletList",
            items: ["« L’histoire est le thermomètre de la vitalité d’un peuple. »"],
          },
          {
            type: "paragraph",
            text: "En déclarant l’Afrique « sans histoire », on a voulu déclarer l’Africain sans température, sans profondeur, sans continuité. Alors que",
          },
          {
            type: "bulletList",
            items: [
              "L’Empire du Ghana contrôlait l’or du monde transsaharien.",
              "Le Mali structurait des routes commerciales reliant l’Afrique à l’Arabie et à l’Europe.",
              "Tombouctou produisait du savoir pendant que d’autres régions sortaient à peine de la féodalité.",
              "Aksum frappait monnaie.",
              "Le Grand Zimbabwe bâtissait en pierre monumentale.",
              "Le Royaume du Kongo entretenait des relations diplomatiques formelles.",
            ],
          },
          { type: "paragraph", text: "Ce ne sont pas des mythes. Ce sont des faits." },
          { type: "paragraph", text: "Alors pourquoi dire que nous étions primitifs ?" },
          {
            type: "highlighted",
            text: "Parce qu’un peuple conscient de sa grandeur ne se laisse pas enchaîner.",
          },
        ],
      },
      {
        number: "II",
        title: "Berlin : partage du sol, effacement de l’âme",
        blocks: [
          {
            type: "paragraph",
            text: "En 1884, à Berlin, l’Europe ne partage pas seulement des territoires.",
          },
          {
            type: "bulletList",
            items: [
              "Elle partage une narration.",
              "Elle transforme l’Afrique en espace sans sujet.",
              "Elle réduit les empires en “tribus”.",
              "Elle transforme les bibliothèques en silence.",
            ],
          },
          {
            type: "paragraph",
            text: "Frantz Fanon l’avait compris : « Le colonisé est élevé dans une atmosphère de dévalorisation systématique. »",
          },
          {
            type: "highlighted",
            text: "L’effacement de l’histoire est la première étape de la domination durable.",
          },
        ],
      },
      {
        number: "III",
        title: "Nous n’étions pas inférieurs — nous étions dangereux",
        blocks: [
          { type: "paragraph", text: "Un continent :" },
          {
            type: "bulletList",
            items: [
              "Qui contrôle l’or,",
              "Qui structure des réseaux commerciaux,",
              "Qui possède une pensée religieuse et juridique,",
              "Qui bâtit des architectures monumentales,",
            ],
          },
          { type: "paragraph", text: "n’est pas arriéré." },
          {
            type: "paragraph",
            text: "Il est dangereux pour l’ordre mondial établi. Il fallait donc",
          },
          {
            type: "bulletList",
            items: [
              "Le fragmenter.",
              "Tracer des frontières artificielles.",
              "Introduire des dépendances économiques.",
              "Briser la continuité du Muntu.",
            ],
          },
        ],
      },
      {
        number: "IV",
        title: "Le Muntu : ce qu’ils ne pouvaient pas comprendre",
        blocks: [
          { type: "paragraph", text: "Le Muntu n’est pas un folklore." },
          { type: "highlighted", text: "Il est une ontologie." },
          {
            type: "paragraph",
            text: "Le Muntu est être relationnel, porteur de force vitale, inscrit dans un ordre cosmique.",
          },
          { type: "paragraph", text: "Dans cette structure, l’humain n’est pas isolé ; il est vertical." },
          { type: "paragraph", text: "Un tel être ne peut être réduit à une simple main-d’œuvre." },
          { type: "paragraph", text: "Il faut donc d’abord le convaincre qu’il n’est rien." },
          {
            type: "highlighted",
            text: "La colonisation fut une tentative de désontologisation.",
          },
        ],
      },
      {
        number: "V",
        title: "La restauration n’est pas nostalgie — elle est stratégie",
        blocks: [
          { type: "paragraph", text: "Nous ne réhabilitons pas l’histoire pour pleurer." },
          { type: "paragraph", text: "Nous la restaurons pour reconstruire." },
          { type: "paragraph", text: "Kwame Nkrumah affirmait :" },
          {
            type: "bulletList",
            items: ["« La décolonisation politique sans décolonisation mentale est une illusion. »"],
          },
          {
            type: "paragraph",
            text: "Tant que l’Afrique se pensera née en 1884, elle agira comme un enfant politique.",
          },
          {
            type: "highlighted",
            text: "Mais si elle se sait héritière d’empires, elle se comportera en architecte.",
          },
        ],
      },
      {
        number: "VI",
        title: "Le XXIᵉ siècle : continuité ou extinction",
        blocks: [
          { type: "paragraph", text: "La question n’est plus de savoir si l’Afrique a eu une histoire." },
          { type: "paragraph", text: "La question est : Que fait-elle de cette continuité ?" },
          {
            type: "paragraph",
            text: "Si nous étions capables d’organiser des réseaux commerciaux transcontinentaux au XIIIᵉ siècle, sommes-nous incapables d’organiser nos économies aujourd’hui ?",
          },
          {
            type: "paragraph",
            text: "Si nous pouvions bâtir des universités à Tombouctou, sommes-nous incapables de dominer l’intelligence artificielle ?",
          },
          {
            type: "highlighted",
            text: "L’histoire n’est pas un musée. Elle est un rappel de capacité.",
          },
        ],
      },
      {
        number: "VII",
        title: "Ce que nous déclarons",
        blocks: [
          { type: "paragraph", text: "Nous déclarons :" },
          {
            type: "bulletList",
            items: ["L’Afrique n’a jamais été vide. Elle a été effacée."],
          },
          { type: "paragraph", text: "Nous déclarons :" },
          {
            type: "bulletList",
            items: ["La colonisation n’a pas créé l’Afrique moderne ; elle a interrompu une trajectoire."],
          },
          { type: "paragraph", text: "Nous déclarons :" },
          {
            type: "bulletList",
            items: ["Le XXIᵉ siècle ne sera pas africain par hasard, mais par restauration stratégique."],
          },
        ],
      },
    ],
    finalDeclaration: {
      title: "Conclusion : la mémoire comme arme",
      blocks: [
        { type: "paragraph", text: "Ils ont effacé nos livres." },
        { type: "paragraph", text: "Nous écrivons les nôtres." },
        { type: "paragraph", text: "Ils ont redessiné nos frontières." },
        { type: "paragraph", text: "Nous redessinons notre conscience." },
        { type: "paragraph", text: "Ils ont confisqué le récit." },
        { type: "paragraph", text: "Nous le reprenons." },
        { type: "paragraph", text: "L’Afrique n’a jamais été en retard." },
        { type: "paragraph", text: "Elle a été entravée." },
        { type: "paragraph", text: "Et ce qui a été entravé peut être relancé." },
      ],
    },
    references: {
      title: "Bibliographie",
      shortLabel: "Bibliographie",
      numbered: true,
      items: [
        { text: "Cheikh Anta Diop, 1954. Nations nègres et culture (Paris: Présence Africaine." },
        { text: "Michael A. Gomez, 2018. African Dominion (Princeton: Princeton University Press." },
        { text: "Frantz Fanon, 1961. Les Damnés de la terre (Paris: Maspero)." },
        { text: "Kwame Nkrumah, 1965.Neo-Colonialism: The Last Stage of Imperialism (London: Nelson)." },
        { text: "Mogobe Ramose, 1999. African Philosophy through Ubuntu (Harare: Mond Books)." },
        { text: "Thomas Sankara, 1984. Discours du 4 août." },
      ],
    },
  },
  {
    slug: "jeunesse-africaine",
    title: "Manifeste de la jeunesse africaine",
    subtitle: "Se souvenir pour se tenir debout",
    inspiration: "Inspiré de la pensée de Cheikh Anta Diop",
    badge: "À lire",
    preamble: {
      title: "Préambule",
      blocks: [
        {
          type: "paragraph",
          text: "Nous, jeunesses d’Afrique et de la diaspora, refusons l’oubli. Nous refusons l’histoire amputée, la mémoire brisée, l’estime confisquée. Nous choisissons la connaissance, la vérité et la dignité comme fondations de notre avenir.",
        },
      ],
    },
    sections: [
      {
        number: "I",
        title: "Notre vérité",
        blocks: [
          {
            type: "paragraph",
            text: "L’Afrique est une source, pas une marge. Avant les blessures de l’esclavage et de la colonisation, nos terres ont porté des civilisations, des sciences, des langues et des spiritualités. L’Égypte ancienne, africaine par sa géographie, sa culture et ses peuples, en est l’un des témoins majeurs. Dire cette vérité n’est pas diviser. C’est réparer.",
          },
        ],
      },
      {
        number: "II",
        title: "Notre méthode",
        blocks: [
          { type: "paragraph", text: "Nous avançons sans haine, sans vengeance, sans violence." },
          { type: "highlighted", text: "Notre arme est la connaissance." },
          { type: "highlighted", text: "Notre boussole est la science." },
          { type: "highlighted", text: "Notre éthique est la dignité humaine." },
          {
            type: "paragraph",
            text: "Nous étudions l’histoire, les langues, les cultures et les savoirs pour reconstruire des esprits libres et responsables.",
          },
        ],
      },
      {
        number: "III",
        title: "Notre refus",
        blocks: [
          { type: "paragraph", text: "Nous refusons :" },
          {
            type: "bulletList",
            items: [
              "l’infériorisation déguisée en “neutralité”,",
              "l’ignorance érigée en programme,",
              "la honte imposée à nos noms, nos peaux, nos mémoires,",
              "l’aliénation qui pousse à se renier pour réussir.",
            ],
          },
        ],
      },
      {
        number: "IV",
        title: "Notre engagement",
        blocks: [
          { type: "paragraph", text: "Nous nous engageons à :" },
          {
            type: "orderedList",
            items: [
              "Apprendre notre histoire avec rigueur.",
              "Transmettre aux plus jeunes une mémoire juste.",
              "Valoriser nos langues et cultures.",
              "Créer (science, art, technologie, économie) sans complexe.",
              "Servir nos communautés avec intégrité.",
              "Dialoguer avec le monde d’égal à égal.",
            ],
          },
        ],
      },
      {
        number: "V",
        title: "Notre promesse",
        blocks: [
          { type: "paragraph", text: "Nous promettons de ne pas confondre mémoire et rancœur." },
          { type: "paragraph", text: "De transformer la connaissance en lumière, et la lumière en action." },
          { type: "paragraph", text: "De bâtir une Afrique qui pense, qui soigne, qui éduque, qui invente." },
        ],
      },
      {
        number: "VI",
        title: "Notre horizon",
        blocks: [
          { type: "paragraph", text: "Un continent où la jeunesse :" },
          {
            type: "bulletList",
            items: ["connaît d’où elle vient,", "sait où elle va,", "agit avec courage et responsabilité."],
          },
          { type: "highlighted", text: "Un avenir où l’Afrique n’imite pas : elle inspire." },
        ],
      },
    ],
    finalDeclaration: {
      title: "Déclaration finale",
      blocks: [
        { type: "paragraph", text: "Nous ne demandons pas la permission d’exister." },
        { type: "paragraph", text: "Nous affirmons notre place dans l’histoire humaine." },
        { type: "paragraph", text: "Enracinés dans la vérité, unis par la dignité," },
        { type: "paragraph", text: "nous sommes plus résistants que le titane." },
      ],
    },
    references: {
      title: "Repères (pour approfondir)",
      shortLabel: "Repères",
      items: [
        { text: "Cheikh Anta Diop : Nations nègres et culture et Civilisation ou barbarie." },
        { text: "Hérodote, Histoires, Livre II." },
        { text: "Obenga Théophile. Origine commune de l’égyptien ancien et des langues africaines." },
      ],
    },
  },
];

/** Récupère un manifeste par son slug d'URL. */
export function getManifestoBySlug(slug: string): Manifesto | undefined {
  return manifestes.find((manifesto) => manifesto.slug === slug);
}