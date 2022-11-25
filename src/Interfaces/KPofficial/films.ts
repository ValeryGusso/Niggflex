export interface FilmsResponse {
	docs: Film[]
	total: number
	limit: number
	page: number
	pages: number
}

export interface Film {
	externalId: ExternalID
	logo: Logo
	poster: Poster
	rating: Rating
	votes: Rating
	watchability: Watchability
	movieLength: number
	id: number
	type: Type
	name: string
	description: null | string
	year: number
	alternativeName: string
	enName: null | string
	names: Name[]
	shortDescription: null | string
	releaseYears: ReleaseYear[]
	color?: string
}

export interface ExternalID {
	kpHD: null | string
	imdb: string
	tmdb: number
	_id: string
}

export interface Logo {
	_id: string
	url: null | string
}

export interface Name {
	_id: string
	name: string
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

export interface ReleaseYear {
	_id: string
	start: number
	end: number | null
}

export enum Type {
	AnimatedSeries = 'animated-series',
	Movie = 'movie',
	TvSeries = 'tv-series',
}

export interface Watchability {
	_id: string
	items: Item[] | null
}

export interface Item {
	logo: Logo
	_id: string
	name: string
	url: string
}
