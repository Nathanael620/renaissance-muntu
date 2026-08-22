import { useReadingProgress } from "../../hooks/useReadingProgress";

/**
 * Barre de progression de lecture — fin liseré doré fixé en haut de la
 * fenêtre, au-dessus de la Navbar sticky (z-60 > z-50), sans conflit.
 * Masquée à l'impression.
 */
export default function ManifestoProgress() {
  const progress = useReadingProgress();
  const percent = Math.round(progress * 100);

  return (
    <div
      role="progressbar"
      aria-label="Progression de lecture"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="print:hidden fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div className="h-full w-full bg-vert/10" aria-hidden />
      <div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-or-fonce via-or to-or-clair"
        style={{ width: `${percent}%` }}
        aria-hidden
      />
    </div>
  );
}