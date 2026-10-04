import { translateBackendMessage, translateContent } from "../../i18n/translateContent";
import { useState } from "react";
import type { FormEvent } from "react";
import { Check, CreditCard, MapPin, Send, User } from "lucide-react";
import { ApiError } from "../../services/apiClient";
import {
  createDonationCheckout,
  DONATION_CURRENCY,
  type DonationCheckoutPayload,
} from "../../services/supportService";

type DonationFormState = {
  donor_name: string;
  donor_email: string;
  donor_address: string;
  donor_city: string;
  donor_province: string;
  donor_postal_code: string;
  donor_country: string;
  amount: string;
};

const initialForm: DonationFormState = {
  donor_name: "",
  donor_email: "",
  donor_address: "",
  donor_city: "",
  donor_province: "",
  donor_postal_code: "",
  donor_country: "",
  amount: "",
};

const fieldLabels: Record<keyof DonationFormState, string> = {
  donor_name: "Nom complet",
  donor_email: "Adresse e-mail",
  donor_address: "Adresse",
  donor_city: "Ville",
  donor_province: "Province / État",
  donor_postal_code: "Code postal",
  donor_country: "Pays",
  amount: "Montant du don",
};

export default function DonationForm() {
  const [form, setForm] = useState<DonationFormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof DonationFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const amount = Number(form.amount);

    if (!form.donor_name.trim()) nextErrors.donor_name = "Le nom complet est requis.";
    if (!form.donor_email.trim()) {
      nextErrors.donor_email = "L'adresse e-mail est requise.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.donor_email)) {
      nextErrors.donor_email = "Veuillez saisir une adresse e-mail valide.";
    }
    if (!form.amount.trim()) {
      nextErrors.amount = "Le montant du don est requis.";
    } else if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.amount = "Le montant doit être supérieur à zéro.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setLoading(true);
    try {
      const payload: DonationCheckoutPayload = {
        donor_name: form.donor_name.trim(),
        donor_email: form.donor_email.trim(),
        donor_address: form.donor_address.trim() || null,
        donor_city: form.donor_city.trim() || null,
        donor_province: form.donor_province.trim() || null,
        donor_postal_code: form.donor_postal_code.trim() || null,
        donor_country: form.donor_country.trim() || null,
        amount: Number(form.amount),
      };
      const { checkout_url } = await createDonationCheckout(payload);
      window.location.assign(checkout_url);
    } catch (error) {
      if (error instanceof ApiError && error.kind === "validation") {
        const serverErrors: Record<string, string> = {};
        Object.entries(error.validationErrors ?? {}).forEach(([field, messages]) => {
          if (messages.length) serverErrors[field] = messages[0];
        });
        setErrors({ ...serverErrors, submit: error.message });
      } else {
        const message = error instanceof ApiError ? error.message : "";
        setErrors({ submit: message || "Une erreur est survenue, veuillez réessayer." });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    field: keyof DonationFormState,
    type = "text",
    autoComplete?: string,
  ) => (
    <label className="block text-xs font-semibold text-vert-fonce">
      {translateContent(fieldLabels[field])}
      <input
        required={field === "donor_name" || field === "donor_email"}
        name={field}
        type={type}
        value={form[field]}
        onChange={(event) => updateField(field, event.target.value)}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md border border-vert/15 bg-white px-3 py-3 text-sm font-normal text-anthracite outline-none transition focus:border-or focus:ring-2 focus:ring-or/20"
      />
      {errors[field] && <p className="mt-2 text-xs font-medium text-red-600">{translateContent(errors[field])}</p>}
    </label>
  );

  return (
    <form id="donation-form" onSubmit={handleSubmit} className="scroll-mt-28 space-y-6" aria-busy={loading}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-vert text-white">
          <CreditCard className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-or-fonce">{translateContent("Don sécurisé")}</p>
          <h3 className="font-serif text-2xl font-semibold text-vert-fonce">{translateContent("Préparez votre don")}</h3>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {renderInput("donor_name", "text", "name")}
        {renderInput("donor_email", "email", "email")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-semibold text-vert-fonce sm:col-span-2">
          <span className="flex items-center justify-between gap-3">
            <span>{translateContent("Montant du don")}</span>
            <span className="font-sans text-sm font-bold text-or-fonce">{translateContent("$ ")}{translateContent(DONATION_CURRENCY)}</span>
          </span>
          <div className="relative mt-2">
            <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-vert/60" aria-hidden />
            <input
              required
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={form.amount}
              onChange={(event) => updateField("amount", event.target.value)}
              className="w-full rounded-md border border-vert/15 bg-white py-3 pl-10 pr-3 text-sm font-normal text-anthracite outline-none transition focus:border-or focus:ring-2 focus:ring-or/20"
            />
          </div>
          {errors.amount && <p className="mt-2 text-xs font-medium text-red-600">{translateContent(errors.amount)}</p>}
        </label>
      </div>

      <div className="border-t border-or/20 pt-5">
        <div className="mb-4 flex items-center gap-2 text-vert-fonce">
          <MapPin className="h-4 w-4" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-wide">{translateContent("Informations pour le reçu")}</p>
        </div>
        {renderInput("donor_address", "text", "street-address")}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {renderInput("donor_city", "text", "address-level2")}
          {renderInput("donor_province", "text", "address-level1")}
          {renderInput("donor_postal_code", "text", "postal-code")}
          {renderInput("donor_country", "text", "country-name")}
        </div>
      </div>

      {errors.submit && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {translateBackendMessage(errors.submit, "An error occurred while preparing your donation. Please try again.")}
        </p>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={loading}
          className="btn-or inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
        >
          {translateContent(loading ? "Préparation du paiement..." : "Continuer vers Stripe")}
          {translateContent(loading ? <Check className="h-4 w-4" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />)}
        </button>
        <p className="flex items-center gap-2 text-xs text-anthracite/65">
          <User className="h-3.5 w-3.5" aria-hidden />
          {translateContent("Le reçu officiel sera envoyé après confirmation du paiement. ")}</p>
      </div>
    </form>
  );
}
