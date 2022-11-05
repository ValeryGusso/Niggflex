export interface ImagesResponse {
  docs: Doc[]
  total: number
  limit: number
  page: number
  pages: number
}

export interface Doc {
  url: string
  previewUrl: string
  height?: number | null
  width?: number | null
  language?: string | null
  type: string
  movieId: number
}