// src/store/slice/portfolioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface PortfolioContent {
  banner: {
    title_one: string
    title_two: string
    content: string
  }
  portfolio: {
    title: string
    feature_image: string
  }[]
  enquiry_data: {
    title_one: string
    title_two: string
    button_url: string
  }
}

export interface PortfolioState {
  page_title: string
  page_slug: string
  page_content: PortfolioContent
  status: boolean
  error: string | null
}

const initialState: PortfolioState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: {
      title_one: '',
      title_two: '',
      content: '',
    },
    portfolio: [],
    enquiry_data: {
      title_one: '',
      title_two: '',
      button_url: '',
    },
  },
  status: false,
  error: null,
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolioDetails(state, action: PayloadAction<PortfolioState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
    },
    setPortfolioLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setPortfolioError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setPortfolioDetails, setPortfolioLoading, setPortfolioError } = portfolioSlice.actions

export default portfolioSlice.reducer

// Thunk
export const fetchPortfolioDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setPortfolioLoading(true))
    try {
      const response = await service.fetchPageDetailsApi(slug)
      dispatch(setPortfolioDetails(response.data.data))
    } catch (error: any) {
      dispatch(setPortfolioError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setPortfolioLoading(false))
    }
  }
}
