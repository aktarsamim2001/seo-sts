// src/app/terms/page.jsx
import { service } from '@/store/api_services/api_service'
import TermsConditionsClient from './TermsConditionsClient'

// Server-side SEO
export async function generateMetadata() {
  const res = await service.fetchTermsConditionsDetails({ slug: 'terms-conditions' })
  const data = res.data
  const seo = data?.page_seo || {}
  return {
    title: seo?.meta_title || 'Terms & Conditions - Smart Task Studios',
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

export default function TermsConditionsPage() {
  return <TermsConditionsClient />
}
