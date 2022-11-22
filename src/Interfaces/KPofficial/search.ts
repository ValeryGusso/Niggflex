export interface SearchResponse {
	docs: Doc[]
	total: number
	limit: number
	page: number
	pages: number
}

export interface Doc {
	externalId: ExternalId
	logo: Logo
	poster: Poster | null
	rating: Rating
	votes: Votes
	watchability: Watchability
	id: number
	names: Name[]
	alternativeName: string | null
	description: string | null
	enName: string | null
	movieLength: number | null
	name: string | null
	year: number
	shortDescription: string | null
	type: string
	releaseYears: ReleaseYear[]
	color: string | null
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
	kp: number
	imdb: number
	filmCritics: number
	russianFilmCritics: number
	await: number
	_id: string
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
	_id: string
	name: string
	url: string
}

export interface WatchabilityLogo {
	_id: string
	url: string
}

export interface Name {
	_id: string
	name: string
}

export interface ReleaseYear {
	start: number | null
	end: number | null
	_id: string
}
