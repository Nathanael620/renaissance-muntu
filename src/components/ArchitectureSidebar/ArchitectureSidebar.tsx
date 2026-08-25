import { BookOpen, GraduationCap, Heart, Users } from "lucide-react";
import logo from "../../assets/icons/renaissance.png";
import elimbaIcon from "../../assets/icons/elimba.jpeg";
import { architectureItems } from "../../data/siteData";
import { cn } from "../../utils/cn";
import SupportButton from "../support/SupportButton";

type Item = (typeof architectureItems)[number];

function ItemIcon({ index }: { index: number }) {
  const wrap =
    "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-or/40 bg-white";

  if (index === 0 || index === 1) {
    return (
      <div className={wrap}>
        <img src={logo} alt="" className="h-10 w-10 object-contain object-left" />
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className={wrap}>
        <img src={elimbaIcon} alt="" className="h-full w-full object-cover object-left" />
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className={cn(wrap, "bg-[#6b4a2a]")}>
        <Users className="h-5 w-5 text-white" aria-hidden />
      </div>
    );
  }
  if (index === 4) {
    return (
      <div className={cn(wrap, "bg-vert")}>
        <GraduationCap className="h-5 w-5 text-white" aria-hidden />
      </div>
    );
  }
  return (
    <div className={cn(wrap, "bg-or")}>
      <BookOpen className="h-5 w-5 text-white" aria-hidden />
    </div>
  );
}

function ArchitectureRow({ item, index }: { item: Item; index: number }) {
  const isInstitut = index === 0;

  if (isInstitut) {
    return (
      <div className="rounded-2xl bg-vert px-4 py-4 text-center">
        <p className="font-sans text-xs font-bold uppercase tracking-wide text-white">
          POUR LA RENAISSANCE
        </p>
        <p className="font-sans text-xs font-bold uppercase tracking-wide text-white">
          DU MUNTU
        </p>
        <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-or-clair">
          (L’INSTITUT)
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <ItemIcon index={index} />
      <div>
        <h3 className="font-sans text-xs font-bold uppercase tracking-wide text-vert">
          {item.title}
        </h3>
        {item.themes.length > 0 && (
          <ul className="mt-1 space-y-0.5">
            {item.themes.map((t) => (
              <li key={t} className="font-sans text-[11px] text-anthracite/80">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Architecture globale du site — panneau maquette (desktop ≥1024).
 * Visible en complément de la page d'accueil sur grands écrans.
 */
export default function ArchitectureSidebar() {
  return (
    <aside
      className="hidden w-full max-w-sm rounded-2xl border border-or/25 bg-creme-clair p-5 shadow-sm lg:block"
      aria-label="Architecture globale du site"
    >
      <h2 className="mb-4 text-center font-sans text-xs font-bold uppercase tracking-[0.12em] text-vert">
        Architecture globale du site
      </h2>

      <div className="flex flex-col gap-5">
        {architectureItems.map((item, index) => (
          <ArchitectureRow key={item.title} item={item} index={index} />
        ))}
      </div>

      <SupportButton className="btn-or mt-6 flex w-full flex-col items-center gap-1 rounded-xl px-4 py-3 text-center">
        <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wide underline underline-offset-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/80">
            <Heart className="h-3 w-3 fill-white text-white" aria-hidden />
          </span>
          Soutenir la Vision
        </span>
        <span className="font-sans text-[10px] font-normal normal-case tracking-normal text-white/90">
          Semez aujourd’hui une humanité plus juste et durable
        </span>
      </SupportButton>
    </aside>
  );
}
