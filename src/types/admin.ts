export type AdminNavItem = {
  label: string;
  path: string;
  icon: string;
};

export type AdminMessage = {
  id: number;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  receivedAt: string;
  status: "Nouveau" | "Lu" | "En cours" | "Archivé";
};

export type AdminPartnership = {
  id: number;
  name: string;
  contact: string;
  type: string;
  requestedAt: string;
  status: "En attente" | "À revoir" | "Accepté" | "Refusé";
};

export type AdminLibraryItem = {
  id: number;
  title: string;
  category: string;
  type: "Livre" | "Essai" | "Manifeste" | "Vidéo" | "Podcast" | "Étude";
  cover: string;
  status: "Publié" | "Brouillon" | "À valider";
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "Administrateur principal" | "Rédacteur" | "Gestionnaire" | "Modérateur";
  status: "Actif" | "En attente" | "Désactivé";
  createdAt: string;
};
