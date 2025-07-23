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

// export const metadata = {
//   title: 'Blogs',
// }

const BlogPage = () => {
  const blogsDetails = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogsDetails({ slug: 'blogs' }))
  }, [dispatch])

  // if (blogsDetails.status) {
  //   return <p>Loading...</p>
  // }

  // if (blogsDetails.error) {
  //   return <p>Error: {blogsDetails.error}</p>
  // }

  return (
    <LayoutOne>
      <PageHero
        badgeTitle={blogsDetails?.page_content?.banner?.title || 'N/A'}
        title={blogsDetails?.page_content?.banner?.sub_title}
        description={blogsDetails?.page_content?.banner?.content}
      />
      <BlogPostV5 />
      <CTA enquiryData={blogsDetails?.page_content?.enquiry_data}>
        {blogsDetails?.page_content?.enquiry_data?.title_one}
        <CtaImageSlider
          slides={blogsDetails?.page_content?.enquiry_data?.title_images?.map((img, index) => ({
            id: String(index + 1),
            img: img,
          }))}
        />
        {blogsDetails?.page_content?.enquiry_data?.title_two}
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          {blogsDetails?.page_content?.enquiry_data?.title_three}
        </i>
      </CTA>
    </LayoutOne>
  )
}

export default BlogPage
