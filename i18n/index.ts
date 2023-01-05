import { Locales } from "./locales";

import en from "./en.json";
import pt from "./pt.json";

export const messages = {
  [Locales.EN]: en,
  [Locales.PT]: pt,
};

export const defaultLocale = Locales.EN;
