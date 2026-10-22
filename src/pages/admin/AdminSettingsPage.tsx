import { useEffect, useState, type FormEvent } from "react";
import { Save } from "lucide-react";
import { useAdminUser, useUpdateAdminUser } from "../../contexts/adminUserContext";
import { adminGet, adminWrite } from "../../services/adminService";

export default function AdminSettingsPage() {
  const user = useAdminUser();
  const updateUser = useUpdateAdminUser();
  const [profile, setProfile] = useState({ name: user.name, email: user.email });
  const [preferences, setPreferences] = useState({ dark_mode: false, email_notifications: true });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminGet<{ preferences: Partial<typeof preferences> }>("/me/preferences")
      .then((response) => setPreferences((current) => ({ ...current, ...response.preferences })))
      .catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : "Impossible de charger les préférences."));
  }, []);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await adminWrite<{ data: typeof profile }>("/me", "PATCH", profile);
      updateUser(response.data);
      setMessage("Profil enregistré.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Impossible d’enregistrer le profil.");
    } finally {
      setSaving(false);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await adminWrite<{ preferences: typeof preferences }>("/me/preferences", "PATCH", preferences);
      setPreferences(response.preferences);
      setMessage("Préférences enregistrées.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Impossible d’enregistrer les préférences.");
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await adminWrite("/me/password", "PATCH", {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: passwordConfirmation,
      });
      setCurrentPassword("");
      setNewPassword("");
      setPasswordConfirmation("");
      setMessage("Mot de passe modifié.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Impossible de modifier le mot de passe.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && <p className="rounded-xl border border-[#d38a80] bg-[#fdf0ee] p-3 text-sm text-[#7c2d26]" role="alert">{error}</p>}
      {message && <p className="rounded-xl border border-[#bfd7c7] bg-[#edf8f1] p-3 text-sm text-[#214f3d]" role="status">{message}</p>}
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Profil</p>
          <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Paramètres du profil</h2>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={saveProfile} className="rounded-[24px] border border-[#d7cfba] bg-white p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-[#0f2d22]">Informations du profil</h3>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2d342f]">Nom complet</label>
              <input required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 text-sm text-[#1f2a1f] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#d4a84b]/30" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2d342f]">Adresse e-mail</label>
              <input required type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className="w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 text-sm text-[#1f2a1f] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#d4a84b]/30" />
            </div>
          </div>
          <button disabled={saving} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-medium text-white disabled:opacity-60"><Save size={16} />Enregistrer le profil</button>
        </form>

        <div className="rounded-[24px] border border-[#d7cfba] bg-white p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-[#0f2d22]">Préférences</h3>

          <div className="mt-6 space-y-5 text-sm text-[#3d3d3d]">
            <label className="flex items-center justify-between rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-4 py-3">
              <span>Interface claire</span>
              <input type="checkbox" checked={preferences.dark_mode} onChange={(event) => setPreferences({ ...preferences, dark_mode: event.target.checked })} className="h-4 w-4 rounded border-[#c9c0ad] text-[#0f2d22] focus:ring-[#d4a84b]" />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-4 py-3">
              <span>Notifications par e-mail</span>
              <input type="checkbox" checked={preferences.email_notifications} onChange={(event) => setPreferences({ ...preferences, email_notifications: event.target.checked })} className="h-4 w-4 rounded border-[#c9c0ad] text-[#0f2d22] focus:ring-[#d4a84b]" />
            </label>
          </div>

          <button type="button" disabled={saving} onClick={() => void savePreferences()} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-medium text-white hover:bg-[#173b2d] disabled:opacity-60">
            <Save size={16} />
            Enregistrer les préférences
          </button>
        </div>

        <form onSubmit={savePassword} className="rounded-[24px] border border-[#d7cfba] bg-white p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-[#0f2d22]">Modifier le mot de passe</h3>
          <div className="mt-5 space-y-4">
            <label className="block text-sm">Mot de passe actuel<input required type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3" /></label>
            <label className="block text-sm">Nouveau mot de passe (12 caractères minimum)<input required minLength={12} type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3" /></label>
            <label className="block text-sm">Confirmer le nouveau mot de passe<input required minLength={12} type="password" autoComplete="new-password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3" /></label>
          </div>
          <button disabled={saving} className="mt-5 rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-medium text-white disabled:opacity-60">Mettre à jour le mot de passe</button>
        </form>
      </section>
    </div>
  );
}
