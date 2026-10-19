import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d7cfba] bg-[#fffdf9] p-6 shadow-sm md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6b3d]">Profil</p>
          <h2 className="mt-2 font-serif text-3xl text-[#0f2d22]">Paramètres du profil</h2>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-[#d7cfba] bg-white p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-[#0f2d22]">Informations du profil</h3>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2d342f]">Nom complet</label>
              <input defaultValue="Aissatou Mbacké" className="w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 text-sm text-[#1f2a1f] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#d4a84b]/30" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2d342f]">Adresse e-mail</label>
              <input defaultValue="aissatou@renaissance-muntu.org" type="email" className="w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 text-sm text-[#1f2a1f] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#d4a84b]/30" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2d342f]">Mot de passe</label>
              <input type="password" placeholder="••••••••••" className="w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 text-sm text-[#1f2a1f] outline-none focus:border-[#b8860b] focus:ring-2 focus:ring-[#d4a84b]/30" />
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#d7cfba] bg-white p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-[#0f2d22]">Préférences</h3>

          <div className="mt-6 space-y-5 text-sm text-[#3d3d3d]">
            <label className="flex items-center justify-between rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-4 py-3">
              <span>Interface claire</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#c9c0ad] text-[#0f2d22] focus:ring-[#d4a84b]" />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-4 py-3">
              <span>Notifications par e-mail</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#c9c0ad] text-[#0f2d22] focus:ring-[#d4a84b]" />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-4 py-3">
              <span>Mode sombre</span>
              <input type="checkbox" className="h-4 w-4 rounded border-[#c9c0ad] text-[#0f2d22] focus:ring-[#d4a84b]" />
            </label>
          </div>

          <button type="button" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-medium text-white hover:bg-[#173b2d]">
            <Save size={16} />
            Enregistrer les changements
          </button>
        </div>
      </section>
    </div>
  );
}
