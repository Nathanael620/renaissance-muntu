import { useFadeIn } from "../../hooks/useFadeIn";
import { cn } from "../../utils/cn";

/**
 * Section 2 — Introduction éditoriale.
 * Présente le sens du pilier autour du principe « Restaurer le MUNTU & activer le NTU »,
 * avec une citation et un symbole graphique de transmission.
 */
const principle =
  "Restaurer le MUNTU & activer le NTU";

export default function TransmissionIntro() {
  const { ref, visible } = useFadeIn<HTMLElement>();

  return (
    <section
      id="transmission-intro"
      ref={ref}
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="transmission-intro-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-vert">
          Comprendre
        </p>
        <h2
          id="transmission-intro-title"
          className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-vert sm:text-4xl"
        >
          Transmettre une conscience, pas seulement un savoir
        </h2>

        <p className="mt-4 font-serif text-xl italic leading-relaxed text-or-fonce">
            &ldquo;{principle}&rdquo;
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className={cn("space-y-5 font-sans text-sm leading-relaxed text-anthracite/85 sm:text-base", visible && "animate-fade-in")}>
            <p>
              Transmettre le Muntu, c&rsquo;est d&rsquo;abord rendre à l&rsquo;être humain la
              conscience de sa valeur intérieure. Avant d&rsquo;apprendre, il faut se
              reconnaître&nbsp;: reconnaître sa dignité, son identité, sa responsabilité et sa part de
              lucidité face au monde.
            </p>
            <p>
              La transmission entreprise ici n&rsquo;est donc pas une simple pédagogie. Elle est une
              restauration de l&rsquo;intérieur&nbsp;: réconcilier chacun avec ce qu&rsquo;il est, afin
              de rendre visibles, audibles et fécondes des valeurs que l&rsquo;histoire a pu
              dévaloriser.
            </p>
            <p>
              De cette conscience restaurée naît le NTU&nbsp;: la force vitale, le discernement,
              la stabilité et la capacité d&rsquo;agir sans violence. Transmettre le Muntu, c&rsquo;est
              par conséquent activer chez l&rsquo;autre ce qui lui permettra de devenir à son tour
              transmetteur.
            </p>
          </div>

          <aside className="space-y-6">
            {/* Symbole graphique de transmission */}
            <div
              className="flex flex-col items-center gap-4 rounded-[1.75rem] border border-or/25 bg-vert/8 p-6"
              aria-label="Symbole de transmission : du Muntu intérieur vers le NTU transmis"
            >
              <div className="relative flex h-44 w-44 items-center justify-center" aria-hidden>
                <span className="absolute h-44 w-44 rounded-full border border-or/25" />
                <span className="absolute h-[8.5rem] w-[8.5rem] rounded-full border border-or/45" />
                <span className="absolute h-24 w-24 rounded-full border border-or/65" />
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vert text-center">
                  <span className="font-sans text-xs font-bold uppercase tracking-wide text-creme">
                    NTU
                  </span>
                </div>
              </div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-vert">
                Du MUNTU intérieur vers le NTU transmis
              </p>
            </div>

            <figure className="rounded-[1.75rem] border border-or/25 bg-vert/5 p-6 shadow-sm">
              <blockquote className="font-serif text-lg italic leading-relaxed text-vert sm:text-xl">
                &ldquo;La renaissance des peuples commence toujours par la renaissance
                de la conscience.&rdquo;
              </blockquote>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}