import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Présentation introductive de la vision — texte de cadrage placé
 * juste après les 5 piliers sur la page d'accueil.
 */
export default function VisionIntro() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="vision-intro"
      ref={ref}
      className="bg-creme px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10"
      aria-labelledby="vision-intro-title"
    >
      <div className="mx-auto max-w-4xl">
        {/* Titre de la présentation */}
        <div className="mb-3 flex items-center justify-center gap-4 md:mb-4 md:gap-6">
          <span className="hidden h-px flex-1 max-w-28 bg-or/60 sm:block" aria-hidden />
          <h2
            id="vision-intro-title"
            className="text-center font-serif text-lg font-semibold uppercase tracking-wide text-vert md:text-xl lg:text-2xl"
          >
            Présentation introductive de la vision
          </h2>
          <span className="hidden h-px flex-1 max-w-28 bg-or/60 sm:block" aria-hidden />
        </div>

        <div
          className={cn(
            "space-y-3 text-center md:space-y-3.5",
            visible && "animate-fade-in",
          )}
        >
          <p className="font-sans text-sm leading-6 text-anthracite md:text-base md:leading-7">
            POUR LA RENAISSANCE DU MUNTU est une vision socio-spirituelle qui œuvre à la
            renaissance des consciences, à la restauration de la dignité humaine, à la
            transmission des héritages féconds et à la construction d'une culture de paix
            fondée sur la responsabilité, le dialogue et le service du bien commun.
          </p>

          <p className="font-sans text-sm leading-6 text-anthracite md:text-base md:leading-7">
            Parce que toute renaissance véritable commence dans la conscience, grandit
            dans la responsabilité et s'accomplit dans le service de l'autre.
          </p>

          <p className="font-sans text-sm leading-6 text-anthracite md:text-base md:leading-7">
            Dans cette perspective, ELIMB'A DIKALO est l'un des premiers chemins d'action
            de cette vision. Il invite chacun à cultiver le dialogue, à exercer la
            responsabilité, à prendre soin de l'écologie spirituelle des peuples et à
            transformer les différences en occasions de rencontre plutôt qu'en motifs de
            division.
          </p>

          <p className="font-sans text-sm leading-6 text-anthracite md:text-base md:leading-7">
            Par les conférences, les formations, les publications, les livres, la
            recherche, la transmission intergénérationnelle et le leadership éthique,
            POUR LA RENAISSANCE DU MUNTU entend contribuer à la décolonisation des
            consciences, à la renaissance des sagesses africaines au renouveau de
            l'éducation, à la valorisation des traditions africaines porteuses de vie, au
            renforcement des familles, à la formation de leaders au service du bien commun
            et à la réconciliation durable entre les personnes, les communautés et les
            peuples.
          </p>
        </div>
      </div>
    </section>
  );
}