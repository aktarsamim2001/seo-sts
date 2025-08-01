// src/store/slice/blogsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface BlogsContent {
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
    title_three: string
    button: string
    button_url: string
    title_images: string[]
  }
  page_seo?: {
    meta_title: string
    meta_author: string
    meta_description: string
    meta_keywords: string[]
    feature_image: string
  }
}

export interface BlogsState {
  blogsDetailsData: unknown
  page_title: string
  page_slug: string
  page_content: BlogsContent
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

const initialState: BlogsState = {
  blogsDetailsData: null,
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
      title_three: '',
      button: '',
      button_url: '',
      title_images: [],
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

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogsDetailsData(state, action) {
      state.blogsDetailsData = action.payload
    },

    setBlogsDetails(state, action: PayloadAction<BlogsState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
      state.page_seo = (action.payload as any).page_seo
    },
    setBlogsLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setBlogsError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setBlogsDetails, setBlogsDetailsData, setBlogsLoading, setBlogsError } = blogsSlice.actions

export default blogsSlice.reducer

// Thunk
export const fetchBlogsDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setBlogsLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
      dispatch(setBlogsDetails(response.data.data))
    } catch (error: any) {
      dispatch(setBlogsError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setBlogsLoading(false))
    }
  }
}

export const fetchBlogsDetailsData = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setBlogsLoading(true))
    try {
      const response = await service.fetchBlogsDetails({ slug })
      if (response) {
        dispatch(setBlogsDetailsData(response.data.data))
      }
    } catch (error: any) {
      dispatch(setBlogsError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setBlogsLoading(false))
    }
  }
}
