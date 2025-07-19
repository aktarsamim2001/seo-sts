// src/store/slice/servicesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface ServicesContent {
  banner: {
    title: string
    sub_title: string
    content: string
  }
  section_content: {
    title: string
    sub_title_one: string
    sub_title_two: string
    content: string
    services: {
      service_id: number
      title: string
      slug: string
      short_desc: string
      features: string[]
      list_image: string
    }[]
  }
  process: {
    title: string
    button: string
    button_url: string
    progrress_timeline: {
      title: string
      content: string
      color: string
    }[]
  }
  enquiry_data: {
    title_one: string
    title_two: string
    title_three: string
    button: string
    button_url: string
    title_images: string[]
  }
}

export interface ServicesState {
  page_title: string
  page_slug: string
  page_content: ServicesContent
  status: boolean
  error: string | null
}

const initialState: ServicesState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: {
      title: '',
      sub_title: '',
      content: '',
    },
    section_content: {
      title: '',
      sub_title_one: '',
      sub_title_two: '',
      content: '',
      services: [],
    },
    process: {
      title: '',
      button: '',
      button_url: '',
      progrress_timeline: [],
    },
    enquiry_data: {
      title_one: '',
      title_two: '',
      title_three: '',
      button: '',
      button_url: '',
      title_images: [],
    },
  },
  status: false,
  error: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServicesDetails(state, action: PayloadAction<ServicesState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
    },
    setServicesLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setServicesError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setServicesDetails, setServicesLoading, setServicesError } = servicesSlice.actions

export default servicesSlice.reducer

// Thunk
export const fetchServicesDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setServicesLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
      dispatch(setServicesDetails(response.data.data))
    } catch (error: any) {
      dispatch(setServicesError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setServicesLoading(false))
    }
  }
}
