import { service } from '@/store/api_services/api_service'
import PrivacyPolicyClient from './PrivacyPolicyClient'

// Server-side SEO
export async function generateMetadata() {
  const res = await service.fetchPrivacyPolicyDetails({ slug: 'privacy-policy' })
  const data = res.data
  const seo = data?.page_seo || {}
  return {
    title: seo?.meta_title || 'Privacy Policy - Smart Task Studios',
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

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
