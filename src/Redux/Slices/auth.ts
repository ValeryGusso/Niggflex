import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface authSliceState {
	isAuth: boolean
}

const initialState: authSliceState = {
	isAuth: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {},
})

export const {  } = authSlice.actions

export const authSelector = (state: RootState) => state.auth

export default authSlice.reducer
