import axios from 'axios'

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL

export const fetchMenusApi = async () => {
  return await axios.get(`${rootUrl}api/menus`)
}
