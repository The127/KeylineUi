import { createI18n } from 'vue-i18n'

const messages = {
    en: { ok: 'OK', cancel: 'Cancel' },
    de: { ok: 'OK', cancel: 'Abbrechen' },
    da: { ok: 'OK', cancel: 'Annuller' },
}

const SUPPORTED_LOCALES = ['en', 'de', 'da']

function detectLocale() {
    if (navigator.languages) {
        for (const lang of navigator.languages) {
            const base = lang.split('-')[0]
            if (SUPPORTED_LOCALES.includes(base)) {
                return base
            }
        }
    }

    return 'en'
}

export const i18n = createI18n({
    legacy: false,
    locale: detectLocale(),
    fallbackLocale: 'en',
    messages,
})
