import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { CardItemFilm, FilmsResponce } from '../../Interfaces/FilmsResponce'
import axios from 'axios'

interface filmSliceState {
	data: CardItemFilm[]
	loading: boolean
	status: 'success' | 'loading' | 'error'
	curPage: number
	totalPages: number
	total: number
}

export const fetchFilms = createAsyncThunk('films/fetchFilms', async (query: URL) => {
	const { data } = await axios.get<FilmsResponce>(query.toString())
	return data as FilmsResponce
})

const initialState: filmSliceState = {
	data: [],
	loading: true,
	status: 'loading',
	curPage: 0,
	totalPages: 0,
	total: 0,
}

export const filmSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		update: (state, action: PayloadAction<CardItemFilm[]>) => {
			state.data = [...state.data, ...action.payload]
		},
		clear: state => {
			state.data = [] as CardItemFilm[]
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchFilms.pending, state => {
			state.loading = true
			state.status = 'loading'
		})
		builder.addCase(fetchFilms.fulfilled, (state, action) => {
			state.data = [...state.data, ...action.payload.docs]
			state.loading = false
			state.status = 'success'
			state.curPage = action.payload.page
			state.totalPages = action.payload.pages
			state.total = action.payload.total
		})
		builder.addCase(fetchFilms.rejected, state => {
			state.loading = true
			state.status = 'error'
		})
	},
})

export const { update, clear } = filmSlice.actions

export const filmsSelector = (state: RootState) => state.films

export default filmSlice.reducer
