import * as i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {enConfig} from './translationsConfigEN';
import {ruConfig} from './translationsConfigRU';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: enConfig,
        ru: ruConfig,
    },
});

export default i18n;
