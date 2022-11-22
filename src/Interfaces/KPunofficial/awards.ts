export interface AwardsResponse {
	total: number
	items: Award[]
}

export interface Award {
	name: string
	win: boolean
	imageUrl: string | null
	nominationName: string
	year: number
	persons: Person[]
}

export interface Person {
	kinopoiskId: number
	webUrl: string
	nameRu: string
	nameEn: string
	sex: string
	posterUrl: string
	growth: number | null
	birthday: string | null
	death: string | null
	age: number | null
	birthplace: string | null
	deathplace: string | null
	profession: string | null
}
