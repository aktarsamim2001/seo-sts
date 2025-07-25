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

async function fetchBlogsApi(payload: any) {
  const token = getToken()
  return axios.post(rootUrl + 'api/cms/blogs', payload, {
    headers: await authHeader(token),
  })
}

async function fetchBlogsDetails(payload: any) {
  const token = getToken()
  return axios.post(rootUrl + 'api/cms/blog/details', payload, {
    headers: await authHeader(token),
  })
}

async function fetchServiceDetailsApi(payload: any) {
  const token = getToken()
  return axios.post(rootUrl + 'api/cms/service-details', payload, {
    headers: await authHeader(token),
  })
}

async function fetchGetAQuoteApi(payload: any) {
  const token = getToken()
  return axios.post(rootUrl + 'api/enquiry/get-a-quote', payload, {
    headers: await authHeader(token),
  })
}

async function fetchContactEnquiryApi(payload: any) {
  const token = getToken()
  return axios.post(rootUrl + 'api/enquiry/contact-enquiry', payload, {
    headers: await authHeader(token),
  })
}

async function fetchPortfoliosApi(payload: any) {
  const token = getToken()
  return axios.post(rootUrl + 'api/cms/portfolios', payload, {
    headers: await authHeader(token),
  })
}

async function fetchPortfolioListApi(params: { page: number; per_page: number }) {
  const token = getToken()
  return axios.post(rootUrl + 'api/cms/portfolios', params, {
    headers: await authHeader(token),
  })
}
export const service = {
  fetchMenusApi,
  fetchPageDetailsApi,
  fetchBlogsApi,
  fetchBlogsDetails,
  fetchServiceDetailsApi,
  fetchGetAQuoteApi,
  submitEnquiryApi: fetchGetAQuoteApi,
  fetchContactEnquiryApi,
  fetchPortfoliosApi,
}
