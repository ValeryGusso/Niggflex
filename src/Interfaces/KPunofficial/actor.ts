export interface ActorResponse {
  personId: number
  webUrl: string
  nameRu: string
  nameEn: string
  sex: string
  posterUrl: string
  growth: number
  birthday: string
  death: string | null
  age: number
  birthplace: string
  deathplace: any
  spouses: Spouse[]
  hasAwards: number
  profession: string
  facts: string[]
  films: Film[]
}

export interface Spouse {
  personId: number
  name: string
  divorced: boolean
  divorcedReason: string
  sex: string
  children: number
  webUrl: string
  relation: string
}

export interface Film {
  filmId: number
  nameRu: string | null
  nameEn: string | null
  rating: string | null
  general: boolean
  description: string
  professionKey: string
}