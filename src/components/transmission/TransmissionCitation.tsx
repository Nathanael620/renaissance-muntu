import { useFadeIn } from "../../hooks/useFadeIn";

/**
 * Citation — placée juste en dessous du hero du pilier « Transmission du NTU ».
 * Formulation éditoriale commune, attribuée à l'Académie Muntu.
 */
export default function TransmissionCitation() {
  const { ref } = useFadeIn<HTMLElement>();

  return (
    <section
      id="transmission-citation"
      ref={ref}
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-labelledby="transmission-citation-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-serif text-6xl leading-none text-or/40" aria-hidden>
          &ldquo;
        </span>
        <blockquote
          id="transmission-citation-title"
          className="mt-4 font-serif text-xl italic leading-relaxed text-vert sm:text-2xl"
        >
          &ldquo;Savoir d&rsquo;où nous venons pour savoir où aller&nbsp;: la connaissance,
          l&rsquo;histoire et la conscience deviennent les outils d&rsquo;une renaissance
          africaine juste, digne et agissante.&rdquo;
        </blockquote>
        <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-anthracite/60">
          Académie du Muntu — Pour la Renaissance du Muntu
        </p>
      </div>
    </section>
  );
}