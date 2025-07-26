// src/store/slice/portfolioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface PortfolioItem {
  tag_name: string
  title: string
  year: string
  feature_image: string
}

export interface PortfolioData {
  current_page: number
  per_page: number
  total: number
  total_pages: number
  data: PortfolioItem[]
}

export interface PortfolioState {
  status: number
  message: string
  data: PortfolioData
  loading: boolean
  error: string | null
}

const initialState: PortfolioState = {
  status: 0,
  message: '',
  data: {
    current_page: 1,
    per_page: 4,
    total: 0,
    total_pages: 1,
    data: [],
  },
  loading: false,
  error: null,
}

const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    setPortfolioDetails(state, action: PayloadAction<PortfolioState>) {
      state.status = action.payload.status
      state.message = action.payload.message
      state.data = action.payload.data
    },
    setPortfolioLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setPortfolioError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    resetPortfolio(state) {
      state.status = 0
      state.message = ''
      state.data = {
        current_page: 1,
        per_page: 4,
        total: 0,
        total_pages: 1,
        data: [],
      }
      state.loading = false
      state.error = null
    },
    updatePortfolioPage(state, action: PayloadAction<number>) {
      state.data.current_page = action.payload
    },
  },
})

export const { setPortfolioDetails, setPortfolioLoading, setPortfolioError, resetPortfolio, updatePortfolioPage } =
  portfolioSlice.actions

export default portfolioSlice.reducer

// Thunk
export const fetchPortfolioDetails = (page: number = 1, perPage: number = 4) => {
  return async (dispatch: any) => {
    dispatch(setPortfolioLoading(true))
    try {
      const response = await service.fetchPortfoliosApi({ page, per_page: perPage })
      dispatch(setPortfolioDetails(response.data))
    } catch (error: any) {
      dispatch(setPortfolioError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setPortfolioLoading(false))
    }
  }
}
