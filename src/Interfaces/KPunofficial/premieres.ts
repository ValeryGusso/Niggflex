export interface PremieresResponse {
	total: number
	items: Film[]
}

export interface Film {
	kinopoiskId: number
	nameRu: string
	nameEn: string
	year: number
	posterUrl: string
	posterUrlPreview: string
	countries: Country[]
	genres: Genre[]
	duration: number | null
	premiereRu: string
}

export interface Country {
	country: string
}

export interface Genre {
	genre: string
}
