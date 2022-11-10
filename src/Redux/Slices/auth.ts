import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { User } from '../../axios/types'

interface authSliceState {
	isAuth: boolean
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
	id: '',
	email: '',
	name: 'Unnamed User',
	avatar: '',
	sex: 'helicopter',
	isActivated: false,
	favorite: [],
	viewed: [],
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, actions: PayloadAction<User>) {
			state.isAuth = actions.payload.isActivated
			state.id = actions.payload.id
			state.email = actions.payload.email
			state.name = actions.payload.name
			state.avatar = actions.payload.avatar
			state.sex = actions.payload.sex
			state.isActivated = actions.payload.isActivated
			state.favorite = actions.payload.favorite
			state.viewed = actions.payload.viewed
		},
		removeUser(state) {
			state.isAuth = false
			state.id = ''
			state.email = ''
			state.name = 'Unnamed User'
			state.avatar = ''
			state.sex = 'man'
			state.isActivated = false
			state.favorite = []
			state.viewed = []
		},
	},
	extraReducers: builder => {},
})

export const { setUser, removeUser } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
