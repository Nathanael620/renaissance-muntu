import { translateContent } from "../../i18n/translateContent";
/**
 * Section 7 — Citation institutionnelle.
 * La phrase fondatrice du mouvement, présentée dans une mise en page
 * aérée et sobre (même traitement que les citations des autres pages).
 */
export default function EquipeCitation() {
  return (
    <section
      id="equipe-citation"
      className="rounded-[2rem] bg-creme-clair px-6 py-10 shadow-sm sm:px-8 lg:px-10"
      aria-label={translateContent("Citation institutionnelle")}
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-serif text-6xl leading-none text-or/40" aria-hidden>
          {translateContent("&ldquo; ")}</span>
        <blockquote className="mt-4 font-serif text-xl italic leading-relaxed text-vert sm:text-2xl">
          {translateContent("&ldquo;La renaissance des peuples commence toujours par la renaissance de la conscience.&rdquo; ")}</blockquote>
        <p className="mt-5 font-sans text-xs uppercase tracking-[0.2em] text-anthracite/60">
          {translateContent("Pour la Renaissance du Muntu ")}</p>
      </div>
    </section>
  );
}