import { useEffect, useState, type FormEvent } from "react";
import { Copy, ShieldCheck, UserPlus, UserRoundX } from "lucide-react";
import { AdminBadge } from "../../layouts/AdminLayout";
import { adminGet, adminWrite } from "../../services/adminService";
import { localizedPath } from "../../routing/routes";

type Administrator = { id: number; name: string; email: string; role: "super_admin" | "admin" | "editor" | "viewer"; is_active: boolean; created_at: string };
type Paginated<T> = { data: T[]; current_page: number; last_page: number; total: number };
type InvitationResponse = { token: string; invitation: { email: string; role: string; expires_at: string } };
const roleLabels: Record<Administrator["role"], string> = {
  super_admin: "Super administrateur",
  admin: "Administrateur",
  editor: "Éditeur",
  viewer: "Consultation",
};

export default function AdminAdministratorsPage() {
  const [result, setResult] = useState<Paginated<Administrator> | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "admin" });
  const [invitationUrl, setInvitationUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    adminGet<Paginated<Administrator>>("/admins?per_page=100")
      .then((response) => { if (active) { setResult(response); setError(""); } })
      .catch((requestError: unknown) => { if (active) setError(requestError instanceof Error ? requestError.message : "Impossible de charger les administrateurs."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [reload]);

  const createInvitation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setInvitationUrl("");
    try {
      const response = await adminWrite<InvitationResponse>("/admin-invitations", "POST", form);
      const link = new URL(localizedPath("/admin/invitation"), window.location.origin);
      link.hash = new URLSearchParams({ token: response.token }).toString();
      setInvitationUrl(link.toString());
      setFormOpen(false);
      setForm({ name: "", email: "", role: "admin" });
      setLoading(true);
      setReload((value) => value + 1);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Impossible de créer l’invitation.");
    } finally {
      setSaving(false);
    }
  };

  const updateAdministrator = async (admin: Administrator, changes: Partial<Pick<Administrator, "role" | "is_active">>) => {
    setUpdatingId(admin.id);
    setError("");
    try {
      await adminWrite(`/admins/${admin.id}`, "PATCH", changes);
      setLoading(true);
      setReload((value) => value + 1);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Impossible de modifier ce compte.");
    } finally {
      setUpdatingId(null);
    }
  };

  const copyInvitation = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
    } catch {
      setError("La copie automatique a échoué. Sélectionnez et copiez le lien manuellement.");
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Autorisations</p>
            <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Administrateurs</h2>
          </div>

          <button type="button" onClick={() => setFormOpen((open) => !open)} className="inline-flex items-center gap-2 rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-medium text-white hover:bg-[#173b2d]">
            <UserPlus size={16} />
            Inviter un administrateur
          </button>
        </div>
      </section>

      {error && <p className="rounded-xl border border-[#d38a80] bg-[#fdf0ee] p-3 text-sm text-[#7c2d26]" role="alert">{error}</p>}
      {formOpen && <form onSubmit={createInvitation} className="space-y-4 rounded-[24px] border border-[#d7cfba] bg-white p-5">
        <h3 className="font-serif text-xl text-[#0f2d22]">Créer une invitation à usage unique</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm">Nom<input required maxLength={255} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2" /></label>
          <label className="text-sm">Adresse e-mail<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2" /></label>
          <label className="text-sm">Rôle<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="mt-1 w-full rounded-lg border border-[#d7cfba] p-2"><option value="admin">Administrateur</option><option value="editor">Éditeur</option><option value="viewer">Consultation</option></select></label>
        </div>
        <p className="text-xs text-[#5d564e]">Aucun e-mail n’est envoyé. Le lien est affiché une seule fois et expire après 24 heures ; transmettez-le par un canal sûr.</p>
        <button disabled={saving} className="rounded-xl bg-[#0f2d22] px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{saving ? "Création…" : "Créer le lien"}</button>
      </form>}
      {invitationUrl && <div className="rounded-xl border border-[#bfd7c7] bg-[#edf8f1] p-4 text-sm text-[#214f3d]">
        <p className="font-semibold">Lien d’invitation créé · expiration dans 24 heures</p>
        <div className="mt-2 flex gap-2"><input readOnly value={invitationUrl} className="min-w-0 flex-1 rounded-lg border border-[#bfd7c7] bg-white px-2 py-2 text-xs" /><button type="button" onClick={() => void copyInvitation()} className="inline-flex items-center gap-1 rounded-lg border border-[#bfd7c7] px-3 py-2"><Copy size={14} />Copier</button></div>
        <button type="button" onClick={() => setInvitationUrl("")} className="mt-2 text-xs underline">Masquer le lien</button>
      </div>}

      <section className="rounded-[24px] border border-[#d7cfba] bg-white p-5 shadow-sm">
        {loading ? <p className="p-4 text-sm text-[#5d564e]">Chargement des comptes…</p> : !result?.data.length ? <p className="p-4 text-sm text-[#5d564e]">Aucun compte administrateur actif.</p> : (
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
                {result.data.map((admin) => (
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
                          {admin.role === "super_admin" && (
                            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#f7eed7] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a5510]">
                              <ShieldCheck size={10} />
                              Principal
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-sm text-[#5d564e]">{admin.email}</td>
                    <td className="px-4 py-4 align-top"><select disabled={admin.role === "super_admin" || updatingId === admin.id} value={admin.role} onChange={(event) => void updateAdministrator(admin, { role: event.target.value as Administrator["role"] })} className="rounded-lg border border-[#d7cfba] bg-white px-2 py-1 text-sm" aria-label="Rôle administrateur">{admin.role === "super_admin" && <option value="super_admin">{roleLabels.super_admin}</option>}<option value="admin">Administrateur</option><option value="editor">Éditeur</option><option value="viewer">Consultation</option></select></td>
                    <td className="px-4 py-4 align-top"><AdminBadge status={admin.is_active ? "Actif" : "Désactivé"} /></td>
                    <td className="px-4 py-4 align-top text-sm text-[#5d564e]">{new Date(admin.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-right align-top">
                      <div className="flex justify-end gap-2">
                        <button type="button" disabled={admin.role === "super_admin" || updatingId === admin.id} onClick={() => void updateAdministrator(admin, { is_active: !admin.is_active })} className="inline-flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-2 text-sm text-[#0f2d22] disabled:opacity-50">
                          <UserRoundX size={14} />
                          {admin.is_active ? "Désactiver" : "Activer"}
                        </button>
                      </div>
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
