export interface TopResponse {
  pagesCount: number
  films: Film[]
}

export interface Film {
  filmId: number
  nameRu: string
  nameEn: string | null
  year: string
  filmLength: string | null
  countries: Country[]
  genres: Genre[]
  rating: string | null
  ratingVoteCount: number | null
  posterUrl: string
  posterUrlPreview: string
  ratingChange: any
}

export interface Country {
  country: string
}

export interface Genre {
  genre: string
}