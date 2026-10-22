import { useEffect, useState } from "react";
import { Filter, MessageSquareText } from "lucide-react";
import { AdminBadge, AdminEmptyState, AdminSearch } from "../../layouts/AdminLayout";
import { useAdminUser } from "../../contexts/adminUserContext";
import { adminGet, adminWrite } from "../../services/adminService";

type AdminContact = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  workflow_status: "new" | "read" | "in_progress" | "archived";
  created_at: string;
};

type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
};

const statusLabels: Record<AdminContact["workflow_status"], string> = {
  new: "Nouveau",
  read: "Lu",
  in_progress: "En cours",
  archived: "Archivé",
};

export default function AdminMessagesPage() {
  const user = useAdminUser();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tous");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<Paginated<AdminContact> | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({ page: String(page), per_page: "20" });
    if (query.trim()) params.set("q", query.trim());
    if (status !== "Tous") {
      const apiStatus = Object.entries(statusLabels).find(([, label]) => label === status)?.[0];
      if (apiStatus) params.set("status", apiStatus);
    }

    adminGet<Paginated<AdminContact>>(`/messages?${params.toString()}`)
      .then((response) => {
        if (active) {
          setResult(response);
          setError("");
        }
      })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : "Impossible de charger les messages.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query, status, page]);

  const updateStatus = async (message: AdminContact, workflow_status: AdminContact["workflow_status"]) => {
    setUpdatingId(message.id);
    setError("");
    try {
      const response = await adminWrite<{ data: AdminContact }>(`/messages/${message.id}`, "PATCH", { workflow_status });
      setResult((current) => current
        ? { ...current, data: current.data.map((item) => item.id === message.id ? response.data : item) }
        : current);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Impossible de mettre à jour le message.");
    } finally {
      setUpdatingId(null);
    }
  };

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
            Données enregistrées
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#d7cfba] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-md">
            <AdminSearch value={query} onChange={(value) => { setLoading(true); setError(""); setQuery(value); setPage(1); }} />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm text-[#3d3d3d]">
            <Filter size={16} className="text-[#6e5d35]" />
            <select
              value={status}
              onChange={(event) => {
                setLoading(true);
                setError("");
                setStatus(event.target.value);
                setPage(1);
              }}
              className="border-0 bg-transparent text-sm text-[#1f2a1f] outline-none"
              aria-label="Filtrer les messages par statut"
            >
              <option>Tous</option>
              <option value="Nouveau">Nouveau</option>
              <option value="Lu">Lu</option>
              <option value="En cours">En cours</option>
              <option value="Archivé">Archivé</option>
            </select>
          </div>
        </div>

        {error && <p className="mt-5 rounded-xl border border-[#d38a80] bg-[#fdf0ee] p-3 text-sm text-[#7c2d26]" role="alert">{error}</p>}
        {loading ? (
          <p className="mt-6 text-sm text-[#5d564e]">Chargement des messages…</p>
        ) : !result || result.data.length === 0 ? (
          <div className="mt-6">
            <AdminEmptyState
              title="Aucun message correspondant"
              description="Les messages reçus par le formulaire public apparaîtront ici."
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
                  {result.data.map((message) => (
                    <tr key={message.id} className="border-t border-[#ece4d4] bg-white">
                      <td className="px-4 py-4 align-top">
                        <div className="font-medium text-[#0f2d22]">{message.name}</div>
                        <div className="text-sm text-[#5d564e]">{message.email}</div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <div className="font-medium text-[#0f2d22]">{message.subject}</div>
                        <div className="mt-1 max-w-md text-sm text-[#5d564e]">{message.message.slice(0, 140)}{message.message.length > 140 ? "…" : ""}</div>
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-[#5d564e]">{new Date(message.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-4 align-top"><AdminBadge status={statusLabels[message.workflow_status]} /></td>
                      <td className="px-4 py-4 text-right align-top">
                        <button type="button" onClick={() => setExpandedId((id) => id === message.id ? null : message.id)} className="rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm font-medium text-[#0f2d22] hover:bg-[#f5f1e6]">
                          {expandedId === message.id ? "Fermer" : "Ouvrir"}
                        </button>
                        {user.permissions.includes("messages.manage") && (
                          <select
                            value={message.workflow_status}
                            disabled={updatingId === message.id}
                            onChange={(event) => void updateStatus(message, event.target.value as AdminContact["workflow_status"])}
                            className="ml-2 rounded-xl border border-[#d7cfba] bg-white px-2 py-2 text-xs"
                            aria-label="Modifier le statut de traitement"
                          >
                            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                  {expandedId !== null && result.data.some((message) => message.id === expandedId) && (
                    <tr className="border-t border-[#ece4d4] bg-[#fffdf9]">
                      <td colSpan={5} className="whitespace-pre-wrap px-4 py-5 text-sm text-[#3d3d3d]">
                        {result.data.find((message) => message.id === expandedId)?.message}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {result && result.last_page > 1 && (
          <div className="mt-5 flex items-center justify-between text-sm text-[#5d564e]">
            <span>{result.total} message(s) · page {result.current_page} sur {result.last_page}</span>
            <div className="flex gap-2">
              <button type="button" disabled={page <= 1} onClick={() => { setLoading(true); setPage((current) => current - 1); }} className="rounded-lg border border-[#d7cfba] px-3 py-2 disabled:opacity-50">Précédent</button>
              <button type="button" disabled={page >= result.last_page} onClick={() => { setLoading(true); setPage((current) => current + 1); }} className="rounded-lg border border-[#d7cfba] px-3 py-2 disabled:opacity-50">Suivant</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
