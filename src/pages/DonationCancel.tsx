import { ArrowLeft, CircleX } from "lucide-react";
import SupportButton from "../components/support/SupportButton";

export default function DonationCancel() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-20 md:px-8">
      <div className="w-full rounded-2xl border border-or/30 bg-white p-8 text-center shadow-sm md:p-12">
        <CircleX className="mx-auto h-14 w-14 text-or-fonce" aria-hidden />
        <p className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-or-fonce">
          Paiement non finalisé
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-vert-fonce">
          Votre don n'a pas été finalisé.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-anthracite">
          Vous pouvez revenir au parcours de don et recommencer lorsque vous le souhaitez. Le statut réel de votre donation est géré par le système de paiement et Laravel.
        </p>
        <SupportButton className="btn-or mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wide">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Revenir au don
        </SupportButton>
      </div>
    </section>
  );
}
