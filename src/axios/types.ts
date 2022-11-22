export interface ActivateResponse {
	user: User
	access: string
}

export interface RegistrationResponse {
	id: string
	user: string
	sended: boolean
}

export interface UpdatedResponse {
	user: User
}

export interface MeResponse {
	id: string
	email: string
	name: string
	sex: string
	avatar: string
	isActivated: boolean
	favorite: number[]
	viewed: number[]
}

export interface User {
	id: string
	email: string
	name: string
	sex: string
	avatar: string
	isActivated: boolean
	favorite: number[]
	viewed: number[]
}
