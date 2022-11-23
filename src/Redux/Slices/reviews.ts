import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Item, ReviewsResponse } from '../../Interfaces/KPunofficial/reviews'
import axiosKPunofficial from '../../axios/KPunofficial'

interface ReviewsSliceState {
	loading: boolean
	reviews: Item[]
	totalItems: number
	totalPositive: number
	totalNeutral: number
	totalNegative: number
	totalPages: number
	page: number
}

interface FetchReviewsArguments {
	id: number
	page: number
	sort: string
}

export interface SetReviewsStatePayload {
	total: number
	totalPositive: number
	totalNeutral: number
	totalNegative: number
	totalPages: number
}

export const fetchReviews = createAsyncThunk(
	'rewiews/fetchReviews',
	async ({ id, page, sort }: FetchReviewsArguments) => {
		const { data } = await axiosKPunofficial.get<ReviewsResponse>(`/v2.2/films/${id}/reviews`, {
			params: { page, order: sort },
		})
		return data as ReviewsResponse
	}
)

const initialState: ReviewsSliceState = {
	loading: false,
	reviews: [],
	totalItems: 0,
	totalPositive: 0,
	totalNeutral: 0,
	totalNegative: 0,
	totalPages: 1,
	page: 1,
}

export const reviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		updateReviews(state, action: PayloadAction<Item[]>) {
			state.reviews = [...state.reviews, ...action.payload]
		},
		clearReviews(state) {
			state.reviews = []
		},
		setReviewsState(state, action: PayloadAction<SetReviewsStatePayload>) {
			state.totalItems = action.payload.total
			state.totalPositive = action.payload.totalPositive
			state.totalNeutral = action.payload.totalNeutral
			state.totalNegative = action.payload.totalNegative
			state.totalPages = action.payload.totalPages
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchReviews.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchReviews.fulfilled, (state, action) => {
			state.loading = false
			state.reviews = [...state.reviews, ...action.payload.items]
			state.page += 1
		})
		builder.addCase(fetchReviews.rejected, state => {
			state.loading = false
		})
	},
})

export const { updateReviews, clearReviews, setReviewsState } = reviewsSlice.actions

export const reviewsSelector = (state: RootState) => state.reviews

export default reviewsSlice.reducer
