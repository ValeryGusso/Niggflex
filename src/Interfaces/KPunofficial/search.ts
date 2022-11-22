export interface SearchResponse {
  total: number
  totalPages: number
  items: Film[]
}

export interface Film {
  kinopoiskId: number
  imdbId: string | null
  nameRu: string | null
  nameEn: string | null
  nameOriginal: string | null
  countries: Country[]
  genres: Genre[]
  ratingKinopoisk: number
  ratingImdb: number
  year: number
  type: string
  posterUrl: string
  posterUrlPreview: string
}

export interface Country {
  country: string
}

export interface Genre {
  genre: string
}