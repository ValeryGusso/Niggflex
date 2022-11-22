export interface KeywordsFilmResponse {
	keyword: string
	pagesCount: number
	films: Film[]
	searchFilmsCountResult: number
}

export interface Film {
	filmId: number
	nameRu: string | null
	nameEn: string | null
	type: string | null
	year: string | null
	description: string | null
	countries: Country[]
	genres: Genre[]
	rating: string
	ratingVoteCount: number | null
	posterUrl: string | null
	posterUrlPreview: string | null
	filmLength: string | null
}

export interface Country {
	country: string | null
}

export interface Genre {
	genre: string | null
}
