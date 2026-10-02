import { CheckCircle2 } from "lucide-react";
import SupportButton from "../components/support/SupportButton";

export default function DonationSuccess() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-20 md:px-8">
      <div className="w-full rounded-2xl border border-or/30 bg-white p-8 text-center shadow-sm md:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-vert" aria-hidden />
        <p className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-or-fonce">
          Parcours de don
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-vert-fonce">
          Merci pour votre don.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-anthracite">
          Votre retour depuis Stripe a bien été reçu. La confirmation définitive du paiement est traitée par le système de paiement et notre webhook Laravel. Le reçu officiel sera envoyé à l'adresse e-mail fournie lorsque le paiement aura été confirmé.
        </p>
        <SupportButton className="btn-or mt-8 inline-flex rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wide">
          Revenir au soutien
        </SupportButton>
      </div>
    </section>
  );
}
