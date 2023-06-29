// TODO: production version using cdn not working
// import {
//     i18n,
//     KeyPrefix,
//     TFunction,
//     InitOptions,
//     createInstance
// } from 'i18next';
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
// import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { DEV_MODE } from '@/config/constants';
import { initReactI18next } from 'react-i18next';
import { languages, defaultLng } from '@/config';

// const defaultNS = 'translation';

const apiKey = process.env.NEXT_PUBLIC_I18NEXT_API_KEY;

// eslint-disable-next-line max-len
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        ns: ['default'],
        debug: DEV_MODE,
        defaultNS: 'default',
        returnNull: false,
        fallbackLng: defaultLng,
        supportedLngs: languages,
        backend: {
            loadPath
        }
    });

// export function getOptions(lng = defaultLng, ns = defaultNS): InitOptions {
//     return {
//         ns,
//         lng,
//         defaultNS,
//         debug: DEV_MODE,
//         fallbackNS: defaultNS,
//         fallbackLng: defaultLng,
//         supportedLngs: languages
//     };
// }

// const initI18next = async (lng: string, ns: string): Promise<i18n> => {
//     const i18nInstance = createInstance();
//     await i18nInstance
//         .use(initReactI18next)
//         .use(
//             resourcesToBackend(
//                 (language: string, namespace: string) =>
//                     import(`./locales/${language}/${namespace}.json`)
//             )
//         )
//         .init(getOptions(lng, ns));
//     return i18nInstance;
// };

// export async function useTranslation(
//     lng: string,
//     ns: string,
//     options = { keyPrefix: '' }
// ): Promise<{ t: TFunction<string, KeyPrefix<string>, string>; i18n: i18n }> {
//     const i18nextInstance = await initI18next(lng, ns);
//     const nsValue = Array.isArray(ns) ? ns[0] : ns;
//     const { keyPrefix } = options;
//     const t = i18nextInstance.getFixedT(lng, nsValue, keyPrefix);
//     return { t, i18n: i18nextInstance };
// }
