import i18n from "./index";
import type { ReactNode } from "react";

export function translateContent(value: string): string;
export function translateContent(value: unknown): ReactNode;
export function translateContent(value: unknown): ReactNode {
  if (typeof value === "string") {
    const leading = value.match(/^\s*/)?.[0] ?? "";
    const trailing = value.match(/\s*$/)?.[0] ?? "";
    const key = value.trim();
    if (!key) return value;
    const translated = i18n.t(key, { ns: "content", defaultValue: key });
    const resolved =
      i18n.language.startsWith("en") && translated === key
        ? translateDynamicEnglish(key)
        : translated;
    return `${leading}${decodeEntities(resolved)}${trailing}`;
  }
  if (Array.isArray(value)) {
    return value.map((item) => translateContent(item));
  }
  return value as ReactNode;
}

function translateDynamicEnglish(value: string): string {
  const patterns: Array<[RegExp, string]> = [
    [/^Portrait de (.+)$/, "Portrait of $1"],
    [/^Portrait à venir — (.+)$/, "Portrait coming soon — $1"],
    [/^Couverture de l'ouvrage « (.+) »$/, "Cover of the book “$1”"],
    [/^4e de couverture de l'ouvrage « (.+) »$/, "Back cover of the book “$1”"],
    [/^([0-9]+) sur ([0-9]+)$/, "$1 of $2"],
    [/^Voir le membre ([0-9]+)$/, "View member $1"],
    [/^Aller à (.+)\.$/, "Go to $1."],
  ];

  for (const [pattern, replacement] of patterns) {
    if (pattern.test(value)) return value.replace(pattern, replacement);
  }
  return value;
}

export function translateBackendMessage(value: string, englishFallback: string): string {
  if (!i18n.language.startsWith("en")) return value;
  if (!value) return englishFallback;
  if (!i18n.exists(value, { ns: "content", lng: "en" })) return englishFallback;
  return i18n.t(value, { ns: "content", lng: "en" });
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, "\u00a0")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&bull;/g, "•");
}