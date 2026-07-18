import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      appTitle: 'IMDb Media Trends Dashboard',
      // CONTINUE TO MAP WORDS AND TRANSLATIONS
    },
  },
  fr: {
    translation: {
      appTitle: 'Tableau de Bord des Tendances Médias IMDb',
      
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n