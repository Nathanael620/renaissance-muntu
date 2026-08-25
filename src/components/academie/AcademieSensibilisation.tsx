import { ArrowRight, Globe, Megaphone, Radio, Users } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";
import { openSocialModal } from "../social/socialModalEvents";

/**
 * Section 8 — Sensibilisation & Influence.
 * Campagnes, réseaux sociaux, influenceurs africains, partage d'expériences,
 * communauté en ligne.
 */
const piliers = [
  { icone: Megaphone, titre: "Campagnes de sensibilisation", detail: "Des messages simples, forts et partageables." },
  { icone: Globe, titre: "Réseaux sociaux", detail: "Une présence active pour toucher la jeunesse africaine." },
  { icone: Radio, titre: "Influenceurs africains", detail: "Relayer les idées de la renaissance auprès de nouveaux publics." },
  { icone: Users, titre: "Communauté en ligne", detail: "Partager expériences, opinions et bonnes pratiques." },
];

export default function AcademieSensibilisation() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="academie-sensibilisation"
      ref={ref}
      className="rounded-[2rem] border border-or/25 bg-vert-profond/95 px-6 py-10 text-white shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="academie-sensibilisation-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-or-clair">
          S&rsquo;engager
        </p>
        <h2
          id="academie-sensibilisation-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-white sm:text-4xl"
        >
          Sensibilisation &amp; Influence
        </h2>

        <div className={cn("mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4", visible && "animate-fade-in-delay-1")}>
          {piliers.map((pilier) => {
            const Icon = pilier.icone;
            return (
              <article
                key={pilier.titre}
                className="flex h-full flex-col items-start gap-4 rounded-[1.5rem] border border-or/20 bg-creme-clair p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-vert/10 text-vert">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-serif text-lg font-semibold uppercase leading-snug text-vert">
                  {pilier.titre}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-anthracite/85">
                  {pilier.detail}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => openSocialModal("Rejoignez notre communauté")}
            className="btn-or inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
          >
            Rejoindre la communauté
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}