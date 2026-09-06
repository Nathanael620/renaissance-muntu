# Dossier des photographies de l'équipe

Ce dossier est réservé aux photographies officielles des membres de l'équipe
de « Pour la Renaissance du Muntu ». **Aucune fausse photo n'est générée.**

## Fichiers prévus (structure)

Les noms de fichiers ci-dessous sont une convention prévue ; les fichiers
n'ont pas besoin d'exister tant que les photographies officielles ne sont pas
fournies. Si un fichier reste absent, la page affiche automatiquement un cadre
élégant « Photographie à venir » (aucune image cassée).

```
public/images/equipe/
  membre-01.jpg      → membre du collectif
  membre-02.jpg
  membre-03.jpg
  membre-04.jpg
  direction-01.jpg   → membre de l'équipe dirigeante
  direction-02.jpg
  direction-03.jpg
  equipe-institutionnelle.jpg   → photographie institutionnelle du hero
```

## Comment intégrer une photo

1. Déposez le fichier dans ce dossier (ex. `membre-01.jpg`).
2. Ouvrez `src/data/equipeData.ts` et renseignez le champ `image` de la fiche
   correspondante :
   ```ts
   {
     name: "Nom à renseigner",
     role: "Fonction à renseigner",
     description: "Présentation à renseigner",
     expertises: [],
     image: "/images/equipe/membre-01.jpg", // ← chemin réel
     statut: "collectif",
   }
   ```
3. Toutes les photos sont automatiquement présentées au même ratio (4:5) et
   recadrées proprement ; aucune modification de la page n'est nécessaire.

## Petits formats recommandés

Privilégiez des portraits en orientation portrait, idéalement 800–1200 px de
large, format JPG/WebP, afin de garantir un rendu rapide et net.