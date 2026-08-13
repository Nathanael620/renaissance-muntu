import React from "react";
import { heroContent } from "../../data/siteData";

export default function SupportHero() {
  return (
    <section className="bg-creme-clair px-4 py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="font-serif text-3xl font-semibold uppercase text-vert">Soutenir le mouvement</h1>
        <p className="mt-4 max-w-3xl font-sans text-sm text-anthracite">
          {heroContent.pillarCard?.tagline ?? "Soutenez nos actions et nos programmes."}
        </p>
      </div>
    </section>
  );
}
