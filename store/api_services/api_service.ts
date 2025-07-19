import axios from 'axios'
import { authHeader } from '../_header/auth-header'
const rootUrl = process.env.NEXT_PUBLIC_BASE_URL

function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

async function fetchMenusApi() {
  const token = getToken()
  return axios.get(rootUrl + 'api/menus', {
    headers: await authHeader(token),
  })
}

async function fetchPageDetailsApi(payload: Record<string, any>) {
  const token = getToken()
  return axios.post(rootUrl + 'api/cms/page-details', payload, {
    headers: await authHeader(token),
  })
}

async function fetchBlogsApi(payload: Record<string, any>) {
  const token = getToken()
  return axios.post(rootUrl + 'api/cms/blogs', payload, {
    headers: await authHeader(token),
  })
}

async function fetchServiceDetailsApi(payload: Record<string, any>) {
  const token = getToken()
  return axios.post(rootUrl + 'api/cms/service-details', payload, {
    headers: await authHeader(token),
  })
}

export const service = {
  fetchMenusApi,
  fetchPageDetailsApi,
  fetchBlogsApi,
  fetchServiceDetailsApi,
}
