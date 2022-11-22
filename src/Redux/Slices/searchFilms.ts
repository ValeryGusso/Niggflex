import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Film, KeywordsFilmResponse } from '../../Interfaces/KPunofficial/keywords'
import axiosKPunofficial from '../../axios/KPunofficial'

interface SearchFilmsSliceState {
	keyword: string
	loading: boolean
	films: Film[]
	totalItems: number
	totalPages: number
	page: number
}

export interface FetchSearchFilmsArguments {
	keyword: string
	page: number
}

export interface SetFilmsStatePayload {
	keyword: string
	total: number
}

export const fetchSearchFilms = createAsyncThunk(
	'searchFilms/fetchFilms',
	async ({ keyword, page }: FetchSearchFilmsArguments) => {
		const { data } = await axiosKPunofficial.get<KeywordsFilmResponse>('/v2.1/films/search-by-keyword', {
			params: {
				keyword,
				page,
			},
		})
		return data as KeywordsFilmResponse
	}
)

const initialState: SearchFilmsSliceState = {
	keyword: '',
	loading: false,
	films: [],
	totalItems: 0,
	totalPages: 1,
	page: 2,
}

export const searchFilmsSlice = createSlice({
	name: 'searchFilms',
	initialState,
	reducers: {
		updateFilms(state, action: PayloadAction<Film[]>) {
			state.films = [...state.films, ...action.payload]
		},
		clearFilms(state) {
			state.films = []
		},
		setFilmsState(state, action: PayloadAction<SetFilmsStatePayload>) {
			state.keyword = action.payload.keyword
			state.totalItems = action.payload.total
			state.totalPages = Math.ceil(action.payload.total / 20)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchSearchFilms.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchSearchFilms.fulfilled, (state, action) => {
			state.loading = false
			state.films = [...state.films, ...action.payload.films]
			state.page += 1
		})
		builder.addCase(fetchSearchFilms.rejected, state => {
			state.loading = true
		})
	},
})

export const { updateFilms, clearFilms, setFilmsState } = searchFilmsSlice.actions

export const searchFilmsSelector = (state: RootState) => state.searchFilms

export default searchFilmsSlice.reducer
