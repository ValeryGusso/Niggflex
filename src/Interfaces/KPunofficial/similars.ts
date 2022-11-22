export interface SimilarsResponse {
  total: number
  items: Film[]
}

export interface Film {
  filmId: number
  nameRu: string
  nameEn: string
  nameOriginal: string
  posterUrl: string
  posterUrlPreview: string
  relationType: string
}