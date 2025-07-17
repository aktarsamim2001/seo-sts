// import axiosInstance from '../header/axiosInstance'
import axios from 'axios'

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL

export const fetchMenusApi = async () => {
  const url = `${rootUrl}/api/menus`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching menus:', error)
    return []
  }
}
