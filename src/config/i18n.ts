// TODO: production version using cdn not working
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { DEV_MODE } from 'config/constants';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { languages } from 'config';

const apiKey = process.env.NEXT_PUBLIC_I18NEXT_API_KEY;

// eslint-disable-next-line max-len
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: DEV_MODE,
        fallbackLng: 'en',
        ns: ['default'],
        defaultNS: 'default',
        supportedLngs: languages,
        backend: {
            loadPath
        }
    });
