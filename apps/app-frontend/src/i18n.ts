import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

/** Vite `base` (e.g. `/osac-ux/` on GitHub Pages) so locales load under the project path. */
const localesBase = import.meta.env.BASE_URL.replace(/\/?$/, '/');

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${localesBase}locales/{{lng}}/{{ns}}.json`,
    },
  });


export default i18n;
