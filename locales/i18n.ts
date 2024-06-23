import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationKO from './ko/translation.json';
import { getLocales } from 'expo-localization';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en: {
            translation: translationEN
        },
        ko: {
            translation: translationKO
        }
    },
    lng: getLocales()[0]?.languageCode ?? "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;

