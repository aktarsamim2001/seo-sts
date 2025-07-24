'use client'

import BlogContent from '@/components/blogpage/BlogContent'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogsDetails, fetchBlogsDetailsData } from '../../../store/slice/blogsSlice'
import { useParams } from 'next/navigation'
import { fetchBlogList } from '../../../store/slice/blogListSlice'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  const blogsDetails = useSelector((state) => state?.blogs)
  const blogData = blogsDetails?.blogsDetailsData
  const blogList = useSelector((state) => state.blogList.blogListData)

  console.log('Blog Details:', blogList?.data)

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogsDetailsData(slug))
      dispatch(fetchBlogsDetails({ slug: 'blogs' }))
      dispatch(fetchBlogList({ page_no: 1 }))
    }
  }, [dispatch, slug])

  const postBlog = {
    title: blogData?.title,
    description: blogData?.short_desc,
  }

  return (
    <LayoutOne>
      <PageHero
        badgeTitle="Blog Details"
        title={postBlog.title}
        description={postBlog.description}
        spacing="pt-32 md:pt-44 lg:pt-[200px] pb-10 md:pb-16 lg:pb-[88px] xl:pb-[100px] relative overflow-hidden"
      />
      <BlogContent blog_content={blogData?.table_contents} blogList={blogList?.data} image={blogData?.feature_image} />
      {blogsDetails?.page_content?.enquiry_data && (
        <CTA
          title={blogsDetails?.page_content?.enquiry_data?.title}
          subtitle={blogsDetails?.page_content?.enquiry_data?.subtitle}
          button={blogsDetails?.page_content?.enquiry_data?.button}
          buttonUrl={blogsDetails?.page_content?.enquiry_data?.button_url || '#'}
        />
      )}
    </LayoutOne>
  )
}

export default BlogDetails
