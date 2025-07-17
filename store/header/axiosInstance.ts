// src/store/header/axiosInstance.ts
import axios from 'axios'

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL

let token = ''
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token') || ''
}

const axiosInstance = axios.create({
  baseURL: rootUrl,
  headers: {
    'Content-Type': 'application/json',
    authorization: token ? `Bearer ${token}` : '',
  },
})

export default axiosInstance
