import SupportHero from "../components/support/SupportHero";
import DonationCard from "../components/support/DonationCard";
import PartnershipCard from "../components/support/PartnershipCard";
import PartnershipForm from "../components/support/PartnershipForm";

export default function Soutenir() {
  return (
    <div className="space-y-10 px-4 py-12 md:px-8 lg:px-10">
      <SupportHero />

      <section className="mx-auto max-w-[1200px]">
        <p className="max-w-4xl font-sans text-sm leading-relaxed text-anthracite md:text-base">
          <span className="font-bold text-vert">
            ELIMB’A DIKALO POUR LA RENAISSANCE DU MUNTU,
          </span>{" "}
          Une initiative de Mener Autrement, est un Programme d’éducation, de dialogue interculturel
          et de prévention des fractures communautaires.
        </p>
        <p className="mt-3 max-w-3xl font-sans text-sm font-bold uppercase tracking-wide text-vert italic">
          FORMULAIRE ÉMIS APRÈS PAIEMENT ET REÇU PAR COURRIEL LE DONNATEUR ET PAR NOUS
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <DonationCard />
          <PartnershipCard />
        </div>
      </section>

      <section id="partnership-form" className="scroll-mt-20 mx-auto max-w-[1200px]">
        <h3 className="font-serif text-xl font-semibold text-vert">Formulaire de partenariat</h3>
        <div className="mt-6 rounded-2xl border border-or/20 bg-white p-6 shadow-sm">
          <PartnershipForm />
        </div>
      </section>
    </div>
  );
}
