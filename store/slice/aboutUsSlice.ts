// src/store/slice/aboutUsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface AboutUsContent {
  banner: {
    title_one: string
    title_two: string
    title_three: string
    content: string
    feature_image: string
  }
  section_content: {
    title_one: string
    title_two: string
    subtitle: string
    content: string
  }
  services: {
    title: string
    subtitle: string
    button: string
    button_url: string
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
  our_mission?: {
    title: string
    button: string
    button_url: string
    content: string
    feature_image: string
  }
  work_with_us?: {
    title_one: string
    title_two: string
    content: string
    data: {
      title: string
      content: string
      feature_image: string
    }[]
  }
  clients: string[]
  testimonial?: {
    title_one: string
    title_two: string
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
  enquiry_data: {
    title: string
    subtitle: string
    button: string
    button_url: string
  }
}

export interface AboutUsState {
  page_title: string
  page_slug: string
  page_content: AboutUsContent
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

const initialState: AboutUsState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: {
      title_one: '',
      title_two: '',
      title_three: '',
      content: '',
      feature_image: '',
    },
    section_content: {
      title_one: '',
      title_two: '',
      subtitle: '',
      content: '',
    },
    services: {
      title: '',
      subtitle: '',
      button: '',
      button_url: '',
      content: '',
      services: [],
    },
    our_mission: {
      title: '',
      button: '',
      button_url: '',
      content: '',
      feature_image: '',
    },
    work_with_us: {
      title_one: '',
      title_two: '',
      content: '',
      data: [],
    },
    clients: [],
    testimonial: {
      title_one: '',
      title_two: '',
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

const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    setAboutUsDetails(state, action: PayloadAction<AboutUsState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
      state.page_seo = (action.payload as any).page_seo
    },
    setAboutUsLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setAboutUsError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setAboutUsDetails, setAboutUsLoading, setAboutUsError } = aboutUsSlice.actions

export default aboutUsSlice.reducer

import type { AppDispatch } from '../store'

// Thunk
export const fetchAboutUsDetails = (slug: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAboutUsLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
      dispatch(setAboutUsDetails(response.data.data))
    } catch (error: any) {
      dispatch(setAboutUsError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setAboutUsLoading(false))
    }
  }
}
