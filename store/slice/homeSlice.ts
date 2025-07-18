// src/store/slice/homeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface PageContent {
  banner: {
    title_one: string
    title_two: string
    title_three: string
    title_four: string
    content_one: string
    content_two: string
    title_images: string[]
    slider_images: string[]
  }
  our_work: {
    title: string
    subtitle: string
    work_images: string[]
  }
  services: {
    title: string
    subtitle: string
    button: string
    button_url: string
    services: {
      service_id: number
      title: string
      slug: string
      short_desc: string
      features: string[]
      list_image: string
    }[]
  }
  testimonials: {
    title: string
    subtitle: string
    testimonials: any[]
  }
  process_data: {
    title: string
    subtitle: string
    feature_image: string
    process_data: {
      title: string
      content: string
    }[]
  }
  enquiry_data: {
    title_one: string
    title_two: string
    title_three: string
    button: string
    button_url: string
    title_images: string[]
    form_interests: string[]
    form_budgets: string[]
  }
}

export interface PageDetailsState {
  page_title: string
  page_slug: string
  page_content: PageContent
  status: boolean
  error: string | null
}

const initialState: PageDetailsState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: {
      title_one: '',
      title_two: '',
      title_three: '',
      title_four: '',
      content_one: '',
      content_two: '',
      title_images: [],
      slider_images: [],
    },
    our_work: {
      title: '',
      subtitle: '',
      work_images: [],
    },
    services: {
      title: '',
      subtitle: '',
      button: '',
      button_url: '',
      services: [],
    },
    testimonials: {
      title: '',
      subtitle: '',
      testimonials: [],
    },
    process_data: {
      title: '',
      subtitle: '',
      feature_image: '',
      process_data: [],
    },
    enquiry_data: {
      title_one: '',
      title_two: '',
      title_three: '',
      button: '',
      button_url: '',
      title_images: [],
      form_interests: [],
      form_budgets: [],
    },
  },
  status: false,
  error: null,
}

const homeSlice = createSlice({
  name: 'pageDetails',
  initialState,
  reducers: {
    setPageDetails(state, action: PayloadAction<PageDetailsState>) {
      console.log('-------------------->', action.payload)
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
    },
    setPageDetailsLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setPageDetailsError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setPageDetails, setPageDetailsLoading, setPageDetailsError } = homeSlice.actions

export default homeSlice.reducer

// Thunk
export const fetchPageDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setPageDetailsLoading(true))
    try {
      const response = await service.fetchPageDetailsApi(slug)
      if (response) {
        dispatch(setPageDetails(response.data.data))
      }
    } catch (error: any) {
      dispatch(setPageDetailsError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setPageDetailsLoading(false))
    }
  }
}
