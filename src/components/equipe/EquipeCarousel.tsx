import { translateContent } from "../../i18n/translateContent";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MembreEquipe } from "../../data/equipeData";
import { teamMembers } from "../../data/equipeData";
import { cn } from "../../utils/cn";
import EquipePhotoPlaceholder from "./EquipePhotoPlaceholder";

/** Intervalle d'avance automatique du carrousel (en millisecondes). */
const AUTOPLAY_DELAY_MS = 5000;

/**
 * Respecte la préférence système « réduire les animations »
 * (WCAG 2.3.3) afin de désactiver l'avance automatique.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Carrousel institutionnel du hero « Notre Équipe ».
 *
 * Présente en boucle les photographies des membres renseignées dans
 * `src/data/equipeData.ts` (champ `image`), avec une transition sobre de
 * type crossfade, un léger zoom cinétique, une légende discrète (nom +
 * fonction) et des contrôles secondaires (points de progression + flèches).
 *
 * Robustesse :
 * - Les membres avec `image: null` sont ignorés.
 * - Si une image renseignée n'existe pas encore (fichier absent), elle est
 *   retirée du carrousel sans jamais afficher d'image cassée.
 * - Tant qu'aucune photographie n'est disponible, le cadre élégant
 *   `EquipePhotoPlaceholder` est affiché (aucune fausse photo).
 *
 * Accessibilité : alternatifs `alt`, boutons étiquetés, pause au survol et
 * au focus, et désactivation de l'autoplay en cas de
 * `prefers-reduced-motion: reduce`.
 */
export default function EquipeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  /* Seuls les membres disposant d'une image valide (fichier présent) défilent. */
  const slides = teamMembers.filter(
    (membre): membre is MembreEquipe & { image: string } =>
      membre.image !== null && !failedImages.has(membre.image),
  );
  const total = slides.length;
  const canNavigate = total > 1;

  /* Index sécurisé : si la composition évolue entre deux rendus (photo
     ajoutée/supprimée), on affiche toujours une diapositive valide. */
  const safeIndex = total === 0 ? 0 : Math.min(currentIndex, total - 1);

  /* Avance automatique — suspendue au survol / focus, désactivée en mode
     « réduire les animations » ou s'il y a moins de deux membres. */
  useEffect(() => {
    if (!canNavigate || prefersReducedMotion || paused) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_DELAY_MS);
    return () => window.clearInterval(timer);
  }, [canNavigate, paused, prefersReducedMotion, total]);

  const goTo = (index: number) => {
    if (!canNavigate) return;
    setCurrentIndex(((index % total) + total) % total);
  };

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label={translateContent("Photos des membres de l'équipe")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-or/30 bg-vert-fonce shadow-xl"
    >
      {translateContent(total > 0 ? (
        slides.map((membre, index) => {
          const isActive = index === safeIndex;
          return (
            <div
              key={membre.image}
              role="group"
              aria-roledescription="diapositive"
              aria-label={translateContent(`${index + 1} sur ${total}`)}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
                isActive ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <img
                src={membre.image}
                alt={translateContent(`Portrait de ${membre.name}`)}
                loading={isActive ? "eager" : "lazy"}
                onError={() => handleImageError(membre.image)}
                draggable={false}
                className={cn(
                  "h-full w-full object-cover object-center transition-transform duration-1000 ease-in-out motion-reduce:transition-none",
                  isActive ? "scale-100" : "scale-[1.04] motion-reduce:scale-100",
                )}
              />

              {/* Dégradé de lisibilité pour la légende */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                aria-hidden
              />

              {/* Légende discrète : nom + fonction */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 pb-9 pr-14 md:p-6 md:pb-10">
                <p className="drop-shadow-sm font-serif text-lg font-semibold leading-snug text-white sm:text-xl">
                  {membre.name}
                </p>
                {membre.role && (
                  <p className="mt-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-or-clair">
                    {membre.role}
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        /* Cadre élégant tant qu'aucune photographie officielle n'est fournie. */
        <EquipePhotoPlaceholder
          name="Les membres de l'équipe"
          label="Photographie institutionnelle à venir"
          className="h-full w-full"
        />
      ))}
      {/* Flèches précédent / suivant — discrètes, révélées au survol sur desktop */}
      {translateContent(canNavigate && (
        <>
          <button
            type="button"
            aria-label={translateContent("Membre précédent")}
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-2.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors duration-200 hover:border-or hover:bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or lg:h-9 lg:w-9 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={translateContent("Membre suivant")}
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-2.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors duration-200 hover:border-or hover:bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or lg:h-9 lg:w-9 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </>
      ))}

      {/* Points de progression */}
      {translateContent(canNavigate && (
        <div className="absolute inset-x-0 bottom-2.5 z-10 flex items-center justify-center gap-2">
          {slides.map((membre, index) => (
            <button
              key={membre.image}
              type="button"
              aria-label={translateContent(`Voir le membre ${index + 1}`)}
              aria-current={index === safeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === safeIndex
                  ? "w-5 bg-or-clair"
                  : "w-1.5 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}