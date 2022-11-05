export interface FilmsResponce {
	docs: CardItemFilm[]
	total: number
	limit: number
	page: number
	pages: number
}

export interface CardItemFilm {
	externalId: ExternalId
	logo: Logo
	poster: Poster
	rating: Rating
	votes: Votes
	watchability: Watchability
	id: number
	type: string
	name: string
	description: string
	year: number
	alternativeName: string | null
	color?: string | null
	enName: string | null
	names: Name[]
	movieLength: number | null
	shortDescription: string | null
	releaseYears: any[]
}

export interface ExternalId {
	_id: string
	imdb: string | null
	kpHD?: string | null

}

export interface Logo {
	_id: string
	url: string | null
}

export interface Poster {
	_id: string
	url: string
	previewUrl: string
}

export interface Rating {
	_id: string
	kp: number
	imdb: number
	filmCritics: number
	russianFilmCritics: number
	await: number
}

export interface Votes {
	_id: string
	kp: number
	imdb: number
	filmCritics: number
	russianFilmCritics: number
	await: number
}

export interface Watchability {
	_id: string
	items: any
}

export interface Name {
	_id: string
	name: string
}
