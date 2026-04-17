import en from "./en.json";
import ko from "./ko.json";

const translations: Record<string, Record<string, string>> = { en, ko };

export function t(key: string, locale: string = "en"): string {
  return translations[locale]?.[key] ?? translations["en"]?.[key] ?? key;
}

export function getLocaleFromUrl(url: URL): string {
  const [, first] = url.pathname.split("/");
  return first === "ko" ? "ko" : "en";
}

export function getLocalePath(path: string, locale: string): string {
  const clean = path.replace(/^\/ko/, "") || "/";
  return locale === "ko" ? `/ko${clean === "/" ? "" : clean}` : clean || "/";
}

export const AUTHOR_NAME_VARIANTS = [
  "Seo-Young Lee",
  "Seoyoung Lee",
  "S.-Y. Lee",
  "S. Lee",
];

export function isAuthor(name: string): boolean {
  const cleaned = name.replace(/\*/g, "").trim();
  return AUTHOR_NAME_VARIANTS.some(
    (v) => cleaned.toLowerCase() === v.toLowerCase()
  );
}
