import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Actor, KeywordsActorResponse } from '../../Interfaces/KPofficial/keywords'
import axiosKPofficial from '../../axios/KPofficial'

interface SearchActorsSliceState {
	keyword: string
	loading: boolean
	actors: Actor[]
	totalItems: number
	totalPages: number
	page: number
}

interface FetchSearchActorsArguments {
	keyword: string
	page: number
}

export interface SetActorsStatePayload {
	keyword: string
	total: number
}

export const fetchSearchActors = createAsyncThunk(
	'searchActors/fetchActors',
	async ({ keyword, page }: FetchSearchActorsArguments) => {
		const query: URL = new URL('https://api.kinopoisk.dev/person')
		query.searchParams.append('field', 'name')
		query.searchParams.append('search', keyword)
		query.searchParams.append('limit', '100')
		query.searchParams.append('isStrict', 'false')
		query.searchParams.append('sortField', 'name')
		query.searchParams.append('sortType', '1')
		query.searchParams.append('page', `${page}`)

		const { data } = await axiosKPofficial.get<KeywordsActorResponse>(query.toString())
		return data as KeywordsActorResponse
	}
)

const initialState: SearchActorsSliceState = {
	keyword: '',
	loading: false,
	actors: [],
	totalItems: 0,
	totalPages: 1,
	page: 2,
}

export const searchActorsSlice = createSlice({
	name: 'searchActors',
	initialState,
	reducers: {
		updateActors(state, action: PayloadAction<Actor[]>) {
			state.actors = [...state.actors, ...action.payload]
		},
		clearActors(state) {
			state.actors = []
		},
		setActorsState(state, action: PayloadAction<SetActorsStatePayload>) {
			state.keyword = action.payload.keyword
			state.totalItems = action.payload.total
			state.totalPages = Math.ceil(action.payload.total / 100)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchSearchActors.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchSearchActors.fulfilled, (state, action) => {
			state.loading = false
			state.actors = [...state.actors, ...action.payload.docs]
			state.page += 1
		})
		builder.addCase(fetchSearchActors.rejected, state => {
			state.loading = true
		})
	},
})

export const { updateActors, clearActors, setActorsState } = searchActorsSlice.actions

export const searchActorsSelector = (state: RootState) => state.searchActors

export default searchActorsSlice.reducer
