import { ArrowRight, BookOpen, Building2, CalendarClock, MessageSquareText, Sparkles, Users } from "lucide-react";
import { AdminEmptyState } from "../../layouts/AdminLayout";

const stats = [
  { label: "Messages reçus", value: "128", icon: MessageSquareText, trend: "+12%" },
  { label: "Demandes de partenariat", value: "24", icon: Building2, trend: "+3" },
  { label: "Ressources de la bibliothèque", value: "63", icon: BookOpen, trend: "+8" },
  { label: "Nombre d'administrateurs", value: "7", icon: Users, trend: "+1" },
];

const recentActivity = [
  { title: "Nouveau message de l'équipe de Témoignages", detail: "2 heures ago • À traiter", tone: "warning" },
  { title: "Demande de partenariat reçue de Maison Muntu", detail: "Aujourd'hui • En revue", tone: "primary" },
  { title: "Nouvelle ressource ajoutée à la bibliothèque", detail: "Hier • Publiée", tone: "success" },
];

const quickLinks = [
  { title: "Messages", description: "Consulter et traiter les demandes envoyées", href: "/admin/messages" },
  { title: "Partenariats", description: "Suivre les demandes de collaboration", href: "/admin/partenariats" },
  { title: "Bibliothèque", description: "Gérer les ressources publiées", href: "/admin/bibliotheque" },
  { title: "Administrateurs", description: "Gérer les accès et rôles", href: "/admin/administrateurs" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Bienvenue</p>
            <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Vue d’ensemble</h2>
            <p className="mt-2 max-w-xl text-sm text-[#5d564e]">
              Voici une synthèse de l’activité de la plateforme. Les données ci-dessous sont des exemples de démonstration.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7cfba] bg-[#f5f1e6] px-3 py-2 text-xs font-medium text-[#0f2d22]">
            <Sparkles size={14} className="text-[#b8860b]" />
            Données de démonstration
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, trend }) => (
          <article key={label} className="rounded-2xl border border-[#d7cfba] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf3ef] text-[#0f2d22]">
                <Icon size={20} />
              </div>
              <span className="rounded-full bg-[#f7eed7] px-2 py-1 text-xs font-semibold text-[#7a5510]">{trend}</span>
            </div>
            <div className="mt-5">
              <p className="text-sm text-[#5d564e]">{label}</p>
              <p className="mt-1 text-3xl font-serif font-semibold text-[#0f2d22]">{value}</p>
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
            {recentActivity.map(({ title, detail, tone }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl bg-[#f8f5ee] p-4">
                <div
                  className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full ${
                    tone === "warning"
                      ? "bg-[#f7eed7] text-[#7a5510]"
                      : tone === "primary"
                        ? "bg-[#e8efe9] text-[#0f2d22]"
                        : "bg-[#edf8f1] text-[#1d5d47]"
                  }`}
                >
                  <CalendarClock size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#0f2d22]">{title}</p>
                  <p className="mt-1 text-sm text-[#5d564e]">{detail}</p>
                </div>
              </div>
            ))}
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
          <span className="text-sm text-[#5d564e]">Mise à jour en temps réel</span>
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
