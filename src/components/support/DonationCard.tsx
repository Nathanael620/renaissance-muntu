import React from "react";
import { handleDonation } from "../../services/supportService";

export default function DonationCard() {
  return (
    <article className="rounded-2xl border border-or/20 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vert text-white">💰</span>
        <h3 className="font-serif text-lg font-semibold uppercase text-vert">Faire un don</h3>
      </div>

      <p className="mb-6 font-sans text-sm text-anthracite">
        Votre contribution financière permet de soutenir nos actions, programmes et projets. Merci de votre confiance.
      </p>

      <button
        type="button"
        onClick={() => handleDonation()}
        className="btn-or inline-flex items-center justify-center rounded-full px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-md"
      >
        FAIRE UN DON
      </button>
    </article>
  );
}
