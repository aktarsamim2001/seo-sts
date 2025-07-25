// src/store/slice/serviceDetailsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface Banner {
  title: string
  short_desc: string
  button: string
  redirection_url: string
}

export interface ContentData {
  title: string
  description: string
}

export interface TableContents {
  content_list: string[]
  content_data: ContentData[]
}

export interface WhyChooseUs {
  title: string
  description: string
  icon: string
}

export interface Faq {
  question: string
  answer: string
}

export interface SeoData {
  meta_title: string
  meta_author: string
  meta_description: string
  meta_keywords: string
  feature_image: string
}

export interface ServiceDetailsData {
  banner: Banner
  table_contents: TableContents
  why_choose_us: WhyChooseUs[]
  faqs: Faq[]
  seo_data: SeoData
}

export interface ServiceDetailsState {
  data: ServiceDetailsData
  status: boolean
  error: string | null
}

const initialState: ServiceDetailsState = {
  data: {
    banner: {
      title: '',
      short_desc: '',
      button: '',
      redirection_url: '',
    },
    table_contents: {
      content_list: [],
      content_data: [],
    },
    why_choose_us: [],
    faqs: [],
    seo_data: {
      meta_title: '',
      meta_author: '',
      meta_description: '',
      meta_keywords: '',
      feature_image: '',
    },
  },
  status: false,
  error: null,
}

const serviceDetailsSlice = createSlice({
  name: 'serviceDetails',
  initialState,
  reducers: {
    setServiceDetails(state, action: PayloadAction<ServiceDetailsData>) {
      state.data = action.payload
    },
    setServiceDetailsLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setServiceDetailsError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setServiceDetails, setServiceDetailsLoading, setServiceDetailsError } = serviceDetailsSlice.actions

export default serviceDetailsSlice.reducer

// Thunk
export const fetchServiceDetails = ({ slug }: { slug: string }) => {
  return async (dispatch: any) => {
    dispatch(setServiceDetailsLoading(true))
    try {
      const response = await service.fetchServiceDetailsApi({ slug })
      if (response) {
        dispatch(setServiceDetails(response.data.data))
      }
    } catch (error: any) {
      dispatch(setServiceDetailsError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setServiceDetailsLoading(false))
    }
  }
}
