// src/store/slice/privacyPolicySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface PrivacyPolicyState {
  page_content: {
    page_content: unknown
  } | null
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

const initialState: PrivacyPolicyState = {
  page_content: {
    page_content: null,
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

const privacyPolicySlice = createSlice({
  name: 'privacyPolicy',
  initialState,
  reducers: {
    setPrivacyPolicyDetails(state, action: PayloadAction<{ page_content: unknown } | null>) {
      state.page_content = action.payload
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

export const fetchPrivacyPolicyDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setPrivacyPolicyLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
      if (response) {
        dispatch(setPrivacyPolicyDetails(response.data.data))
      }
    } catch (error: any) {
      dispatch(setPrivacyPolicyError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setPrivacyPolicyLoading(false))
    }
  }
}
