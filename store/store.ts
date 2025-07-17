// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import menusReducer from '../store/slice/menuSlice'
import pageDetailsReducer from '../store/slice/homeSlice'
import aboutUsReducer from '../store/slice/aboutUsSlice'
import portfolioReducer from '../store/slice/portfolioSlice'
import servicesReducer from '../store/slice/servicesSlice'
import blogsReducer from '../store/slice/blogsSlice'

export const store = configureStore({
  reducer: {
    menus: menusReducer,
    pageDetails: pageDetailsReducer,
    aboutUs: aboutUsReducer,
    portfolio: portfolioReducer,
    services: servicesReducer,
    blogs: blogsReducer,
  },
})

// Types for useDispatch & useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
