import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { TopResponse } from '../../Interfaces/KPunofficial/top'
import axiosKPunofficial from '../../axios/KPunofficial'

interface BackgroundSliseState {
	loading: boolean
	row1: string[]
	row2: string[]
	row3: string[]
}

export interface FetchResponse {
	data: TopResponse
	page: number
}

export const fetchBackground = createAsyncThunk('background/fetchBackground', async (page: number) => {
	const { data } = await axiosKPunofficial.get<TopResponse>('/v2.2/films/top', {
		params: {
			type: 'TOP_100_POPULAR_FILMS',
			page,
		},
	})
	return { data, page } as FetchResponse
})

const initialState: BackgroundSliseState = {
	loading: false,
	row1: [],
	row2: [],
	row3: [],
}

export const backgroundSlise = createSlice({
	name: 'background',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchBackground.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchBackground.fulfilled, (state, action: PayloadAction<FetchResponse>) => {
			const images: string[] = []
			action.payload.data.films.forEach(el => images.push(el.posterUrlPreview))

			state.row1 = [...images.slice(0, 5), ...images.slice(0, 5)]
			state.row2 = [...images.slice(6, 11), ...images.slice(6, 11)]
			state.row3 = [...images.slice(12, 17), ...images.slice(12, 17)]
			state.loading = false
		})
		builder.addCase(fetchBackground.rejected, state => {
			state.loading = false
		})
	},
})

export const {} = backgroundSlise.actions

export const backgroundSelector = (state: RootState) => state.background

export default backgroundSlise.reducer
