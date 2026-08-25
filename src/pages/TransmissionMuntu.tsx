import {
  MuntuNtuSection,
  PillarNavigation,
  TransformationSection,
  TransmissionAxes,
  TransmissionCTA,
  TransmissionHero,
  TransmissionIntro,
  TransmissionJourney,
} from "../components/transmission";

/**
 * Page « Transmission du NTU » — Pilier 3 de Pour la Renaissance du Muntu.
 * Page interne du site (Header/Footer globaux fournis par MainLayout),
 * articulée autour d'une progression éditoriale : comprendre → philosophie
 * → programme → transformations → participation.
 */
export default function TransmissionMuntu() {
  return (
    <div className="space-y-14 px-4 py-20 md:px-8 lg:px-10">
      <TransmissionHero />
      <TransmissionIntro />
      <MuntuNtuSection />
      <TransmissionAxes />
      <TransformationSection />
      <TransmissionJourney />
      <TransmissionCTA />
      <PillarNavigation />
    </div>
  );
}