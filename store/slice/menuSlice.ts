import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { service } from '../api_services/api_service'
import { AppDispatch } from '../store'

export interface SubMenu {
  menu_item_id: number
  menu_item_title: string
  menu_item_slug: string
  menu_type: string
  sub_menues?: SubMenu[]
}

export interface MenuItem extends SubMenu {}

export interface Menu {
  menu_id: number
  menu_name: string
  menu_items: MenuItem[]
}

interface MenusState {
  data: Menu[]
  status: boolean
  error: string | null
}

const initialState: MenusState = {
  data: [],
  status: false,
  error: null,
}

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    setMenus(state, action: PayloadAction<Menu[]>) {
      state.data = action.payload
    },
    setMenusLoading(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    setMenusError(state, action: PayloadAction<string>) {
      state.status = false
      state.error = action.payload
    },
  },
})

export const { setMenus, setMenusLoading, setMenusError } = menusSlice.actions

export default menusSlice.reducer

// Thunk
export const fetchMenus = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setMenusLoading(true))
    try {
      const response = await service.fetchMenusApi()
      if (response) {
        dispatch(setMenus(response.data.data))
      }
    } catch (error: any) {
      dispatch(setMenusError(error.message || 'Something went wrong'))
    } finally {
      dispatch(setMenusLoading(false))
    }
  }
}
