export type Language = "fr" | "en";

export type RouteName =
  | "home"
  | "elimba"
  | "support"
  | "library"
  | "book"
  | "manifestos"
  | "manifesto"
  | "transmission"
  | "academy"
  | "team"
  | "donationSuccess"
  | "donationCancel";

type RouteDefinition = {
  name: RouteName;
  fr: string;
  en: string;
  aliases?: string[];
  dynamic?: "id" | "slug";
};

const routes: RouteDefinition[] = [
  { name: "home", fr: "/", en: "/en" },
  { name: "elimba", fr: "/elimba", en: "/en/elimba" },
  { name: "support", fr: "/soutenir", en: "/en/support" },
  { name: "library", fr: "/bibliotheque", en: "/en/library" },
  { name: "book", fr: "/bibliotheque/consulter", en: "/en/library/read", dynamic: "id" },
  { name: "manifestos", fr: "/manifestes", en: "/en/manifestos" },
  { name: "manifesto", fr: "/manifestes", en: "/en/manifestos", dynamic: "slug" },
  { name: "transmission", fr: "/transmission-muntu", en: "/en/transmission-muntu" },
  { name: "academy", fr: "/academie-muntu", en: "/en/muntu-academy" },
  { name: "team", fr: "/notre-equipe", en: "/en/our-team" },
  { name: "donationSuccess", fr: "/don-success", en: "/en/don-success", aliases: ["/soutenir/succes"] },
  { name: "donationCancel", fr: "/don-cancel", en: "/en/don-cancel", aliases: ["/soutenir/annulation"] },
];

export type ResolvedRoute = {
  language: Language;
  name: RouteName;
  pathname: string;
  param?: string;
};

function splitSuffix(path: string) {
  const suffixIndex = path.search(/[?#]/);
  return suffixIndex < 0
    ? { pathname: path, suffix: "" }
    : { pathname: path.slice(0, suffixIndex), suffix: path.slice(suffixIndex) };
}

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function resolveRoute(pathname: string): ResolvedRoute {
  const { pathname: routePath } = splitSuffix(pathname);
  const isEnglish = routePath === "/en" || routePath.startsWith("/en/");
  const language: Language = isEnglish ? "en" : "fr";
  const localPath = isEnglish ? routePath.slice(3) || "/" : routePath;

  for (const route of routes) {
    if (route.dynamic) {
      const base = language === "en" ? route.en.slice(3) : route.fr;
      const prefix = `${base}/`;
      if (localPath.startsWith(prefix)) {
        return {
          language,
          name: route.name,
          pathname: routePath,
          param: decodeSegment(localPath.slice(prefix.length)),
        };
      }
      continue;
    }

    const candidates = [route.fr, ...(route.aliases ?? [])];
    if (candidates.includes(localPath)) {
      return { language, name: route.name, pathname: routePath };
    }
    if (language === "en" && route.en.slice(3) === localPath) {
      return { language, name: route.name, pathname: routePath };
    }
  }

  return { language, name: "home", pathname: routePath };
}

export function localizedPath(path: string, language?: Language): string {
  if (path.startsWith("#")) return path;
  const { pathname, suffix } = splitSuffix(path);
  const resolved = resolveRoute(pathname);
  const targetLanguage = language ?? (pathname.startsWith("/en/") || pathname === "/en" ? "en" : resolveRoute(window.location.pathname).language);
  const route = routes.find((candidate) => candidate.name === resolved.name);

  if (!route) return path;

  let targetPath = targetLanguage === "en" ? route.en : route.fr;
  if (route.dynamic && resolved.param !== undefined) {
    targetPath = `${targetPath}/${encodeURIComponent(resolved.param)}`;
  }
  return `${targetPath}${suffix}`;
}

export function languageSwitchPath(pathname: string, targetLanguage: Language): string {
  return localizedPath(pathname, targetLanguage);
}

export function navigateToPath(path: string, language?: Language): void {
  const target = localizedPath(path, language);
  window.history.pushState({}, "", target);
  window.dispatchEvent(new Event("routechange"));

  const { pathname, suffix } = splitSuffix(target);
  const hash = suffix.startsWith("#") ? suffix.slice(1) : "";
  if (hash) {
    window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, pathname === window.location.pathname ? 0 : 80);
  }
}