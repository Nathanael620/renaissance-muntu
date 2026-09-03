import React, { useState } from "react";
import { User, Building2, Mail, Phone, Briefcase, MessageSquare, Send } from "lucide-react";
import { submitPartnershipRequest, type PartnershipRequest } from "../../services/supportService";
import { ApiError } from "../../services/apiClient";

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
    } catch (error) {
      if (error instanceof ApiError && error.kind === "validation" && error.validationErrors) {
        // Erreurs de validation Laravel (HTTP 422) : on les affiche sous les champs concernés.
        const serverErrors: Record<string, string> = {};
        const fieldMap: Record<string, string> = {
          name: "fullName",
          organization: "organization",
          email: "email",
          phone: "phone",
          partnership_type: "partnershipType",
          message: "message",
        };
        Object.entries(error.validationErrors).forEach(([field, messages]) => {
          const formField = fieldMap[field] ?? field;
          if (messages.length) serverErrors[formField] = messages[0];
        });
        setErrors(serverErrors);
      } else {
        const message = error instanceof ApiError ? error.message : "";
        setErrors({ submit: message || "Une erreur est survenue, veuillez réessayer." });
      }
    } finally { setLoading(false); }
  };

  if (success) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-or/30 bg-gradient-to-br from-creme via-creme-clair to-white p-8 text-center">
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-vert/10" aria-hidden />
        <div className="relative z-10">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-vert">
              <Send className="h-6 w-6 text-or-clair" aria-hidden />
            </div>
          </div>
          <h3 className="font-serif text-xl font-semibold text-vert">Merci pour votre intérêt !</h3>
          <p className="mt-3 text-sm leading-relaxed text-anthracite">Votre demande de partenariat a été reçue. Nous vous contacterons très bientôt pour discuter des opportunités de collaboration.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Champ : Nom complet */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-vert">
          <User className="h-4 w-4" aria-hidden />
          Nom complet *
        </label>
        <input
          value={form.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder="Votre nom complet"
          className="w-full rounded-lg border border-or/30 bg-white px-4 py-3 font-sans text-sm text-anthracite placeholder:text-anthracite/50 transition-all duration-200 focus:border-or focus:bg-creme-clair focus:outline-none focus:ring-2 focus:ring-or/20"
        />
        {errors.fullName && <p className="mt-2 text-xs font-medium text-red-600">{errors.fullName}</p>}
      </div>

      {/* Champ : Organisation */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-vert">
          <Building2 className="h-4 w-4" aria-hidden />
          Organisation
        </label>
        <input
          value={form.organization}
          onChange={(e) => onChange("organization", e.target.value)}
          placeholder="Nom de votre organisation"
          className="w-full rounded-lg border border-or/30 bg-white px-4 py-3 font-sans text-sm text-anthracite placeholder:text-anthracite/50 transition-all duration-200 focus:border-or focus:bg-creme-clair focus:outline-none focus:ring-2 focus:ring-or/20"
        />
      </div>

      {/* Grille : Email et Téléphone */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-vert">
            <Mail className="h-4 w-4" aria-hidden />
            Email *
          </label>
          <input
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="votre.email@example.com"
            type="email"
            className="w-full rounded-lg border border-or/30 bg-white px-4 py-3 font-sans text-sm text-anthracite placeholder:text-anthracite/50 transition-all duration-200 focus:border-or focus:bg-creme-clair focus:outline-none focus:ring-2 focus:ring-or/20"
          />
          {errors.email && <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-vert">
            <Phone className="h-4 w-4" aria-hidden />
            Téléphone
          </label>
          <input
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+1 (514) 123-4567"
            type="tel"
            className="w-full rounded-lg border border-or/30 bg-white px-4 py-3 font-sans text-sm text-anthracite placeholder:text-anthracite/50 transition-all duration-200 focus:border-or focus:bg-creme-clair focus:outline-none focus:ring-2 focus:ring-or/20"
          />
        </div>
      </div>

      {/* Champ : Type de partenariat */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-vert">
          <Briefcase className="h-4 w-4" aria-hidden />
          Type de partenariat
        </label>
        <select
          value={form.partnershipType}
          onChange={(e) => onChange("partnershipType", e.target.value)}
          className="w-full rounded-lg border border-or/30 bg-white px-4 py-3 font-sans text-sm text-anthracite transition-all duration-200 focus:border-or focus:bg-creme-clair focus:outline-none focus:ring-2 focus:ring-or/20"
        >
          <option value="">-- Sélectionnez un type --</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="collaborative_project">Projet collaboratif</option>
          <option value="media_communication">Média & Communication</option>
          <option value="research_academic">Recherche & Académique</option>
          <option value="event_training">Événement & Formation</option>
          <option value="other">Autre</option>
        </select>
        {errors.partnershipType && <p className="mt-2 text-xs font-medium text-red-600">{errors.partnershipType}</p>}
      </div>

      {/* Champ : Message */}
      <div>
        <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-vert">
          <MessageSquare className="h-4 w-4" aria-hidden />
          Message/suggestions/Commentaire
        </label>
        <textarea
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder="Décrivez votre vision de partenariat avec nous..."
          rows={5}
          className="w-full rounded-lg border border-or/30 bg-white px-4 py-3 font-sans text-sm text-anthracite placeholder:text-anthracite/50 transition-all duration-200 focus:border-or focus:bg-creme-clair focus:outline-none focus:ring-2 focus:ring-or/20"
        />
      </div>

      {errors.submit && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 border border-red-200">{errors.submit}</p>}

      {/* Bouton de soumission */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-vert to-vert-fonce px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:from-vert-fonce hover:to-vert disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" aria-hidden />
          {loading ? "Envoi…" : "Envoyer ma demande"}
        </button>
        <p className="text-xs text-anthracite/60">* Champs obligatoires</p>
      </div>
    </form>
  );
}
