import {
  EquipeCitation,
  EquipeCTA,
  EquipeDirection,
  EquipeDomaines,
  EquipeHero,
  EquipeIntro,
  EquipeMembres,
  EquipeVision,
} from "../components/equipe";

/**
 * Page « Notre Équipe » — Pour la Renaissance du Muntu.
 * Page interne du site : header/footer globaux fournis par MainLayout.
 * Progression éditoriale : hero → introduction → membres → équipe dirigeante
 * → domaines d'engagement → vision collective → citation → CTA.
 */
export default function NotreEquipe() {
  return (
    <div className="space-y-14 px-4 py-20 md:px-8 lg:px-10">
      <EquipeHero />
      <EquipeIntro />
      <EquipeMembres />
      <EquipeDirection />
      <EquipeDomaines />
      <EquipeVision />
      <EquipeCitation />
      <EquipeCTA />
    </div>
  );
}