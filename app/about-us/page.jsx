import { service } from '@/store/api_services/api_service'
import AboutPageClient from './AboutPageClient'

// Server-side SEO
export async function generateMetadata() {
  const res = await service.fetchPageDetailsApi({ slug: 'about-us' })
  const data = res.data
  return {
    title: data?.seo_title || 'About Us - SmartTask Studios',
    description: data?.seo_description || '',
    openGraph: {
      images: [data?.seo_og_image || ''],
      title: data?.seo_og_title || '',
      description: data?.seo_og_description || '',
    },
  }
}

// Server component fetches data and passes to client
export default async function AboutPage() {
  return <AboutPageClient />
}
