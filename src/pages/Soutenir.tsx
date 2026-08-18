import SupportHero from "../components/support/SupportHero";
import DonationCard from "../components/support/DonationCard";
import PartnershipCard from "../components/support/PartnershipCard";
import PartnershipForm from "../components/support/PartnershipForm";

export default function Soutenir() {
  return (
    <div className="space-y-10 px-4 py-12 md:px-8 lg:px-10">
      <SupportHero />

      <section className="mx-auto max-w-[1200px]">
        <h2 className="font-serif text-2xl font-semibold text-vert">Pourquoi nous soutenir ?</h2>
        <p className="mt-3 max-w-3xl text-sm text-anthracite">Votre soutien permet de financer des formations, des rencontres publiques, des publications et des programmes éducatifs.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <DonationCard />
          <PartnershipCard />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px]">
        <h3 className="font-serif text-xl font-semibold text-vert">Formulaire de partenariat</h3>
        <div className="mt-6 rounded-2xl border border-or/20 bg-white p-6 shadow-sm">
          <PartnershipForm />
        </div>
      </section>
    </div>
  );
}
