import { Heart, Mail, Users } from "lucide-react";
import engagementImg from "../../assets/images/engagement.png";
import { engagementText, soutienText } from "../../data/siteData";
import SupportButton from "../support/SupportButton";
import { cn } from "../../utils/cn";

/**
 * CTA — Rejoindre le mouvement + bandeau Soutien et engagement (maquette)
 */
export default function CTA() {
  return (
    <>
      {/* Carte rejoindre (grille 4 colonnes) */}
      <article
        id="engagement"
        className="rounded-2xl border border-or/30 bg-creme-clair p-6 shadow-sm md:p-7"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5c3d1e]">
            <Users className="h-5 w-5 text-or-clair" aria-hidden />
          </span>
          <h2 className="font-serif text-base font-semibold uppercase tracking-wide text-vert md:text-lg">
            Rejoindre la vision
          </h2>
        </div>
        <div className="mb-4 h-px w-full bg-or/30" aria-hidden />

        <div className="flex flex-col gap-5">
          <div className="relative overflow-hidden rounded-xl border border-or/20 bg-white/60">
            <img
              src={engagementImg}
              alt=""
              className="block h-auto w-full object-contain"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/90 via-white/30 to-transparent" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-sans text-sm leading-relaxed text-anthracite">
              {engagementText}
            </p>
            <SupportButton
              className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-vert px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-vert-fonce md:w-auto"
            >
              S’engager maintenant
            </SupportButton>
          </div>
        </div>
      </article>
    </>
  );
}

/** Bandeau plein largeur Soutien et engagement */
export function SoutienBanner() {
  return (
    <section
      id="soutien"
      className="bg-vert-fonce px-4 py-10 md:px-8 lg:px-10"
      aria-labelledby="soutien-title"
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 rounded-2xl border border-or/40",
          "bg-vert-profond/80 px-6 py-8 md:flex-row md:px-10 md:py-9",
        )}
      >
        <div className="flex items-start gap-4 text-center md:text-left">
          <span className="mt-1 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-or/50 md:flex">
            <Mail className="h-5 w-5 text-or-clair" aria-hidden />
          </span>
          <div>
            <h2
              id="soutien-title"
              className="font-serif text-xl font-semibold uppercase tracking-wide text-white md:text-2xl"
            >
              Soutien et engagement
            </h2>
            <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-white/85">
              {soutienText}
            </p>
          </div>
        </div>

        <SupportButton
          className="btn-or inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-lg md:text-sm"
        >
          <Heart className="h-4 w-4 fill-white text-white" aria-hidden />
          Soutenir la vision ou devenir partenaire
        </SupportButton>
      </div>
    </section>
  );
}
