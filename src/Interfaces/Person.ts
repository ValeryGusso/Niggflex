export interface PersonResponse {
  spouses: Spouse[]
  id: number
  name: string
  enName: string
  photo: string
  profession: Profession[]
  birthPlace: BirthPlace[]
  deathPlace: string | null
  facts: Fact[]
  movies: Movie[]
  sortedMovies: Movie[] // Типы не из респонса, добавляются мной вручную для упрощения отрисовки
  renderListMovies: Movie[] // Типы не из респонса, добавляются мной вручную для упрощения отрисовки
  __v: number
  age: number
  birthday: string
  countAwards: number
  death: string | null
  growth: number
  sex: string
  updatedAt: string
}

export interface Spouse {
  _id: string
  id: number
  name: string
  divorced: boolean
  divorcedReason: string
  sex: string
  children: number
  relation: string
}

export interface Profession {
  value: string
}

export interface BirthPlace {
  value: string
}

export interface Fact {
  value: string
}

export interface Movie {
  id: number
  name: string | null
  rating?: number
  general: boolean
  description: string
}