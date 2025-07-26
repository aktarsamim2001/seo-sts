import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import RevealWrapper from '../animation/RevealWrapper'
import BlogList from '../shared/BlogList'
import TableOfContent from '../shared/TableOfContent'
import rehypeRaw from 'rehype-raw'
import { slugify } from '@/utils/slugify'

const BlogContent = ({ blog_content, blogList, image }: any) => {
  const generateId = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

  const contentItems = blog_content?.content_data || []
  const tableOfContents = blog_content?.content_list || []

  return (
    <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
        <RevealWrapper as="figure" className="reveal-me w-full 2xl:max-h-[523px]">
          <Image
            src={image || '/images/default-blog-image.jpg'}
            width={1280}
            height={523}
            alt="Blog Details"
            className="w-full object-cover"
          />
        </RevealWrapper>
        <div className="mt-12 flex flex-col justify-start gap-10 pb-14 md:mt-[60px] md:pb-16 lg:flex-row lg:pb-[88px] xl:pb-[100px]">
          <aside className="min-w-[310px]">
            <div className="sticky top-24 max-md:mb-10">
              <TableOfContent tableOfContents={tableOfContents}>
                <h3 className="mb-7 mt-10 text-3xl md:text-4xl lg:mt-16 xl:mt-20">Share</h3>
                <ul className="flex items-center gap-5">
                  {/* Facebook */}
                  <li className="relative inline-block h-10 w-10 rounded-full border-2 border-secondary duration-300 hover:bg-primary dark:border-dark">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook">
                      <span className="absolute left-1/2 top-1/2 inline -translate-x-1/2 -translate-y-1/2 dark:hidden">
                        {/* Facebook SVG (light) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#000"
                          viewBox="0 0 256 256">
                          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                        </svg>
                      </span>
                      <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 dark:inline">
                        {/* Facebook SVG (dark) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          viewBox="0 0 256 256">
                          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                  {/* Twitter */}
                  <li className="relative inline-block h-10 w-10 rounded-full border-2 border-secondary duration-300 hover:bg-primary dark:border-dark">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent('')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter">
                      <span className="absolute left-1/2 top-1/2 inline -translate-x-1/2 -translate-y-1/2 dark:hidden">
                        {/* Twitter SVG (light) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#000"
                          viewBox="0 0 256 256">
                          <path d="M232,56a8,8,0,0,0-8,8v8.69A88.1,88.1,0,1,1,56.69,32H64a8,8,0,0,0,0-16H56A104,104,0,1,0,160,208a8,8,0,0,0,0-16h-8a8,8,0,0,0,0,16h8A88.1,88.1,0,1,1,232,56Z"></path>
                        </svg>
                      </span>
                      <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 dark:inline">
                        {/* Twitter SVG (dark) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          viewBox="0 0 256 256">
                          <path d="M232,56a8,8,0,0,0-8,8v8.69A88.1,88.1,0,1,1,56.69,32H64a8,8,0,0,0,0-16H56A104,104,0,1,0,160,208a8,8,0,0,0,0-16h-8a8,8,0,0,0,0,16h8A88.1,88.1,0,1,1,232,56Z"></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                  {/* LinkedIn */}
                  <li className="relative inline-block h-10 w-10 rounded-full border-2 border-secondary duration-300 hover:bg-primary dark:border-dark">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn">
                      <span className="absolute left-1/2 top-1/2 inline -translate-x-1/2 -translate-y-1/2 dark:hidden">
                        {/* LinkedIn SVG (light) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#000"
                          viewBox="0 0 256 256">
                          <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                        </svg>
                      </span>
                      <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 dark:inline">
                        {/* LinkedIn SVG (dark) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          viewBox="0 0 256 256">
                          <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                        </svg>
                      </span>
                    </a>
                  </li>
                  {/* Instagram (copy link) */}
                  <li className="relative inline-block h-10 w-10 rounded-full border-2 border-secondary duration-300 hover:bg-primary dark:border-dark">
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          navigator.clipboard.writeText(window.location.href)
                        }
                      }}
                      aria-label="Copy link for Instagram"
                      className="m-0 h-full w-full border-none bg-transparent p-0">
                      <span className="absolute left-1/2 top-1/2 inline -translate-x-1/2 -translate-y-1/2 dark:hidden">
                        {/* Instagram SVG (light) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#000000"
                          viewBox="0 0 256 256">
                          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                        </svg>
                      </span>
                      <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 dark:inline">
                        {/* Instagram SVG (dark) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#fff"
                          viewBox="0 0 256 256">
                          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                        </svg>
                      </span>
                    </button>
                  </li>
                </ul>
              </TableOfContent>
            </div>
          </aside>
          <article className="career-details-body mt-8 overflow-hidden">
            {Array.isArray(blog_content?.content_data) ? (
              blog_content.content_data.map((item: any, index: number) => (
                <div key={index} className="space-y-4">
                  <h3
                    id={slugify(item.title)}
                    className="flex scroll-mt-32 items-center gap-2 text-xl font-semibold leading-snug">
                    <span className="text-[#F54BB4]">{index + 1}.</span>
                    <span>{item.title}</span>
                  </h3>

                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                      rehypePlugins={[rehypeSlug, rehypeRaw]}
                      components={{
                        ul: ({ children }) => (
                          <ul className="ml-6 mt-4 list-outside list-disc space-y-2">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="leading-relaxed text-gray-700 dark:text-gray-300">{children}</li>
                        ),
                      }}>
                      {item.description}
                    </ReactMarkdown>
                  </div>
                </div>
              ))
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeSlug, rehypeRaw]}>
                {typeof blog_content?.content === 'string' ? blog_content.content : ''}
              </ReactMarkdown>
            )}
          </article>
        </div>
      </div>
      <div className="container overflow-hidden pt-14 md:pt-16 lg:pt-[88px] xl:pt-[100px]">
        <BlogList blogData={blogList} />
      </div>
    </section>
  )
}

export default BlogContent
