import { useState, type FormEvent } from "react";
import { ApiError } from "../../services/apiClient";
import { acceptAdminInvitation } from "../../services/adminService";
import { navigateToPath } from "../../routing/routes";

export default function AdminInvitationPage() {
  const token = new URLSearchParams(window.location.hash.slice(1)).get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Le lien d’invitation ne contient pas de jeton valide.");
      return;
    }
    if (password !== confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const response = await acceptAdminInvitation({
        token,
        password,
        password_confirmation: confirmation,
      });
      setPassword("");
      setConfirmation("");
      setSuccess(response.message);
      window.setTimeout(() => navigateToPath("/admin/connexion"), 1200);
    } catch (requestError) {
      setError(requestError instanceof ApiError
        ? requestError.kind === "validation"
          ? requestError.message || "L’invitation est invalide ou le mot de passe ne respecte pas les critères."
          : requestError.message
        : "Impossible d’activer le compte. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e6] px-4 py-10">
      <section className="mx-auto max-w-xl rounded-[28px] border border-[#d7cfba] bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a6b3d]">Accès réservé</p>
        <h1 className="mt-3 font-serif text-3xl text-[#0f2d22]">Activer votre compte</h1>
        <p className="mt-3 text-sm text-[#5d564e]">
          Choisissez un mot de passe d’au moins 12 caractères, avec une majuscule, une minuscule et un chiffre.
        </p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-[#2d342f]">
            Nouveau mot de passe
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 text-sm text-[#1f2a1f] outline-none focus:border-[#b8860b]"
            />
          </label>
          <label className="block text-sm font-medium text-[#2d342f]">
            Confirmer le mot de passe
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={12}
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 text-sm text-[#1f2a1f] outline-none focus:border-[#b8860b]"
            />
          </label>

          {error && <p className="rounded-xl border border-[#d38a80] bg-[#fdf0ee] px-3 py-2 text-sm text-[#7c2d26]" role="alert">{error}</p>}
          {success && <p className="rounded-xl border border-[#bfd7c7] bg-[#edf8f1] px-3 py-2 text-sm text-[#214f3d]" role="status">{success}</p>}

          <button
            type="submit"
            disabled={loading || Boolean(success)}
            className="w-full rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#173b2d] disabled:opacity-60"
          >
            {loading ? "Activation…" : "Activer le compte"}
          </button>
        </form>
      </section>
    </div>
  );
}
