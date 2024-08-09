import type { LocalePrefix } from "../../node_modules/next-intl/dist/types/src/routing/types";

const localePrefix: LocalePrefix = "always";

export const AppConfig = {
  name: "BBPMusicLibrary",
  locales: ["es", "en", "de", "fr", "se"],
  defaultLocale: "",
  localePrefix,
};
