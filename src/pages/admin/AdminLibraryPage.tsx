import { useEffect, useState, type FormEvent } from "react";
import { Plus, PencilLine, Search, Eye } from "lucide-react";
import { AdminBadge, AdminEmptyState } from "../../layouts/AdminLayout";
import { useAdminUser } from "../../contexts/adminUserContext";
import { adminGet, adminWrite } from "../../services/adminService";

type LibraryResource = {
  id: number;
  title: string;
  category: string;
  type: string;
  cover_url: string | null;
  external_url: string | null;
  status: "draft" | "pending" | "published";
  metadata: Record<string, unknown> | null;
};
type Paginated<T> = { data: T[]; current_page: number; last_page: number; total: number };
type ResourceForm = Omit<LibraryResource, "id" | "metadata">;
const initialForm: ResourceForm = { title: "", category: "livre", type: "livre", cover_url: "", external_url: "", status: "draft" };
const statusLabels: Record<LibraryResource["status"], string> = {
  published: "Publié",
  draft: "Brouillon",
  pending: "À valider",
};

export default function AdminLibraryPage() {
  const user = useAdminUser();
  const canManage = user.permissions.includes("resources.manage");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Paginated<LibraryResource> | null>(null);
  const [form, setForm] = useState<ResourceForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({ per_page: "100" });
    if (query.trim()) params.set("q", query.trim());
    adminGet<Paginated<LibraryResource>>(`/resources?${params.toString()}`)
      .then((response) => {
        if (active) {
          setResult(response);
          setError("");
        }
      })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : "Impossible de charger les ressources.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [query, reload]);

  const saveResource = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminWrite(
        editingId === null ? "/resources" : `/resources/${editingId}`,
        editingId === null ? "POST" : "PATCH",
        {
          ...form,
          cover_url: form.cover_url || null,
          external_url: form.external_url || null,
        },
      );
      setForm(initialForm);
      setEditingId(null);
      setFormOpen(false);
      setLoading(true);
      setReload((value) => value + 1);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Impossible d’enregistrer la ressource.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Bibliothèque du Muntu</p>
            <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Gestion des ressources</h2>
          </div>

          {canManage && <button type="button" onClick={() => { setForm(initialForm); setEditingId(null); setFormOpen((open) => !open); }} className="inline-flex items-center gap-2 rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-medium text-white hover:bg-[#173b2d]">
            <Plus size={16} /> Ajouter une ressource
          </button>}
        </div>
      </section>

      <p className="rounded-xl border border-[#d7cfba] bg-[#fffdf9] p-4 text-sm text-[#5d564e]">
        Ce registre d’administration est distinct du catalogue public statique actuel. Les contenus existants ne sont pas remplacés ; leur import vers ce registre reste à effectuer avant de basculer la vitrine publique.
      </p>

      {formOpen && canManage && (
        <form onSubmit={saveResource} className="space-y-4 rounded-[24px] border border-[#d7cfba] bg-white p-5 shadow-sm">
          <h3 className="font-serif text-xl text-[#0f2d22]">{editingId === null ? "Nouvelle ressource" : "Modifier la ressource"}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#2d342f]">Titre<input required maxLength={255} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2" /></label>
            <label className="text-sm text-[#2d342f]">Catégorie<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2">{["livre", "essai", "manifeste", "video", "podcast", "etude-recherche"].map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="text-sm text-[#2d342f]">Type<input required maxLength={100} value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2" /></label>
            <label className="text-sm text-[#2d342f]">État<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as ResourceForm["status"] })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2"><option value="draft">Brouillon</option><option value="pending">À valider</option><option value="published">Publié</option></select></label>
            <label className="text-sm text-[#2d342f]">URL de couverture<input value={form.cover_url ?? ""} onChange={(event) => setForm({ ...form, cover_url: event.target.value })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2" /></label>
            <label className="text-sm text-[#2d342f]">Lien externe<input type="url" value={form.external_url ?? ""} onChange={(event) => setForm({ ...form, external_url: event.target.value })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2" /></label>
          </div>
          <div className="flex gap-2"><button disabled={saving} className="rounded-xl bg-[#0f2d22] px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{saving ? "Enregistrement…" : "Enregistrer"}</button><button type="button" onClick={() => setFormOpen(false)} className="rounded-xl border border-[#d7cfba] px-4 py-2 text-sm">Annuler</button></div>
        </form>
      )}

      <section className="rounded-[24px] border border-[#d7cfba] bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="flex w-full max-w-md items-center gap-2 rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm text-[#4d4d4d]">
            <Search size={16} className="text-[#6e5d35]" />
            <input value={query} onChange={(event) => { setLoading(true); setError(""); setQuery(event.target.value); }} placeholder="Rechercher une ressource" className="w-full border-0 bg-transparent text-sm text-[#1f2a1f] outline-none placeholder:text-[#8a827b]" />
          </label>
        </div>

        {error && <p className="mb-4 rounded-xl border border-[#d38a80] bg-[#fdf0ee] p-3 text-sm text-[#7c2d26]" role="alert">{error}</p>}
        {loading ? <p className="text-sm text-[#5d564e]">Chargement des ressources…</p> : result?.data.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {result.data.map((resource) => (
            <article key={resource.id} className="overflow-hidden rounded-2xl border border-[#e8dfcd] bg-[#fffdf9]">
              {resource.cover_url ? <img src={resource.cover_url} alt="" className="h-36 w-full bg-[#edf3ef] object-cover" /> : <div className="flex h-36 items-center justify-center bg-[linear-gradient(180deg,#0f2d22,#254d3d)] text-4xl font-serif text-[#f5f1e6]">{resource.title.slice(0, 1)}</div>}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#7a6b3d]">{resource.category}</p>
                    <h3 className="mt-2 font-serif text-xl text-[#0f2d22]">{resource.title}</h3>
                  </div>
                  <AdminBadge status={statusLabels[resource.status]} />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-[#5d564e]">
                  <span>{resource.type}</span>
                  <span className="font-medium text-[#0f2d22]">#{resource.id}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button type="button" onClick={() => setExpandedId((id) => id === resource.id ? null : resource.id)} className="flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-white px-3 py-2 text-sm text-[#0f2d22]"><Eye size={16} />{expandedId === resource.id ? "Masquer" : "Voir"}</button>
                  {canManage && <button type="button" onClick={() => { setForm({ title: resource.title, category: resource.category, type: resource.type, cover_url: resource.cover_url, external_url: resource.external_url, status: resource.status }); setEditingId(resource.id); setFormOpen(true); }} className="flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-white px-3 py-2 text-sm text-[#0f2d22]"><PencilLine size={16} />Modifier</button>}
                </div>
                {expandedId === resource.id && <p className="mt-4 break-all text-xs text-[#5d564e]">{resource.external_url || "Aucun lien externe enregistré"}</p>}
              </div>
            </article>
          ))}
        </div> : (
          <AdminEmptyState
            title="Aucune ressource enregistrée"
            description="Les nouveaux contenus apparaîtront ici après leur création dans le back office."
          />
        )}
      </section>
    </div>
  );
}
