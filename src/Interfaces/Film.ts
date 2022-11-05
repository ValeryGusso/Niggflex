export interface FilmResponce {
  externalId: ExternalId
  logo: Logo
  poster: Poster
  backdrop: Backdrop
  rating: Rating
  votes: Votes
  videos: Videos
  budget: Budget
  fees: Fees
  distributors: Distributors
  premiere: Premiere
  images: Images
  watchability: Watchability
  collections: any[]
  updateDates: any[]
  status: string
  movieLength: number
  productionCompanies: ProductionCompany[]
  spokenLanguages: SpokenLanguage[]
  id: number
  type: string
  name: string
  description: string
  slogan: string
  year: number
  facts: Fact[]
  genres: Genre[]
  countries: Country[]
  seasonsInfo: any[]
  persons: Person[]
  lists: any[]
  typeNumber: number
  alternativeName: string
  enName: any
  names: Name[]
  updatedAt: string
  ratingMpaa: string
  shortDescription: string
  technology: Technology
  ticketsOnSale: boolean
  sequelsAndPrequels: SequelsAndPrequel[]
  similarMovies: any[]
  imagesInfo: ImagesInfo
  ageRating: number
  top10: number | null
  top250: number | null
  createDate: string
  releaseYears: any[]
}

export interface ExternalId {
  _id: string
  imdb: string
  kpHD: string
}

export interface Logo {
  _id: string
  url: string
}

export interface Poster {
  _id: string
  url: string
  previewUrl: string
}

export interface Backdrop {
  _id: string
  url: string
  previewUrl: string
}

export interface Rating {
  _id: string
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export interface Votes {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
  _id: string
}

export interface Videos {
  _id: string
  trailers: any[]
  teasers: any[]
}

export interface Budget {
  _id: string
  value: number
  currency: string
}

export interface Fees {
  world: World
  russia: Russia
  usa: Usa
  _id: string
}

export interface World {
  _id: string
  value: number
  currency: string
}

export interface Russia {
  _id: string
  value: number
  currency: string
}

export interface Usa {
  _id: string
  value: number
  currency: string
}

export interface Distributors {
  distributor: string
  distributorRelease: string
}

export interface Premiere {
  _id: string
  country: string
  world: string
  russia: string
  cinema: string
  dvd: string
  bluray: string
}

export interface Images {
  postersCount: number
  backdropsCount: number
  framesCount: number
}

export interface Watchability {
  _id: string
  items: Item[]
}

export interface Item {
  logo: Logo2
  _id: string
  name: string
  url: string
}

export interface Logo2 {
  _id: string
  url: string
}

export interface ProductionCompany {
  name: string
  url: string
  previewUrl: string
}

export interface SpokenLanguage {
  name: string
  nameEn: string
}

export interface Fact {
  value: string
  type: string
  spoiler: boolean
}

export interface Genre {
  name: string
}

export interface Country {
  name: string
}

export interface Person {
  id: number
  photo: string
  name: string | null
  enName: string
  enProfession: string
}

export interface Name {
  name: string
}

export interface Technology {
  _id: string
  hasImax: boolean
  has3D: boolean
}

export interface SequelsAndPrequel {
  _id: string
}

export interface ImagesInfo {
  _id: string
  framesCount: number
}

