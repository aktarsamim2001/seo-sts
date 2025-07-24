// src/store/slice/portfoliosListSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface PortfolioItem {
  tag_name: string
  title: string
  year: string
  feature_image: string
}

export interface PortfoliosListContent {
  current_page: number
  per_page: number
  total: number
  total_pages: number
  data: PortfolioItem[]
}

export interface PortfoliosListState {
  portfolios: PortfoliosListContent | null
  status: boolean
  error: string | null
}

const initialState: PortfoliosListState = {
  portfolios: null,
  status: false,
  error: null,
}

const portfoliosListSlice = createSlice({
  name: 'portfoliosList',
  initialState,
  reducers: {
    setPortfoliosList(state, action: PayloadAction<PortfoliosListContent>) {
      state.portfolios = action.payload
      state.status = false
      state.error = null
    },
    setPortfoliosListLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setPortfoliosListError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setPortfoliosList, setPortfoliosListLoading, setPortfoliosListError } = portfoliosListSlice.actions

export default portfoliosListSlice.reducer

// Thunk
export const fetchPortfoliosList = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setPortfoliosListLoading(true))
    try {
      const response = await service.fetchPortfoliosApi(payload)
      dispatch(setPortfoliosList(response.data.data))
    } catch (error: any) {
      dispatch(setPortfoliosListError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setPortfoliosListLoading(false))
    }
  }
}
