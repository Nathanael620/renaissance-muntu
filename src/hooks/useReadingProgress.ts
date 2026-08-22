import { useEffect, useState } from "react";

/**
 * Progression de lecture (0 → 1) basée sur le défilement de la page.
 * Le hook existant useScrollPosition ne renvoie qu'un booléen (seuil) :
 * celui-ci calcule un pourcentage pour la barre de progression du lecteur.
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}