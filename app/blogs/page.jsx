'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { fetchBlogsDetails } from '@/store/slice/blogsSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import BlogPostV5 from '@/components/blogpage/BlogPostV5'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import HeroBanner from '@/components/aboutpage/HeroBanner'

// export const metadata = {
//   title: 'Blogs',
// }

const BlogPage = () => {
  const blogsDetails = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogsDetails({ slug: 'blogs' }))
  }, [dispatch])

  return (
    <LayoutOne>
      <HeroBanner banner={blogsDetails.page_content.banner} />
      <PageHero
        title={blogsDetails?.page_content?.section_content?.title_one ?? ''}
        italicTitle={blogsDetails?.page_content?.section_content?.title_two ?? ''}
        description={blogsDetails?.page_content?.section_content?.content ?? ''}
      />
      <BlogPostV5 />
      <CTA
        title={blogsDetails.page_content.enquiry_data.title}
        subtitle={blogsDetails.page_content.enquiry_data.subtitle}
        button={blogsDetails.page_content.enquiry_data.button}
        buttonUrl={blogsDetails.page_content.enquiry_data.button_url}
      />
    </LayoutOne>
  )
}

export default BlogPage
