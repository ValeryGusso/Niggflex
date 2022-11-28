import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axiosKPofficial from '../../axios/KPofficial'
import { Doc, SearchResponse } from '../../Interfaces/KPofficial/search'

interface NoveltySliceState {
	loading: boolean
	items: Doc[]
	totalItems: number
	totalPages: number
	page: number
}

export const fetchNovelty = createAsyncThunk('novelty/fetchNovelty', async (url: URL) => {
	const { data } = await axiosKPofficial.get<SearchResponse>(url.toString())
	console.log(data)
	return data as SearchResponse
})

const initialState: NoveltySliceState = {
	loading: false,
	items: [],
	totalItems: 0,
	totalPages: 1,
	page: 1,
}

export const noveltySlice = createSlice({
	name: 'novelty',
	initialState,
	reducers: {
		updateNovelty(state, action: PayloadAction<Doc[]>) {
			state.items = [...state.items, ...action.payload]
		},
		clearNovelty(state) {
			state.loading = false
			state.items = []
			state.totalItems = 0
			state.totalPages = 1
			state.page = 1
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchNovelty.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchNovelty.fulfilled, (state, action: PayloadAction<SearchResponse>) => {
			state.loading = false
			state.items = [...state.items, ...action.payload.docs]
			state.totalItems = action.payload.total
			state.totalPages = action.payload.pages
			state.page += 1
		})
		builder.addCase(fetchNovelty.rejected, state => {
			state.loading = false
		})
	},
})

export const { updateNovelty, clearNovelty } = noveltySlice.actions

export const noveltySelector = (state: RootState) => state.novelty

export default noveltySlice.reducer
