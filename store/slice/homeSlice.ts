// src/store/slice/homeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface PageContent {
  banner: {
    title_one: string
    title_two: string
    title_three: string
    button_one?: string
    button_one_url?: string
    button_two?: string
    button_two_url?: string
    banner_image?: string
  }[]
  about?: {
    title_one: string
    title_two: string
    subtitle: string
    button: string
    button_url: string
    content: string
  }
  services?: {
    title_one?: string
    title_two?: string
    subtitle?: string
    button?: string
    button_url?: string
    services: {
      service_id: number
      title: string
      slug: string
      short_desc: string
      features: string[]
      list_image: string
    }[]
  }
  what_we_did?: {
    title_one: string
    title_two: string
    subtitle: string
    button: string
    button_url: string
    portfolio: {
      title: string
      subtitle: string
      feature_image: string
    }[]
  }
  how_we_work?: {
    title_one: string
    title_two: string
    subtitle: string
    button: string
    button_url: string
    feature_image: string
    work_timeline: {
      title: string
      content: string
      color: string
    }[]
  }
  testimonials?: {
    title: string
    subtitle: string
    testimonials: {
      name: string
      designation: string
      message: string
      posted_at: string
      avatar_url: string
      logo: string
    }[]
  }
  enquiry_data?: {
    title: string
    subtitle: string
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

export interface PageDetailsState {
  page_title: string
  page_slug: string
  page_content: PageContent
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

const initialState: PageDetailsState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: [],
    about: {
      title_one: '',
      title_two: '',
      subtitle: '',
      button: '',
      button_url: '',
      content: '',
    },
    services: {
      title_one: '',
      title_two: '',
      subtitle: '',
      button: '',
      button_url: '',
      services: [],
    },
    what_we_did: {
      title_one: '',
      title_two: '',
      subtitle: '',
      button: '',
      button_url: '',
      portfolio: [],
    },
    how_we_work: {
      title_one: '',
      title_two: '',
      subtitle: '',
      button: '',
      button_url: '',
      feature_image: '',
      work_timeline: [],
    },
    testimonials: {
      title: '',
      subtitle: '',
      testimonials: [],
    },
    enquiry_data: {
      title: '',
      subtitle: '',
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

const homeSlice = createSlice({
  name: 'pageDetails',
  initialState,
  reducers: {
    setPageDetails(state, action: PayloadAction<PageDetailsState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
      state.page_seo = (action.payload as any).page_seo
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
export const fetchPageDetails = ({ slug }: { slug: string }) => {
  return async (dispatch: any) => {
    dispatch(setPageDetailsLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
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
