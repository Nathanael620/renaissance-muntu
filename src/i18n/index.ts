import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common";
import enNavigation from "./locales/en/navigation";
import frCommon from "./locales/fr/common";
import frNavigation from "./locales/fr/navigation";
import enContent from "./locales/en/content";
import enData from "./locales/en/data";
import enManifestos from "./locales/en/manifestos";
import enExtra from "./locales/en/extra";

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon, navigation: enNavigation, content: { ...enContent, ...enData, ...enManifestos, ...enExtra } },
    fr: { common: frCommon, navigation: frNavigation, content: {} },
  },
  lng: "fr",
  fallbackLng: "fr",
  defaultNS: "common",
  ns: ["common", "navigation", "content"],
  interpolation: { escapeValue: false },
});

export default i18n;