export interface ReviewsResponse {
	total: number
	totalPages: number
	totalPositiveReviews: number
	totalNegativeReviews: number
	totalNeutralReviews: number
	items: Item[]
}

export interface Item {
	kinopoiskId: number
	type: string
	date: Date
	positiveRating: number
	negativeRating: number
	author: string
	title: null | string
	description: string
}
