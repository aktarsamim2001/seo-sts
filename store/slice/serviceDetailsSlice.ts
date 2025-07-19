// src/store/slice/serviceDetailsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface Banner {
  title: string
  short_desc: string
  button: string
  redirection_url: string
}

export interface TableContent {
  content_list: string[]
  content_data: {
    title: string
    description: string
  }[]
}

export interface WhyChooseUs {
  title: string
  sub_title_one: string
  sub_title_two: string
  button: string
  button_url: string
  section_content: string
  data: any[]
}

export interface Faqs {
  title_one: string
  title_two: string
  section_content: string
  data: any[]
}

export interface ServiceDetailsContent {
  banner: Banner
  table_contents: TableContent
  why_choose_us: WhyChooseUs
  faqs: Faqs
  // Add enquiry_data if needed for CTA
  // enquiry_data?: {
  //   title_one: string
  //   title_two: string
  //   title_three: string
  //   title_images: string[]
  // }
}

export interface ServiceDetailsState {
  page_title: string
  page_slug: string
  page_content: ServiceDetailsContent
  status: boolean
  error: string | null
}

const initialState: ServiceDetailsState = {
  page_title: '',
  page_slug: '',
  page_content: {
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
    why_choose_us: {
      title: '',
      sub_title_one: '',
      sub_title_two: '',
      button: '',
      button_url: '',
      section_content: '',
      data: [],
    },
    faqs: {
      title_one: '',
      title_two: '',
      section_content: '',
      data: [],
    },
  },
  status: false,
  error: null,
}

const serviceDetailsSlice = createSlice({
  name: 'serviceDetails',
  initialState,
  reducers: {
    setServiceDetails(state, action: PayloadAction<ServiceDetailsState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
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
export const fetchServiceDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setServiceDetailsLoading(true))
    try {
      const response = await service.fetchServiceDetailsApi({ slug }) // Remove { slug } since the API expects a string
      console.log('API response:', response)
      // Map API response to ServiceDetailsState
      const mappedData: ServiceDetailsState = {
        page_title: response.data.banner.title || 'Service Details', // Fallback if page_title isn't provided
        page_slug: slug, // Use the input slug
        page_content: response.data,
        status: false,
        error: null,
      }
      dispatch(setServiceDetails(mappedData))
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
      dispatch(setServiceDetailsError(errorMessage))
      throw error
    } finally {
      dispatch(setServiceDetailsLoading(false))
    }
  }
}
