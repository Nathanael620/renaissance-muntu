import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Building2, CalendarClock, MessageSquareText, Users } from "lucide-react";
import { AdminEmptyState } from "../../layouts/AdminLayout";
import { adminGet } from "../../services/adminService";

type DashboardData = {
  stats: { messages: number; partnerships: number; resources: number; administrators: number; pending_invitations: number };
  recent_activity: { type: string; id: number; title: string; detail: string | null }[];
};

const quickLinks = [
  { title: "Messages", description: "Consulter et traiter les demandes envoyées", href: "/admin/messages" },
  { title: "Partenariats", description: "Suivre les demandes de collaboration", href: "/admin/partenariats" },
  { title: "Bibliothèque", description: "Gérer les ressources publiées", href: "/admin/bibliotheque" },
  { title: "Administrateurs", description: "Gérer les accès et rôles", href: "/admin/administrateurs" },
];

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGet<DashboardData>("/dashboard")
      .then(setData)
      .catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : "Impossible de charger le tableau de bord."));
  }, []);

  const stats = [
    { label: "Messages reçus", value: data?.stats.messages, icon: MessageSquareText },
    { label: "Demandes de partenariat", value: data?.stats.partnerships, icon: Building2 },
    { label: "Ressources de la bibliothèque", value: data?.stats.resources, icon: BookOpen },
    { label: "Administrateurs actifs", value: data?.stats.administrators, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Bienvenue</p>
            <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Vue d’ensemble</h2>
            <p className="mt-2 max-w-xl text-sm text-[#5d564e]">Synthèse calculée à partir des données enregistrées dans le backend.</p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7cfba] bg-[#f5f1e6] px-3 py-2 text-xs font-medium text-[#0f2d22]">
            {data ? "Données du backend" : "Chargement des données…"}
          </div>
        </div>
      </section>

      {error && <p className="rounded-xl border border-[#d38a80] bg-[#fdf0ee] p-4 text-sm text-[#7c2d26]" role="alert">{error}</p>}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-[#d7cfba] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf3ef] text-[#0f2d22]">
                <Icon size={20} />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-sm text-[#5d564e]">{label}</p>
              <p className="mt-1 text-3xl font-serif font-semibold text-[#0f2d22]">{value ?? "—"}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-[#d7cfba] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#0f2d22]">Activité récente</h3>
            <button type="button" className="text-sm font-medium text-[#0f2d22] hover:text-[#173b2d]">
              Voir tout
            </button>
          </div>

          <div className="space-y-4">
            {(data?.recent_activity ?? []).map(({ title, detail, type, id }) => (
              <div key={`${type}-${id}`} className="flex items-start gap-4 rounded-2xl bg-[#f8f5ee] p-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#e8efe9] text-[#0f2d22]">
                  <CalendarClock size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#0f2d22]">{title}</p>
                  <p className="mt-1 text-sm text-[#5d564e]">{detail ? new Date(detail).toLocaleString() : "Date indisponible"}</p>
                </div>
              </div>
            ))}
            {data && data.recent_activity.length === 0 && (
              <p className="text-sm text-[#5d564e]">Aucune activité récente à afficher.</p>
            )}
            {!data && !error && <p className="text-sm text-[#5d564e]">Chargement…</p>}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#d7cfba] bg-white p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-[#0f2d22]">Accès rapides</h3>
          <div className="mt-5 space-y-3">
            {quickLinks.map(({ title, description, href }) => (
              <a
                key={title}
                href={href}
                className="flex items-center justify-between rounded-2xl border border-[#e4dcc7] bg-[#fffdf9] p-4 transition hover:border-[#d4a84b] hover:bg-[#fffaf0]"
              >
                <div>
                  <p className="font-medium text-[#0f2d22]">{title}</p>
                  <p className="mt-1 text-sm text-[#5d564e]">{description}</p>
                </div>
                <ArrowRight size={18} className="text-[#0f2d22]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#d7cfba] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl text-[#0f2d22]">Suivi des opérations</h3>
          <span className="text-sm text-[#5d564e]">Invitations en attente : {data?.stats.pending_invitations ?? "—"}</span>
        </div>
        <div className="mt-6">
          <AdminEmptyState
            title="Aucune alerte à signaler"
            description="Les notifications opérationnelles apparaîtront ici lorsque des actions requerront une validation ou un suivi humain."
          />
        </div>
      </section>
    </div>
  );
}
