import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/auth'
import filmSlice from './Slices/films'

export const store = configureStore({
	reducer: {
		films: filmSlice,
		auth: authSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch
