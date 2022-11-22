export interface KeywordsActorResponse {
	docs: Actor[]
	total: number
	limit: number
	page: number
	pages: number
}

export interface Actor {
	id: number
	name: string
	enName: string | null
	photo: string | null
	age: number | null
	sex: string | null
}
