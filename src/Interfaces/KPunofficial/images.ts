export interface ImagesResponse {
  total: number
  totalPages: number
  items: Image[]
}

export interface Image {
  imageUrl: string
  previewUrl: string
}