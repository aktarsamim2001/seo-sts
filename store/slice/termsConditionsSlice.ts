// src/store/slice/termsConditionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface TermsConditionsContent {
  title: string
  sub_title_one: string
  sub_title_two: string
  page_content: string
}

export interface TermsConditionsState {
  page_title: string
  page_slug: string
  page_content: TermsConditionsContent
  status: boolean
  error: string | null
}

const initialState: TermsConditionsState = {
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

const termsConditionsSlice = createSlice({
  name: 'termsConditions',
  initialState,
  reducers: {
    setTermsConditionsDetails(state, action: PayloadAction<TermsConditionsState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
    },
    setTermsConditionsLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setTermsConditionsError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setTermsConditionsDetails, setTermsConditionsLoading, setTermsConditionsError } =
  termsConditionsSlice.actions

export default termsConditionsSlice.reducer

// Thunk
export const fetchTermsConditionsDetails = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setTermsConditionsLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
      console.log('Response from API:', response)
      dispatch(setTermsConditionsDetails(response.data.data))
    } catch (error: any) {
      dispatch(setTermsConditionsError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setTermsConditionsLoading(false))
    }
  }
}
