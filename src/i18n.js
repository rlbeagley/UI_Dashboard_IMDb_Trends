import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      appTitle: 'IMDb Media Trends Dashboard',
      totalGenresHeader: 'Total number of genres',
      dataAcknowledgement: 'From the official IMDb free dataset',
      totalAvgRatingHeader: 'Average Rating Across All Media',
      genre: "Genre",
      avgRating: "Average Rating",
      ratingPerGenreTitle: "Average Rating Per Genre",
      genreDistributionTitle: "Distribution of Genres Across Media",
      titlesLabel: 'Titles',
      Action: 'Action',
      Comedy: 'Comedy',
      Crime: 'Crime',
      Documentary: 'Documentary',
      Drama: 'Drama',
      Horror: 'Horror',
      Romance: 'Romance',
      Thriller: 'Thriller',
      Other: 'Other',
    },
  },
  fr: {
    translation: {
      appTitle: 'Tableau de Bord des Tendances Médias IMDb',
      totalGenresHeader: 'Nombre total de genres',
      dataAcknowledgement: "À partir du jeu de données gratuit officiel d'IMDb",
      totalAvgRatingHeader: 'Note Moyenne sur Tous les Médias',
      genre: "Genre",
      avgRating: "Note Moyenne",
      ratingPerGenreTitle: 'Note Moyenne par Genre',
      genreDistributionTitle: 'Répartition des Genres dans les Médias',
      titlesLabel: 'Titres',
      Action: 'Action',
      Comedy: 'Comédie',
      Crime: 'Policier',
      Documentary: 'Documentaire',
      Drama: 'Drame',
      Horror: 'Horreur',
      Romance: 'Romance',
      Thriller: 'Thriller',
      Other: 'Autre',
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