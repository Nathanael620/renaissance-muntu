import { useMemo, useState } from "react";
import { Filter, MessageSquareText } from "lucide-react";
import { AdminBadge, AdminEmptyState, AdminSearch } from "../../layouts/AdminLayout";

const messages = [
  { id: 1, sender: "Amina Diop", email: "amina@culture.org", subject: "Participation à un atelier", preview: "Je souhaiterais organiser une session sur la mémoire et les patrimoines africains.", receivedAt: "2026-10-17", status: "Nouveau" },
  { id: 2, sender: "Lea Martin", email: "lea.martin@gmail.com", subject: "Question sur la bibliothèque", preview: "Pouvez-vous me donner des détails sur le livre « Éthique du devenir » ?", receivedAt: "2026-10-11", status: "Lu" },
  { id: 3, sender: "Koffi Tano", email: "koffi@afrique-formation.fr", subject: "Demande de partenariat", preview: "Nous aimerions lancer un programme de sensibilisation avec votre structure.", receivedAt: "2026-10-08", status: "En cours" },
];

export default function AdminMessagesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tous");

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesQuery = [message.sender, message.email, message.subject, message.preview].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "Tous" || message.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Gestion des échanges</p>
            <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Messages reçus</h2>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7cfba] bg-[#f5f1e6] px-3 py-2 text-xs font-medium text-[#0f2d22]">
            <MessageSquareText size={14} className="text-[#b8860b]" />
            Données fictives de démonstration
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
              aria-label="Filtrer les messages par statut"
            >
              <option>Tous</option>
              <option>Nouveau</option>
              <option>Lu</option>
              <option>En cours</option>
              <option>Archivé</option>
            </select>
          </div>
        </div>

        {filteredMessages.length === 0 ? (
          <div className="mt-6">
            <AdminEmptyState
              title="Aucun message correspondant"
              description="Essayez une autre recherche ou un autre filtre pour retrouver un message spécifique."
            />
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#e8dfcd]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead className="bg-[#f5f1e6] text-xs uppercase tracking-[0.12em] text-[#5d564e]">
                  <tr>
                    <th className="px-4 py-3">Expéditeur</th>
                    <th className="px-4 py-3">Objet</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className="border-t border-[#ece4d4] bg-white">
                      <td className="px-4 py-4 align-top">
                        <div className="font-medium text-[#0f2d22]">{message.sender}</div>
                        <div className="text-sm text-[#5d564e]">{message.email}</div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <div className="font-medium text-[#0f2d22]">{message.subject}</div>
                        <div className="mt-1 max-w-md text-sm text-[#5d564e]">{message.preview}</div>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-[#5d564e]">{message.receivedAt}</td>
                      <td className="px-4 py-4 align-top"><AdminBadge status={message.status} /></td>
                      <td className="px-4 py-4 text-right align-top">
                        <button type="button" className="rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm font-medium text-[#0f2d22] hover:bg-[#f5f1e6]">
                          Ouvrir
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
