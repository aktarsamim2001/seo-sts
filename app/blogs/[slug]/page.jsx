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
  const slug = params?.slug
  const blogsDetails = useSelector((state) => state.blogs)
  const blogData = blogsDetails.blogsDetailsData
  const blogDataTable = blogsDetails?.setBlogsDetailsData?.table_contents
  const blogList = useSelector((state) => state.blogList.blogListData)

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

  const blog = {
    content: '### Introduction\nThis is a dummy blog post.\n### Details\nHere are some details about the blog.',
    data: {
      thumbnail: '/images/dummy-blog.jpg',
    },
  }

  return (
    <LayoutOne>
      <PageHero
        badgeTitle="Blog Details"
        title={postBlog.title}
        description={postBlog.description}
        spacing="pt-32 md:pt-44 lg:pt-[200px] pb-10 md:pb-16 lg:pb-[88px] xl:pb-[100px] relative overflow-hidden"
      />
      <BlogContent blog={blogData} blogList={blogList?.data} />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: '1', img: '/images/agent/01.jpg' },
            { id: '3', img: '/images/agent/03.jpg' },
            { id: '2', img: '/images/agent/11.png' },
          ]}
        />
        with us.
        <i className="block font-instrument italic max-md:inline-block max-sm:pl-2 sm:mt-10">A virtual coffee?</i>
      </CTA>
    </LayoutOne>
  )
}

export default BlogDetails
