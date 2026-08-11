import {
  FilePen,
  FileText,
  Globe,
  GraduationCap,
  MessagesSquare,
  Microscope,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";
import { actions } from "../../data/siteData";

const iconMap: Record<string, LucideIcon> = {
  FilePen,
  GraduationCap,
  FileText,
  Microscope,
  User,
  MessagesSquare,
  Globe,
  ShieldCheck,
};

/**
 * Nos Actions — liste en deux colonnes (maquette)
 */
export default function Actions() {
  return (
    <article
      id="actions"
      className="flex h-full flex-col rounded-2xl border border-or/30 bg-creme-clair p-6 shadow-sm md:p-7"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5c3d1e]">
          <FilePen className="h-5 w-5 text-or-clair" aria-hidden />
        </span>
        <h2 className="font-serif text-lg font-semibold uppercase tracking-wide text-vert md:text-xl">
          Nos actions
        </h2>
      </div>
      <div className="mb-5 h-px w-full bg-or/30" aria-hidden />

      <ul className="grid flex-1 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = iconMap[action.icon] ?? FileText;
          return (
            <li key={action.label} className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 shrink-0 text-vert" aria-hidden />
              <span className="font-sans text-sm text-anthracite">{action.label}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
