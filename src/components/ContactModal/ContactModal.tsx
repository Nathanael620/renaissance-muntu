import { useEffect, useId, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Mail, Send, X } from "lucide-react";
import { contact } from "../../data/siteData";
import { openContactModalEvent } from "./contactModalEvents";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const handleOpen = () => {
      setSent(false);
      setOpen(true);
    };
    window.addEventListener(openContactModalEvent, handleOpen);
    return () => window.removeEventListener(openContactModalEvent, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-vert-fonce/75 px-4 py-6 backdrop-blur-sm sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-creme-clair shadow-2xl">
        <div className="grid md:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-vert-profond px-6 py-8 text-white sm:px-8 md:px-7 md:py-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-or-clair/50 text-or-clair">
              <Mail className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-8 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-or-clair">
              Entrer en dialogue
            </p>
            <h2 id={titleId} className="mt-3 font-serif text-3xl leading-tight text-white">
              Écrivons la suite ensemble.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Une question, une idée ou une envie de contribuer ? Notre équipe vous répond avec attention.
            </p>
            <div className="mt-8 border-t border-white/15 pt-5 text-xs leading-relaxed text-white/65">
              <p className="font-semibold text-white/90">{contact.email}</p>
              <p className="mt-1">Réponse sous 2 à 3 jours ouvrés.</p>
            </div>
          </div>

          <div className="relative px-6 py-8 sm:px-8 md:px-9 md:py-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-anthracite/70 transition-colors hover:bg-creme hover:text-vert"
              aria-label="Fermer le formulaire de contact"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {sent ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-vert" aria-hidden />
                <h3 className="mt-5 font-serif text-2xl text-vert-fonce">Message bien reçu.</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-anthracite/75">
                  Merci pour votre message. Nous reviendrons vers vous très bientôt.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-or mt-7 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wide"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="pr-8">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-or-fonce">
                    Formulaire de contact
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-vert-fonce">Comment pouvons-nous vous aider ?</h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-vert-fonce">
                    Nom complet
                    <input required name="name" type="text" autoComplete="name" placeholder="Votre nom" className="mt-2 w-full rounded-md border border-vert/15 bg-white px-3 py-3 text-sm font-normal text-anthracite outline-none transition focus:border-or focus:ring-2 focus:ring-or/20" />
                  </label>
                  <label className="block text-xs font-semibold text-vert-fonce">
                    Adresse email
                    <input required name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" className="mt-2 w-full rounded-md border border-vert/15 bg-white px-3 py-3 text-sm font-normal text-anthracite outline-none transition focus:border-or focus:ring-2 focus:ring-or/20" />
                  </label>
                </div>

                <label className="block text-xs font-semibold text-vert-fonce">
                  Objet de votre message
                  <select name="subject" defaultValue="" className="mt-2 w-full rounded-md border border-vert/15 bg-white px-3 py-3 text-sm font-normal text-anthracite outline-none transition focus:border-or focus:ring-2 focus:ring-or/20">
                    <option value="" disabled>Sélectionnez un sujet</option>
                    <option value="information">Demande d'information</option>
                    <option value="partnership">Partenariat</option>
                    <option value="contribution">Contribuer au mouvement</option>
                    <option value="other">Autre sujet</option>
                  </select>
                </label>

                <label className="block text-xs font-semibold text-vert-fonce">
                  Votre message
                  <textarea required name="message" rows={4} placeholder="Écrivez votre message ici..." className="mt-2 w-full resize-y rounded-md border border-vert/15 bg-white px-3 py-3 text-sm font-normal text-anthracite outline-none transition focus:border-or focus:ring-2 focus:ring-or/20" />
                </label>

                <button type="submit" className="btn-or inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wide">
                  Envoyer le message
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
