export interface RegResponse {
  data: Data
  status: number
  statusText: string
  headers: Headers
  config: Config
  request: Request
}

export interface Data {
  user: User
  success: boolean
}

export interface User {
  id: string
  email: string
  name: string
  avatar: string
  sex: string
  isActivated: boolean
  favorite: number[]
  viewed: number[]
}

export interface Headers {
  "content-length": string
  "content-type": string
}

export interface Config {
  transitional: Transitional
  transformRequest: any[]
  transformResponse: any[]
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
  env: Env
  headers: Headers2
  baseURL: string
  method: string
  url: string
  data: string
}

export interface Transitional {
  silentJSONParsing: boolean
  forcedJSONParsing: boolean
  clarifyTimeoutError: boolean
}

export interface Env {}

export interface Headers2 {
  Accept: string
  "Content-Type": string
  Authorization: string
}

export interface Request {}