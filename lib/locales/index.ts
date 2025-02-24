/**
 * Locales
 */

import { I18n } from "i18n-js";

import English from "@/lib/locales/en";
import Farsi from "@/lib/locales/fa";

const Locales = new I18n({
  en: English,
  fa: Farsi,
});

Locales.enableFallback = true;
Locales.defaultLocale = "fa";

export { Locales };
