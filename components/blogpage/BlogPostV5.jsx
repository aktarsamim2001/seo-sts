'use client'

import topArrowDark from '@/public/images/icons/top-arrow-dark.svg'
import topArrow from '@/public/images/icons/top-arrow.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import RevealWrapper from '../animation/RevealWrapper'
import Pagination from './Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogList } from '@/store/slice/blogListSlice'

const brandPink = '#F54BB4'

const BlogPostV5 = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const blogList = useSelector((state) => state.blogList.blogListData)
  const isLoading = useSelector((state) => state.blogList.loading)
  const error = useSelector((state) => state.blogList.error)
  const blogs = blogList?.data || []
  const totalPages = blogList?.total_pages || 1

  console.log(blogList)

  useEffect(() => {
    dispatch(fetchBlogList({ page_no: currentPage }))
  }, [dispatch, currentPage])

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const paginateFunction = {
    totalPages,
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
  }

  if (isLoading) return <div className="container py-10 text-center">Loading blogs...</div>
  if (error) return <div className="container py-10 text-center text-red-500">Error loading blogs: {error}</div>

  return (
    <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
      <div className="container">
        <RevealWrapper className="grid grid-cols-1 items-center justify-items-center gap-x-6 gap-y-[60px] md:grid-cols-2 md:items-start xl:grid-cols-3">
          {blogs.length === 0 ? (
            <div className="col-span-full py-10 text-center text-gray-500">No blogs found.</div>
          ) : (
            blogs.slice(0, 3).map((blog, idx) => (
              <div
                key={blog.slug ? blog.slug + '-' + idx : blog.title ? blog.title + '-' + idx : idx}
                className="underline-hover-effect group max-w-[370px]"
                style={{ borderColor: brandPink }}>
                <Link href={`/blogs/${blog.slug || 'default-slug'}`} className="block">
                  <figure className="h-[388px] overflow-hidden xl:min-w-[360px]">
                    <Image
                      width={360}
                      height={388}
                      src={blog.list_image || '/images/placeholder.png'}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:rotate-3 group-hover:scale-125"
                      alt={blog.title || 'Blog Images'}
                    />
                  </figure>
                </Link>
                <p className="font-poppins mb-5 mt-[30px] text-sm font-normal uppercase leading-[1.1] tracking-[1.12px]">
                  {blog.posted_on}
                </p>
                <Link href={`/blogs/${blog.slug || 'default-slug'}`}>
                  <div className="blog-title mb-9">
                    <h3 className="text[25px] md:text-3xl lg:text-4xl lg:leading-[1.2] lg:tracking-[-0.72px]">
                      {blog.title}
                    </h3>
                  </div>
                </Link>
                <Link
                  href={`/blogs/${blog.slug || 'default-slug'}`}
                  className="rv-button rv-button-primary2 block w-full md:inline-block md:w-auto">
                  <div className="rv-button-top flex items-center text-center">
                    <span className="pr-2">{blog.read_time || '3 minute read'}</span>
                    <Image className="hidden dark:inline" src={topArrowDark} alt="Arrow Icon" />
                    <Image className="inline dark:hidden" src={topArrow} alt="Arrow Icon" />
                  </div>
                  <div className="rv-button-bottom flex items-center text-center">
                    <span className="pr-2">{blog.read_time || '3 minute read'}</span>
                    <Image className="inline" src={topArrow} alt="Arrow Icon" />
                  </div>
                </Link>
              </div>
            ))
          )}
        </RevealWrapper>

        <article className="mt-12 md:mt-[70px] [&>*:not(last-child)]:mb-10">
          {blogs?.slice(3, 7)?.map((blog, idx) => (
            <RevealWrapper
              key={blog.slug ? blog.slug + '-' + idx : blog.title ? blog.title + '-' + idx : idx}
              className="underline-hover-effect group flex flex-col-reverse items-center justify-center gap-x-6 gap-y-10 border dark:border-dark md:justify-normal lg:flex-row lg:p-10"
              style={{ borderColor: brandPink }}>
              <div className="flex-1 max-lg:self-center max-lg:px-7 max-lg:pb-7">
                <p className="font-poppins text-sm font-normal uppercase leading-[1.1] tracking-[1.12px]">
                  {blog.posted_on}
                </p>
                <Link href={`/blogs/${blog.slug || 'default-slug'}`}>
                  <div className="blog-title mb-6 mt-5 lg:mb-10">
                    <h3 className="text[27px] md:text-4xl md:leading-[1.2] md:tracking-[-0.72px]">{blog.title}</h3>
                  </div>
                </Link>
                <Link href={`/blogs/${blog.slug || 'default-slug'}`} className="rv-button rv-button-primary2">
                  <div className="rv-button-top flex items-center text-center">
                    <span className="pr-2">{blog.read_time || '3 minute read'}</span>
                    <Image className="inline dark:hidden" src={topArrow} alt="Arrow Icon" />
                    <Image className="hidden dark:inline" src={topArrowDark} alt="Arrow Icon" />
                  </div>
                  <div className="rv-button-bottom flex items-center text-center">
                    <span className="pr-2">{blog.read_time || '3 minute read'}</span>
                    <Image className="inline" src={topArrow} alt="Arrow Icon" />
                  </div>
                </Link>
              </div>
              <Link href={`/blogs/${blog.slug || 'default-slug'}`} className="max-lg:w-full">
                <figure className="h-96 w-full overflow-hidden lg:h-[190px] lg:w-[464px] lg:flex-1">
                  <Image
                    src={blog.list_image || '/images/placeholder.png'}
                    width={464}
                    height={190}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:rotate-3 group-hover:scale-125"
                    alt={blog.title || 'Blog Images'}
                  />
                </figure>
              </Link>
            </RevealWrapper>
          ))}
        </article>

        {totalPages > 1 && <Pagination paginateFunction={paginateFunction} />}
      </div>
    </section>
  )
}

export default BlogPostV5
