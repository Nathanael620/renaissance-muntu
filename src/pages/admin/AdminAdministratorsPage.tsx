import { ShieldCheck, UserPlus, UserRoundX } from "lucide-react";
import { AdminBadge } from "../../layouts/AdminLayout";

const administrators = [
  { id: 1, name: "Aissatou Mbacké", email: "aissatou@renaissance-muntu.org", role: "Administrateur principal", status: "Actif", createdAt: "2025-07-02" },
  { id: 2, name: "Sidy Diop", email: "sidy@renaissance-muntu.org", role: "Gestionnaire", status: "Actif", createdAt: "2025-09-18" },
  { id: 3, name: "Léonie Kouassi", email: "leonie@renaissance-muntu.org", role: "Rédacteur", status: "En attente", createdAt: "2026-10-01" },
];

export default function AdminAdministratorsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Autorisations</p>
            <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Administrateurs</h2>
          </div>

          <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-medium text-white hover:bg-[#173b2d]">
            <UserPlus size={16} />
            Ajouter un administrateur
          </button>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#d7cfba] bg-white p-5 shadow-sm">
        <div className="overflow-hidden rounded-2xl border border-[#e8dfcd]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-[#f5f1e6] text-xs uppercase tracking-[0.12em] text-[#5d564e]">
                <tr>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Rôle</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Date d'ajout</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {administrators.map((admin) => (
                  <tr key={admin.id} className="border-t border-[#ece4d4] bg-white">
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf3ef] font-medium text-[#0f2d22]">
                          {admin.name
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium text-[#0f2d22]">{admin.name}</div>
                          {admin.role === "Administrateur principal" && (
                            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#f7eed7] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a5510]">
                              <ShieldCheck size={10} />
                              Principal
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-[#5d564e]">{admin.email}</td>
                    <td className="px-4 py-4 align-top text-sm text-[#3d3d3d]">{admin.role}</td>
                    <td className="px-4 py-4 align-top"><AdminBadge status={admin.status} /></td>
                    <td className="px-4 py-4 align-top text-sm text-[#5d564e]">{admin.createdAt}</td>
                    <td className="px-4 py-4 text-right align-top">
                      <div className="flex justify-end gap-2">
                        <button type="button" className="rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm text-[#0f2d22]">
                          Modifier
                        </button>
                        <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm text-[#0f2d22]">
                          <UserRoundX size={14} />
                          Désactiver
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
