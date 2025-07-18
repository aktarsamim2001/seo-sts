// src/store/slice/blogListSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface Blog {
  title: string
  slug: string
  posted_on: string
  list_image: string
  read_time: string
}

export interface BlogState {
  data: {
    current_page: number
    per_page: number
    total: number
    total_pages: number
    blogs: Blog[]
  }
  status: boolean
  error: string | null
}

const initialState: BlogState = {
  data: {
    current_page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    blogs: [],
  },
  status: false,
  error: null,
}

const blogListSlice = createSlice({
  name: 'blogList',
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<BlogState['data']>) {
      state.data = action.payload
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

export const { setBlogs, setBlogsLoading, setBlogsError } = blogListSlice.actions

export default blogListSlice.reducer

// Thunk
export const fetchBlogs = (pageNo: number) => {
  return async (dispatch: any) => {
    dispatch(setBlogsLoading(true))
    try {
      const response = await service.fetchBlogsApi(pageNo)
      console.log('Fetched blogs:', response) // Debugging line to check fetched blogs
      dispatch(setBlogs(response.data.data))
    } catch (error: any) {
      dispatch(setBlogsError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setBlogsLoading(false))
    }
  }
}
