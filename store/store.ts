// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import menusReducer from '../store/slice/menuSlice'
import pageDetailsReducer from '../store/slice/homeSlice'
import aboutUsReducer from '../store/slice/aboutUsSlice'
import portfolioReducer from '../store/slice/portfolioSlice'
import servicesReducer from '../store/slice/servicesSlice'
import blogsReducer from '../store/slice/blogsSlice'
import privacyPolicyReducer from '../store/slice/privacyPolicySlice'
import blogListReducer from '../store/slice/blogListSlice'
import serviceDetailsReducer from '../store/slice/serviceDetailsSlice'
import termsConditionsReducer from '../store/slice/termsConditionsSlice'
import contactPageReducer from '../store/slice/contactSlice'
import getQuotePageReducer from '../store/slice/quotePageSlice'
import enquiryReducer from '../store/slice/enquirySlice'
import portfoliosListReducer from '../store/slice/portfoliosListSlice'
import portfoliosReducer from '../store/slice/portfoliosListSlice'

export const store = configureStore({
  reducer: {
    menus: menusReducer,
    pageDetails: pageDetailsReducer,
    aboutUs: aboutUsReducer,
    portfolio: portfolioReducer,
    services: servicesReducer,
    blogs: blogsReducer,
    blogList: blogListReducer,
    serviceDetails: serviceDetailsReducer,
    privacyPolicy: privacyPolicyReducer,
    termsConditions: termsConditionsReducer,
    contactPage: contactPageReducer,
    getQuotePage: getQuotePageReducer,
    enquiry: enquiryReducer,
    portfoliosList: portfoliosListReducer,
    portfolios: portfoliosReducer,
  },
})

// Types for useDispatch & useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
