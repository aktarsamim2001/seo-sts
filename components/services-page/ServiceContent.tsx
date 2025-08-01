'use client'

import Image from 'next/image'
import RevealWrapper from '../animation/RevealWrapper'
import TableOfContent from '../shared/TableOfContent'
import img from '../../public/images/services/services-details2-img.webp'

import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import { slugify } from '@/utils/slugify'

interface ContentItem {
  title: string
  description: string
}

interface ServiceContentProps {
  service: {
    content_data?: ContentItem[]
    content_list?: string[]
    banner_image?: string
    image_alt?: string
  }
}

const ServiceContent = ({ service }: ServiceContentProps) => {
  const contentItems = service?.content_data || []
  const tableOfContents = service?.content_list || []

  return (
    <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-start gap-8 lg:flex-row">
          {/* Table of Contents */}
          <aside className="min-w-[275px] flex-1">
            <div className="sticky top-28">
              <TableOfContent tableOfContents={tableOfContents} />
            </div>
          </aside>

          {/* Main Content */}
          <article className="project-details-body flex-[3]">
            <RevealWrapper>
              {contentItems.length > 0 ? (
                <div className="mt-8 space-y-10">
                  {contentItems.map((item, index) => (
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
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No content available.</div>
              )}
            </RevealWrapper>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ServiceContent
