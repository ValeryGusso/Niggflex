import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axiosKPofficial from '../../axios/KPofficial'
import { FavoriteResponse, Film } from '../../Interfaces/KPofficial/favorite'

interface FavoriteSliceState {
	loading: boolean
	items: Film[]
	totalItems: number
	totalPages: number
	page: number
}

export interface SetFavoritePayload {
	pages: number
	total: number
}

export const fetchFavorite = createAsyncThunk('favorite/fetchFavorite', async (query: URL) => {
	const { data } = await axiosKPofficial.get<FavoriteResponse>(query.toString())
	return data as FavoriteResponse
})

const initialState: FavoriteSliceState = {
	loading: false,
	items: [],
	totalItems: 0,
	totalPages: 1,
	page: 2,
}

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		updateFavorite(state, action: PayloadAction<Film[]>) {
			state.items = [...state.items, ...action.payload]
		},
		clearFavorite(state) {
			state.items = []
		},
		setFavoriteState(state, action: PayloadAction<SetFavoritePayload>) {
			state.totalItems = action.payload.total
			state.totalPages = action.payload.pages
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchFavorite.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchFavorite.fulfilled, (state, action) => {
			state.loading = false
			state.items = [...state.items, ...action.payload.docs]
			state.page += 1
		})
		builder.addCase(fetchFavorite.rejected, state => {
			state.loading = true
		})
	},
})

export const { updateFavorite, clearFavorite, setFavoriteState } = favoriteSlice.actions

export const favoriteSelector = (state: RootState) => state.favorite

export default favoriteSlice.reducer
