import { useMemo, useState } from "react";
import { BriefcaseBusiness, Filter } from "lucide-react";
import { AdminBadge, AdminEmptyState, AdminSearch } from "../../layouts/AdminLayout";

const partnerships = [
  { id: 1, name: "Maison Muntu", contact: "contact@maisonmuntu.org", type: "Partenariat institutionnel", requestedAt: "2026-10-14", status: "En attente" },
  { id: 2, name: "École des Consciences", contact: "admin@ecole-consciences.fr", type: "Programme éducatif", requestedAt: "2026-10-09", status: "À revoir" },
  { id: 3, name: "Fondation Culture Paix", contact: "hello@culturepaix.org", type: "Soutien événementiel", requestedAt: "2026-10-03", status: "Accepté" },
];

export default function AdminPartnershipPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tous");

  const filteredPartnerships = useMemo(() => {
    return partnerships.filter((item) => {
      const matchesQuery = [item.name, item.contact, item.type].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "Tous" || item.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Suivi des collaborations</p>
            <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Demandes de partenariat</h2>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7cfba] bg-[#f5f1e6] px-3 py-2 text-xs font-medium text-[#0f2d22]">
            <BriefcaseBusiness size={14} className="text-[#b8860b]" />
            Données de démonstration
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#d7cfba] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-md">
            <AdminSearch value={query} onChange={setQuery} />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm text-[#3d3d3d]">
            <Filter size={16} className="text-[#6e5d35]" />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="border-0 bg-transparent text-sm text-[#1f2a1f] outline-none"
              aria-label="Filtrer les partenariats par statut"
            >
              <option>Tous</option>
              <option>En attente</option>
              <option>À revoir</option>
              <option>Accepté</option>
              <option>Refusé</option>
            </select>
          </div>
        </div>

        {filteredPartnerships.length === 0 ? (
          <div className="mt-6">
            <AdminEmptyState
              title="Aucune demande de partenariat"
              description="Les demandes correspondantes à vos filtres apparaîtront ici dès qu’elles seront soumises."
            />
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#e8dfcd]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead className="bg-[#f5f1e6] text-xs uppercase tracking-[0.12em] text-[#5d564e]">
                  <tr>
                    <th className="px-4 py-3">Organisation</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartnerships.map((item) => (
                    <tr key={item.id} className="border-t border-[#ece4d4] bg-white">
                      <td className="px-4 py-4 align-top">
                        <div className="font-medium text-[#0f2d22]">{item.name}</div>
                        <div className="text-sm text-[#5d564e]">{item.contact}</div>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-[#3d3d3d]">{item.type}</td>
                      <td className="px-4 py-4 align-top text-sm text-[#5d564e]">{item.requestedAt}</td>
                      <td className="px-4 py-4 align-top"><AdminBadge status={item.status} /></td>
                      <td className="px-4 py-4 text-right align-top">
                        <button type="button" className="rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm font-medium text-[#0f2d22] hover:bg-[#f5f1e6]">
                          Consulter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
