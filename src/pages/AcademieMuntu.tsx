import {
  AcademieAmbassadeur,
  AcademieCitation,
  AcademieDomaines,
  AcademieFormations,
  AcademieHero,
  AcademieMission,
  AcademiePillarNavigation,
  AcademieProgramme,
  AcademieRaisonEtre,
  AcademieRessources,
  AcademieSensibilisation,
} from "../components/academie";

/**
 * Page « Académie du Muntu » — Pilier 4 de Pour la Renaissance du Muntu.
 * Page interne du site : header/footer globaux fournis par MainLayout.
 */
export default function AcademieMuntu() {
  return (
    <div className="space-y-14 px-4 py-20 md:px-8 lg:px-10">
      <AcademieHero />
      <AcademieRaisonEtre />
      <AcademieMission />
      <AcademieDomaines />
      <AcademieProgramme />
      <AcademieFormations />
      <AcademieRessources />
      <AcademieSensibilisation />
      <AcademieAmbassadeur />
      <AcademieCitation />
      <AcademiePillarNavigation />
    </div>
  );
}