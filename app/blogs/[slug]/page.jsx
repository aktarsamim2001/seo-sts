// import { service } from '@/store/api_services/api_service'
import BlogDetailsClient from './BlogDetailsClient'

// Server-side SEO
// export async function generateMetadata({ params }) {
//   const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
//   const res = await service.fetchBlogsDetailsData(slug)
//   const data = res.data
//   console.log('Blog Details Data:', data)
//   const seo = data?.page_seo || {}
//   return {
//     title: seo?.meta_title || 'Blog Details - Smart Task Studios',
//     description: seo?.meta_description || '',
//     keywords: seo?.meta_keywords || '',
//     authors: [{ name: seo?.meta_author || 'Smart Task Studios' }],
//     openGraph: {
//       images: [seo?.feature_image || ''],
//       title: seo?.meta_title || '',
//       description: seo?.meta_description || '',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: seo?.meta_title || '',
//       description: seo?.meta_description || '',
//       images: [seo?.feature_image || ''],
//     },
//   }
// }

export default function BlogDetailsPage() {
  return <BlogDetailsClient />
}
