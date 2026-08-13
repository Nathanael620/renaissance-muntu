import React from "react";

export default function PartnershipCard() {
  const goToForm = () => {
    const el = document.getElementById("partnership-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <article className="rounded-2xl border border-or/20 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vert text-white">🤝</span>
        <h3 className="font-serif text-lg font-semibold uppercase text-vert">Devenir partenaire</h3>
      </div>

      <p className="mb-6 font-sans text-sm text-anthracite">
        Les organisations, entreprises et structures peuvent collaborer avec nous pour porter des projets durables et impactants.
      </p>

      <button
        type="button"
        onClick={goToForm}
        className="inline-flex items-center justify-center rounded-full border border-vert px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide"
      >
        DEVENIR PARTENAIRE
      </button>
    </article>
  );
}
