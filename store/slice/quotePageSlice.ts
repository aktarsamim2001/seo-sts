import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

// TYPES
interface ServiceOption {
  service_id: number
  title: string
  slug: string
  short_desc: string
  features: string[]
  list_image: string
}

interface GetQuotePageContent {
  banner: {
    title: string
    sub_title: string
    content: string
  }
  form_options: {
    service_options: ServiceOption[]
    service_time_options: string[]
    budget_options: string[]
  }
}

export interface GetQuotePageState {
  page_title: string
  page_slug: string
  page_content: GetQuotePageContent
  page_seo?: {
    meta_title: string
    meta_author: string
    meta_description: string
    meta_keywords: string[]
    feature_image: string
  }
  status: boolean
  error: string | null
}

// INITIAL STATE
const initialState: GetQuotePageState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: {
      title: '',
      sub_title: '',
      content: '',
    },
    form_options: {
      service_options: [],
      service_time_options: [],
      budget_options: [],
    },
  },
  page_seo: {
    meta_title: '',
    meta_author: '',
    meta_description: '',
    meta_keywords: [],
    feature_image: '',
  },
  status: false,
  error: null,
}

// SLICE
const getQuoteSlice = createSlice({
  name: 'getQuotePage',
  initialState,
  reducers: {
    setGetQuotePage(state, action: PayloadAction<GetQuotePageState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
      state.page_seo = action.payload.page_seo
    },
    setGetQuotePageLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setGetQuotePageError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setGetQuotePage, setGetQuotePageLoading, setGetQuotePageError } = getQuoteSlice.actions

export default getQuoteSlice.reducer

// ✅ THUNK
export const fetchGetQuotePage = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setGetQuotePageLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
      if (response?.data?.data) {
        dispatch(setGetQuotePage(response.data.data))
      }
    } catch (error: any) {
      dispatch(setGetQuotePageError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setGetQuotePageLoading(false))
    }
  }
}
