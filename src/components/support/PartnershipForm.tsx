import React, { useState } from "react";
import { submitPartnershipRequest, type PartnershipRequest } from "../../services/supportService";

export default function PartnershipForm() {
  const [form, setForm] = useState<PartnershipRequest>({ fullName: "", organization: "", email: "", phone: "", partnershipType: "", message: "" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.fullName.trim()) e.fullName = "Le nom complet est requis.";
    if (!form.email.trim()) e.email = "L'email est requis.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Email invalide.";
    return e;
  };

  const onChange = (k: keyof PartnershipRequest, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    setLoading(true);
    try {
      await submitPartnershipRequest(form);
      setSuccess(true);
    } catch (err) {
      setErrors({ submit: "Une erreur est survenue, veuillez réessayer." });
    } finally { setLoading(false); }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-or/20 bg-creme p-6 text-center">
        <h3 className="font-serif text-lg font-semibold text-vert">Merci</h3>
        <p className="mt-2 text-sm text-anthracite">Votre demande de partenariat a été reçue (simulation). Nous vous contacterons bientôt.</p>
      </div>
    );
  }

  return (
    <form id="partnership-form" onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-anthracite">Nom complet *</label>
          <input value={form.fullName} onChange={(e)=>onChange("fullName", e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-anthracite">Organisation</label>
          <input value={form.organization} onChange={(e)=>onChange("organization", e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-anthracite">Email *</label>
          <input value={form.email} onChange={(e)=>onChange("email", e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-anthracite">Téléphone</label>
          <input value={form.phone} onChange={(e)=>onChange("phone", e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-anthracite">Type de partenariat</label>
        <input value={form.partnershipType} onChange={(e)=>onChange("partnershipType", e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-anthracite">Message</label>
        <textarea value={form.message} onChange={(e)=>onChange("message", e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" rows={5} />
      </div>

      {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

      <div>
        <button type="submit" disabled={loading} className="btn-or inline-flex items-center justify-center rounded-full px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide shadow-md">
          {loading ? "Envoi…" : "Envoyer ma demande"}
        </button>
      </div>
    </form>
  );
}
