// ...existing code...
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

export interface EnquiryPayload {
  name: string
  email: string
  company: string
  message: string
}

export interface EnquiryResponse {
  status: number
  message: string
  data?: {
    name: string
    email: string
  }
}

export interface EnquiryState {
  loading: boolean
  error: string | null
  response: EnquiryResponse | null
  thankYouMessage: string | null
}

const initialState: EnquiryState = {
  loading: false,
  error: null,
  response: null,
  thankYouMessage: null,
}

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    setEnquiryLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setEnquiryError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
      state.thankYouMessage = null
    },
    setEnquiryResponse(state, action: PayloadAction<EnquiryResponse>) {
      state.loading = false
      state.response = action.payload
      state.error = null
      state.thankYouMessage = 'Thank you for your enquiry! We will get back to you soon.'
    },
    resetEnquiry(state) {
      state.loading = false
      state.error = null
      state.response = null
      state.thankYouMessage = null
    },
  },
})

export const { setEnquiryLoading, setEnquiryError, setEnquiryResponse, resetEnquiry } = enquirySlice.actions

export default enquirySlice.reducer

// Thunk for submitting enquiry
export const submitEnquiry = (payload: EnquiryPayload) => {
  return async (dispatch: any) => {
    dispatch(setEnquiryLoading(true))
    try {
      // Use fetchContactEnquiryApi for contact form
      const response = await service.fetchContactEnquiryApi(payload)
      dispatch(setEnquiryResponse(response.data))
    } catch (error: any) {
      dispatch(setEnquiryError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setEnquiryLoading(false))
    }
  }
}
