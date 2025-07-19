// src/store/slice/aboutUsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface AboutUsContent {
  banner: {
    title: string
    sub_title_one: string
    sub_title_two: string
    content: string
    feature_image: string
  }
  section_content: {
    content_one: string
    content_two: string
    feature_image: string
  }
  teams: any[]
  clients: string[]
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
  enquiry_data: {
    title_one: string
    title_two: string
    title_three: string
    button: string
    button_url: string
    title_images: string[]
  }
}

export interface AboutUsState {
  page_title: string
  page_slug: string
  page_content: AboutUsContent
  status: boolean
  error: string | null
}

const initialState: AboutUsState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: {
      title: '',
      sub_title_one: '',
      sub_title_two: '',
      content: '',
      feature_image: '',
    },
    section_content: {
      content_one: '',
      content_two: '',
      feature_image: '',
    },
    teams: [],
    clients: [],
    services: {
      title: '',
      subtitle: '',
      button: '',
      button_url: '',
      services: [],
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

const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    setAboutUsDetails(state, action: PayloadAction<AboutUsState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
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
