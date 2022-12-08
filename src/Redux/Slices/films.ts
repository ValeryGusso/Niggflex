import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axiosKPunofficial from '../../axios/KPunofficial'
import { Film, SearchResponse } from '../../Interfaces/KPunofficial/search'

interface filmSliceState {
	data: Film[]
	loading: boolean
	status: 'success' | 'loading' | 'error'
	curPage: number
	totalPages: number
	total: number
	pageLimit: number
	prevParams: ParamsType
}

export interface ParamsType {
	type: string
	genres: number | null
	ratingFrom: number
	ratingTo: number
	yearFrom: number
	yearTo: number
	order: string
	page: number
}

export const fetchFilms = createAsyncThunk('films/fetchFilms', async (params: ParamsType) => {
	const { data } = await axiosKPunofficial.get<SearchResponse>('/v2.2/films', { params })
	return data as SearchResponse
})

const initialState: filmSliceState = {
	data: [],
	loading: true,
	status: 'loading',
	curPage: 1,
	totalPages: 0,
	total: 0,
	pageLimit: 1,
	prevParams: {} as ParamsType,
}

export const filmSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		update: (state, action: PayloadAction<Film[]>) => {
			state.data = [...state.data, ...action.payload]
		},
		clear: state => {
			state.data = []
		},
		setParams: (state, action: PayloadAction<ParamsType>) => {
			state.prevParams = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchFilms.pending, state => {
			state.loading = true
			state.status = 'loading'
		})
		builder.addCase(fetchFilms.fulfilled, (state, action) => {
			state.data = [...state.data, ...action.payload.items]
			state.loading = false
			state.status = 'success'
			state.totalPages = action.payload.totalPages
			state.pageLimit = action.payload.total / 20
			state.total = action.payload.total
			state.curPage += 1
		})
		builder.addCase(fetchFilms.rejected, state => {
			state.loading = false
			state.status = 'error'
		})
	},
})

export const { update, clear, setParams } = filmSlice.actions

export const filmsSelector = (state: RootState) => state.films

export default filmSlice.reducer
