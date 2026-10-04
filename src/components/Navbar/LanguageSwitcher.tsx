import { translateContent } from "../../i18n/translateContent";
import { useTranslation } from "react-i18next";
import { languageSwitchPath, navigateToPath } from "../../routing/routes";
import type { Language } from "../../routing/routes";
import { cn } from "../../utils/cn";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation("common");
  const activeLanguage: Language = i18n.resolvedLanguage === "en" ? "en" : "fr";

  const switchLanguage = (language: Language) => {
    const target = languageSwitchPath(
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
      language,
    );
    navigateToPath(target, language);
  };

  return (
    <div
      role="group"
      aria-label={translateContent(t("languageSelector"))}
      className="inline-flex shrink-0 items-center rounded-full border border-or/50 bg-white/95 p-0.5 text-xs font-semibold shadow-sm"
    >
      {(["fr", "en"] as const).map((language) => (
        <button
          key={language}
          type="button"
          lang={language}
          aria-label={translateContent(t(language === "fr" ? "french" : "english"))}
          aria-pressed={activeLanguage === language}
          onClick={() => switchLanguage(language)}
          className={cn(
            "min-w-9 rounded-full px-2 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or",
            activeLanguage === language
              ? "bg-vert text-white"
              : "text-vert hover:bg-creme",
          )}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}