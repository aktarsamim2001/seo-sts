import axios from 'axios'
import { authHeader } from '../_header/auth-header'
const rootUrl = process.env.NEXT_PUBLIC_BASE_URL

async function fetchMenusApi() {
  return axios.get(rootUrl + 'api/menus', {
    headers: await authHeader(),
  })
}

async function fetchPageDetailsApi(payload) {
  return await axios.post(rootUrl + 'api/cms/page-details', payload, {
    headers: await authHeader(),
  })
}

async function fetchBlogsApi(payload) {
  return axios.get(rootUrl + 'api/cms/blogs', payload, {
    headers: await authHeader(),
  })
}

export const service = { fetchMenusApi, fetchPageDetailsApi, fetchBlogsApi }
