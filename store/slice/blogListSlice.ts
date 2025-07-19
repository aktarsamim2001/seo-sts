// src/store/slice/blogListSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'
import { AppDispatch } from '../store'

const initialState = {
  blogListData: [],
  status: false,
  error: null,
}

const blogListSlice = createSlice({
  name: 'blogList',
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.blogListData = action.payload
    },
    setBlogsLoading(state, action) {
      state.status = action.payload
    },
    setBlogsError(state, action) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setBlogs, setBlogsLoading, setBlogsError } = blogListSlice.actions

export default blogListSlice.reducer

export const fetchBlogList = (payload: any) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await service.fetchBlogsApi(payload)
      if (response) {
        dispatch(setBlogs(response?.data?.data))
      }
    } catch (error) {
      console.error(error)
    }
  }
}
