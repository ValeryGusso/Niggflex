import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { User } from '../../Interfaces/UserAPI/userAPIResponses'

interface authSliceState {
	isAuth: boolean
	loading: boolean
	id: string
	email: string
	name: string
	sex: string
	avatar: string
	isActivated: boolean
	favorite: number[]
	viewed: number[]
}

const initialState: authSliceState = {
	isAuth: false,
	loading: true,
	id: '',
	email: '',
	name: '',
	avatar: '',
	sex: '',
	isActivated: false,
	favorite: [],
	viewed: [],
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.isAuth = action.payload.isActivated
			state.id = action.payload.id
			state.email = action.payload.email
			state.name = action.payload.name
			state.avatar = action.payload.avatar
			state.sex = action.payload.sex
			state.isActivated = action.payload.isActivated
			state.favorite = action.payload.favorite
			state.viewed = action.payload.viewed
		},
		removeUser(state) {
			state.isAuth = false
			state.id = ''
			state.email = ''
			state.name = ''
			state.avatar = ''
			state.sex = ''
			state.isActivated = false
			state.favorite = []
			state.viewed = []
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
	},
})

export const { setUser, removeUser, setLoading } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
