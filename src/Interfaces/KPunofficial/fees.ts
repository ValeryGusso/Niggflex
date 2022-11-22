export interface FeesResponse {
	total: number
	items: Fees[]
}

export interface Fees {
	type: string
	amount: number
	currencyCode: string
	name: string
	symbol: string
}
