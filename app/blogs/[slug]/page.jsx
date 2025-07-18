'use client'

import BlogContent from '@/components/blogpage/BlogContent'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'

const BlogDetails = ({ params }) => {
  // Dummy data for local development
  const postBlog = {
    title: 'How to Build a Blog with Next.js',
    description: 'A step-by-step guide to building a modern blog using Next.js and React.',
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
      <BlogContent blog={blog} />
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
