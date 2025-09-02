import { createI18n } from 'vue-i18n'

const messages = {
    en: { ok: 'OK', cancel: 'Cancel' },
    de: { ok: 'OK', cancel: 'Abbrechen' },
    da: { ok: 'OK', cancel: 'Annuller' },
}

const datetimeFormats = {
    'en': {
        short: {
            year: 'numeric', month: 'short', day: 'numeric'
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric',
            weekday: 'short', hour: 'numeric', minute: 'numeric'
        }
    },
    'de': {
        short: {
            year: 'numeric', month: 'short', day: 'numeric'
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric',
            weekday: 'short', hour: 'numeric', minute: 'numeric'
        }
    },
    'da': {
        short: {
            year: 'numeric', month: 'short', day: 'numeric'
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric',
            weekday: 'short', hour: 'numeric', minute: 'numeric'
        }
    },
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
    datetimeFormats: datetimeFormats,
    messages,
})
