// src/store/slice/portfolioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface PortfolioContent {
  banner: {
    title_one: string
    title_two: string
    title_three: string
    button: string
    button_url: string
    content: string
    feature_image: string
  }
  enquiry_data: {
    title_one: string
    title_two: string
    button: string
    button_url: string
  }
  bottom_section: {
    title: string
    button: string
    button_url: string
  }
  page_seo?: {
    meta_title: string
    meta_author: string
    meta_description: string
    meta_keywords: string
    feature_image: string
  }
}

export interface PortfolioState {
  page_title: string
  page_slug: string
  page_content: PortfolioContent
  page_seo?: {
    meta_title: string
    meta_author: string
    meta_description: string
    meta_keywords: string
    feature_image: string
  }
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
      title_three: '',
      button: '',
      button_url: '',
      content: '',
      feature_image: '',
    },
    enquiry_data: {
      title_one: '',
      title_two: '',
      button: '',
      button_url: '',
    },
    bottom_section: {
      title: '',
      button: '',
      button_url: '',
    },
  },
  page_seo: {
    meta_title: '',
    meta_author: '',
    meta_description: '',
    meta_keywords: '',
    feature_image: '',
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
      state.page_seo = (action.payload as any).page_seo
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
      const response = await service.fetchPageDetailsApi({ slug })
      dispatch(setPortfolioDetails(response.data.data))
    } catch (error: any) {
      dispatch(setPortfolioError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setPortfolioLoading(false))
    }
  }
}
