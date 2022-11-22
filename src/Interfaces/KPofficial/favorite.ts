export interface FavoriteResponse {
	docs: Film[]
	total: number
	limit: number
	page: number
	pages: number
}

export interface Film {
	externalId: ExternalId
	logo: Logo
	poster: Poster
	rating: Rating
	votes: Votes
	watchability: Watchability
	movieLength: number
	id: number
	type: string
	name: string
	description: string
	year: number
	alternativeName: string
	enName: string | null
	names: Name[]
	shortDescription: string | null
	releaseYears: ReleaseYear[] | null
}

export interface ExternalId {
	kpHD: string | null
	imdb: string | null
	tmdb: number | null
	_id: string
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
	kp: number
	imdb: number
	filmCritics: number
	russianFilmCritics: number
	await: number
	_id: string
}

export interface Watchability {
	_id: string
	items: Item[] | null
}

export interface Item {
	logo: WatchabilityLogo
	name: string
	url: string
	_id: string
}

export interface WatchabilityLogo {
	url: string
	_id: string
}

export interface Name {
	_id: string
	name: string
}

export interface ReleaseYear {
	start: number
	end: number
	_id: string
}
