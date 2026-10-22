import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { ApiError } from "../../services/apiClient";
import { loginAdmin } from "../../services/adminService";
import { navigateToPath } from "../../routing/routes";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitState, setSubmitState] = useState<{ type: "idle" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setSubmitState({ type: "idle", message: "" });

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailIsValid) {
      setSubmitState({
        type: "error",
        message: "Veuillez saisir une adresse e-mail valide pour continuer.",
      });
      return;
    }

    if (!password.trim()) {
      setSubmitState({
        type: "error",
        message: "Le mot de passe est requis pour accéder à l'espace d'administration.",
      });
      return;
    }

    setLoading(true);
    try {
      await loginAdmin({ email: email.trim(), password, remember: rememberMe });
      setPassword("");
      navigateToPath("/admin");
    } catch (error) {
      const message = error instanceof ApiError
        ? error.kind === "unauthorized"
          ? "Adresse e-mail ou mot de passe incorrect."
          : error.kind === "rate_limit"
            ? "Trop de tentatives. Veuillez patienter avant de réessayer."
            : error.message
        : "Une erreur est survenue. Veuillez réessayer.";
      setSubmitState({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#f5f1e6] px-4 py-10">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-[#d7cfba] bg-white shadow-[0_18px_50px_rgba(15,45,34,0.08)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative hidden overflow-hidden bg-[#0f2d22] p-10 text-[#f5f1e6] lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,168,75,0.28),transparent_52%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4a84b] text-base font-bold text-[#0f2d22]">
                RM
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4a84b]">Renaissance-Muntu</p>
                <p className="text-xl font-semibold">Espace institutionnel</p>
              </div>
            </div>
            <h2 className="mt-12 max-w-sm font-serif text-4xl leading-tight text-white">
              Une gouvernance claire pour la renaissance des consciences.
            </h2>
          </div>

          <div className="relative z-10 space-y-3 text-sm text-[#e7e1d6]">
            <p>• Gestion des messages et demandes de partenariat</p>
            <p>• Suivi de la bibliothèque et des contenus</p>
            <p>• Administration sécurisée des comptes et paramètres</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a6b3d]">Accès réservé</p>
              <h1 className="mt-3 font-serif text-4xl text-[#0f2d22]">Espace d'administration</h1>
              <p className="mt-3 text-sm text-[#5d564e]">
                Bienvenue dans le centre de pilotage de la Renaissance du Muntu.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#2d342f]">
                  Adresse e-mail
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 focus-within:border-[#b8860b] focus-within:ring-2 focus-within:ring-[#d4a84b]/30">
                  <Mail size={18} className="text-[#6a665f]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@renaissance-muntu.org"
                    className="w-full border-0 bg-transparent text-sm text-[#1f2a1f] outline-none placeholder:text-[#8a827b]"
                    autoComplete="username"
                    aria-invalid={submitState.type === "error" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#2d342f]">
                  Mot de passe
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-[#d7cfba] bg-[#fffdf9] px-3 py-3 focus-within:border-[#b8860b] focus-within:ring-2 focus-within:ring-[#d4a84b]/30">
                  <LockKeyhole size={18} className="text-[#6a665f]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full border-0 bg-transparent text-sm text-[#1f2a1f] outline-none placeholder:text-[#8a827b]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((state) => !state)}
                    className="text-[#4d4b48]"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-[#4d4d4d]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-[#c9c0ad] text-[#0f2d22] focus:ring-[#d4a84b]"
                />
                Se souvenir de moi
              </label>

              {submitState.message ? (
                <div className="rounded-xl border border-[#d38a80] bg-[#fdf0ee] px-3 py-2 text-sm text-[#7c2d26]" role="alert">
                  {submitState.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#0f2d22] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#173b2d]"
              >
                {loading ? "Connexion…" : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
