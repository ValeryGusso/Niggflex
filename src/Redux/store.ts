import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/auth'
import favoriteSlice from './Slices/favorite'
import filmSlice from './Slices/films'
import reviews from './Slices/reviews'
import searchActorsSlice from './Slices/searchActors'
import searchFilmsSlice from './Slices/searchFilms'

export const store = configureStore({
	reducer: {
		films: filmSlice,
		searchFilms: searchFilmsSlice,
		searchActors: searchActorsSlice,
		favorite: favoriteSlice,
		reviews: reviews,
		auth: authSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch
