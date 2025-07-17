// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import menusReducer from '../store/slice/menuSlice'

export const store = configureStore({
  reducer: {
    menus: menusReducer,
    // Add other slices here...
  },
})

// Types for useDispatch & useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
