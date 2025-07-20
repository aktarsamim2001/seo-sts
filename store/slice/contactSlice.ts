// src/redux/features/contactSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'

interface MovingText {
  title: string
  color: string
}

interface ContactPageContent {
  banner: {
    title: string
    sub_title_one: string
    sub_title_two: string
    content: string
  }
  contact_data: {
    moving_texts: MovingText[]
    address: string
    support_email: string
    support_number: string
  }
  enquiry_data: {
    title: string
    subtitle: string
    content: string
  }
}

export interface ContactPageState {
  page_title: string
  page_slug: string
  page_content: ContactPageContent
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

const initialState: ContactPageState = {
  page_title: '',
  page_slug: '',
  page_content: {
    banner: {
      title: '',
      sub_title_one: '',
      sub_title_two: '',
      content: '',
    },
    contact_data: {
      moving_texts: [],
      address: '',
      support_email: '',
      support_number: '',
    },
    enquiry_data: {
      title: '',
      subtitle: '',
      content: '',
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

const contactSlice = createSlice({
  name: 'contactPage',
  initialState,
  reducers: {
    setContactPage(state, action: PayloadAction<ContactPageState>) {
      state.page_title = action.payload.page_title
      state.page_slug = action.payload.page_slug
      state.page_content = action.payload.page_content
      state.page_seo = action.payload.page_seo
    },
    setContactPageLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setContactPageError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setContactPage, setContactPageLoading, setContactPageError } = contactSlice.actions

export default contactSlice.reducer

// Thunk
export const fetchContactPage = (slug: string) => {
  return async (dispatch: any) => {
    dispatch(setContactPageLoading(true))
    try {
      const response = await service.fetchPageDetailsApi({ slug })
      if (response?.data?.data) {
        dispatch(setContactPage(response.data.data))
      }
    } catch (error: any) {
      dispatch(setContactPageError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setContactPageLoading(false))
    }
  }
}
