// src/store/slice/privacyPolicySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface PrivacyPolicyContent {
  title: string
  sub_title_one: string
  sub_title_two: string
  page_content: string
}

export interface PrivacyPolicyState {
  page_title: string
  page_slug: string
  page_content: PrivacyPolicyContent
  status: boolean
  error: string | null
}

const initialState: PrivacyPolicyState = {
  page_title: '',
  page_slug: '',
  page_content: {
    title: '',
    sub_title_one: '',
    sub_title_two: '',
    page_content: '',
  },
  status: false,
  error: null,
}

const privacyPolicySlice = createSlice({
  name: 'privacyPolicy',
  initialState,
  reducers: {
    setPrivacyPolicyDetails(state, action: PayloadAction<PrivacyPolicyState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
    },
    setPrivacyPolicyLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setPrivacyPolicyError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setPrivacyPolicyDetails, setPrivacyPolicyLoading, setPrivacyPolicyError } = privacyPolicySlice.actions

export default privacyPolicySlice.reducer

// Thunk
export const fetchPrivacyPolicyDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setPrivacyPolicyLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
      console.log('API response2:', response)
      dispatch(setPrivacyPolicyDetails(response.data))
    } catch (error: any) {
      dispatch(setPrivacyPolicyError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setPrivacyPolicyLoading(false))
    }
  }
}
