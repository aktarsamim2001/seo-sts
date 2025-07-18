// src/store/slice/blogsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface BlogsContent {
  banner: {
    title: string
    sub_title: string
    content: string
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

export interface BlogsState {
  page_title: string
  page_slug: string
  page_content: BlogsContent
  status: boolean
  error: string | null
}

const initialState: BlogsState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: {
      title: '',
      sub_title: '',
      content: '',
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

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogsDetails(state, action: PayloadAction<BlogsState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
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

export const { setBlogsDetails, setBlogsLoading, setBlogsError } = blogsSlice.actions

export default blogsSlice.reducer

// Thunk
export const fetchBlogsDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setBlogsLoading(true))
    try {
      const response = await service.fetchPageDetailsApi(slug)
      dispatch(setBlogsDetails(response.data.data))
    } catch (error: any) {
      dispatch(setBlogsError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setBlogsLoading(false))
    }
  }
}
