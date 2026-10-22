import { useEffect, useState } from "react";
import { CheckCircle2, CircleX, Clock3, RefreshCw } from "lucide-react";
import { translateContent } from "../i18n/translateContent";
import SupportButton from "../components/support/SupportButton";
import { ApiError } from "../services/apiClient";
import { getDonationStatus, type DonationStatus } from "../services/supportService";

export default function DonationSuccess() {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const [status, setStatus] = useState<DonationStatus | "loading" | "missing" | "invalid" | "unavailable">(
    sessionId ? "loading" : "missing",
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    if (!sessionId) return;
    getDonationStatus(sessionId)
      .then((result) => {
        if (active) setStatus(result);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setStatus(error instanceof ApiError && error.status === 404 ? "invalid" : "unavailable");
      });

    return () => {
      active = false;
    };
  }, [sessionId, attempt]);

  const confirmed = status === "completed";
  const pending = status === "pending";
  const canRetry = status === "pending" || status === "invalid" || status === "unavailable";
  const Icon = confirmed ? CheckCircle2 : pending || status === "loading" ? Clock3 : CircleX;
  const title = confirmed
    ? "Paiement confirmé. Merci pour votre don."
    : pending
      ? "Confirmation du paiement en attente."
      : status === "loading"
        ? "Vérification du paiement en cours."
        : status === "missing"
          ? "Le paiement ne peut pas être vérifié."
          : status === "invalid"
            ? "Cette session de paiement est introuvable."
            : status === "unavailable"
              ? "La vérification du paiement est temporairement indisponible."
              : "Le paiement n’est pas confirmé.";
  const message = confirmed
    ? "Le paiement a été confirmé par notre serveur. Le reçu officiel sera envoyé à l'adresse e-mail fournie."
    : pending
      ? "Le statut du paiement est encore en cours de confirmation. Cette page ne marque pas le don comme payé."
      : status === "loading"
        ? "Nous vérifions le statut auprès de notre serveur sécurisé."
        : status === "missing"
          ? "Aucune session de paiement n’a été transmise. Cette page seule ne confirme pas un don."
          : status === "invalid"
            ? "Aucun paiement ne sera indiqué comme confirmé sans une session reconnue par notre serveur."
            : status === "unavailable"
              ? "Nous n’avons pas pu vérifier le statut. Votre don n’est pas confirmé par cette page."
              : "Notre serveur n’a pas confirmé le paiement. Vous pouvez revenir au parcours de don.";

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-20 md:px-8">
      <div className="w-full rounded-2xl border border-or/30 bg-white p-8 text-center shadow-sm md:p-12" aria-live="polite">
        <Icon className={`mx-auto h-14 w-14 ${confirmed ? "text-vert" : "text-or-fonce"}`} aria-hidden />
        <p className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-or-fonce">
          {translateContent(confirmed ? "Parcours de don" : "Statut du paiement")}</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-vert-fonce">
          {translateContent(title)}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-anthracite">
          {translateContent(message)}</p>
        {canRetry && (
          <button
            type="button"
            onClick={() => {
              setStatus("loading");
              setAttempt((value) => value + 1);
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-vert px-5 py-3 text-xs font-semibold uppercase tracking-wide text-vert"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            {translateContent("Vérifier à nouveau")}
          </button>
        )}
        <SupportButton className="btn-or mt-8 inline-flex rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wide">
          {translateContent("Revenir au soutien")}</SupportButton>
      </div>
    </section>
  );
}
