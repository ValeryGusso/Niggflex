export interface FactsResponse {
  total: number
  items: Fact[]
}

export interface Fact {
  text: string
  type: string
  spoiler: boolean
}