import Actions from "../components/Actions";
import CarteAfrique from "../components/CarteAfrique";
import Citation from "../components/Citation";
import CitationFinale from "../components/CitationFinale";
import CTA, { SoutienBanner } from "../components/CTA";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Objectifs from "../components/Objectifs";
import ParcoursUtilisateur from "../components/ParcoursUtilisateur";
import Piliers from "../components/Piliers";
import Ressources from "../components/Ressources";
import Vision from "../components/Vision";
import VisionIntro from "../components/VisionIntro";

/**
 * Page Accueil — enchaînement DCFT §9.1 + maquette2 (colonne centrale)
 * En-tête → Hero → Citation → Piliers → Vision/Actions/Ressources/Engagement
 * → Présence → Mission/Objectifs → Parcours → Phrase fondatrice → Soutien → Footer
 *
 * Note : ArchitectureSidebar est un panneau de documentation de la maquette
 * (colonne droite hors viewport site) — composant prêt dans components/.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CitationFinale />
      <Piliers />

      {/* Présentation introductive de la vision (après les 5 piliers) */}
      <VisionIntro />

      {/* Grille Vision / Actions / Ressources / Engagement */}
      <section
        className="bg-creme px-4 py-10 md:px-8 md:py-12 lg:px-10"
        aria-label="Vision, actions, ressources et engagement"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Vision />
          <Actions />
          <Ressources />
          <CTA />
        </div>
      </section>

      <CarteAfrique />
      <Mission />
      <Objectifs />

      {/* Parcours + Phrase fondatrice côte à côte (desktop) */}
      <div className="bg-creme px-4 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <ParcoursUtilisateur />
          <Citation />
        </div>
      </div>

      <SoutienBanner />

      {/* Ancres secondaires pour la nav */}
      <div id="bibliotheque" className="sr-only" aria-hidden />
      <div id="academie" className="sr-only" aria-hidden />
      <div id="transmission" className="sr-only" aria-hidden />
      <div id="actualites" className="sr-only" aria-hidden />
    </>
  );
}
