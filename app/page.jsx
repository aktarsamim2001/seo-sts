// src/app/page.tsx
import { service } from '@/store/api_services/api_service'
import PageClient from './PageClient'

// Server-side SEO
export async function generateMetadata() {
  const res = await service.fetchPageDetailsApi({ slug: 'home' })
  const data = res.data
  const seo = data?.data?.page_seo || {}
  return {
    title: seo?.meta_title || 'Smart Task Studios',
    description: seo?.meta_description || '',
    keywords: seo?.meta_keywords || '',
    authors: [{ name: seo?.meta_author || 'Smart Task Studios' }],
    openGraph: {
      images: [seo?.feature_image || ''],
      title: seo?.meta_title || '',
      description: seo?.meta_description || '',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.meta_title || '',
      description: seo?.meta_description || '',
      images: [seo?.feature_image || ''],
    },
  }
}

// Server component fetches data and passes to client
export default async function Page() {
  return <PageClient />
}
