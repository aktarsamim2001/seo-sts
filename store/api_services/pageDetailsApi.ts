// src/store/api_services/pageDetailsApi.ts
import axiosInstance from '../header/axiosInstance'

export const fetchPageDetailsApi = async (slug: string) => {
  const url = `/api/cms/page-details`
  try {
    const response = await axiosInstance.post(url, { slug })
    return response.data.data
  } catch (error: any) {
    console.error('Error fetching page details:', error)
    throw new Error(error.message || 'Something went wrong')
  }
}
