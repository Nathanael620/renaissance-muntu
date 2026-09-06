import { useFadeIn } from "../../hooks/useFadeIn";

/**
 * Section 6 — « Une équipe, une vision ».
 * Bandeau fort mais sobre : la vision prime sur les individus.
 */
export default function EquipeVision() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="equipe-vision"
      ref={ref}
      className="relative overflow-hidden rounded-[2rem] bg-vert px-6 py-14 text-white shadow-sm sm:px-8 lg:px-10 lg:py-20"
      aria-labelledby="equipe-vision-title"
    >
      {/* Décor graphique discret */}
      <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border border-or/20" aria-hidden />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-or/15" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center" aria-hidden>
          <span className="absolute inset-0 rounded-full border border-or/30" />
          <span className="absolute inset-[8px] rounded-full border border-or/45" />
          <span className="absolute inset-[16px] rounded-full border border-or/65" />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-vert-fonce" />
        </div>

        <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
          Une équipe, une vision
        </p>
        <h2
          id="equipe-vision-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-white sm:text-4xl"
        >
          Une équipe, une vision
        </h2>
        <p
          className={
            "mt-6 font-sans text-base leading-relaxed text-white/90 " +
            (visible ? "animate-fade-in-delay-1" : "")
          }
        >
          La Renaissance du Muntu ne repose pas sur une personne, mais sur une
          conscience collective, des responsabilités partagées et une volonté
          commune de servir une vision plus grande que soi.
        </p>
        <blockquote className="mt-8">
          <p className="font-serif text-lg italic leading-relaxed text-or-clair sm:text-xl">
            &ldquo;Si tu veux aller vite, marche seul. Si tu veux aller loin,
            marchons ensemble.&rdquo;
          </p>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-white/70">
            Proverbe africain
          </p>
        </blockquote>
      </div>
    </section>
  );
}