'use client'

import Image from 'next/image'
import RevealWrapper from '../animation/RevealWrapper'
import TableOfContent from '../shared/TableOfContent'
import img from '../../public/images/services/services-details2-img.webp'

import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'

interface ContentItem {
  title: string
  description: string
}

interface ServiceContentProps {
  service: {
    content_data?: ContentItem[]
    content_list?: any[]
    banner_image?: string // Optional dynamic image
    image_alt?: string
  }
}

// Utility to generate slug-like IDs for heading anchors
const generateId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

const ServiceContent = ({ service }: ServiceContentProps) => {
  const contentItems = service?.content_data || []
  const tableOfContents = service?.content_list || []

  return (
    <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
      <div className="mx-auto max-w-[1440px] px-8 md:px-20">
        <div className="flex flex-col justify-start gap-8 lg:flex-row">
          {/* Table of Contents */}
          <aside className="min-w-[275px] flex-1">
            <div className="sticky top-28">
              <TableOfContent tableOfContents={tableOfContents} />
            </div>
          </aside>

          {/* Main Content */}
          <article className="project-details-body">
            {/* Banner Image */}
            <RevealWrapper as="figure" className="h-[497px] w-full">
              <Image
                width={870}
                height={497}
                src={service?.banner_image || img}
                alt={service?.image_alt || 'Services Big Img'}
                className="h-full w-full object-cover object-center"
              />
            </RevealWrapper>

            {/* Markdown Content */}
            <RevealWrapper>
              {contentItems.length > 0 ? (
                <div className="mt-9 space-y-8">
                  {contentItems.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="content-section">
                      <h2 id={generateId(item.title)} className="scroll-mt-32 text-[27px] font-[400]">
                        {item.title}
                      </h2>

                      <ReactMarkdown
                        rehypePlugins={[rehypeSlug, rehypeRaw]}
                        className="prose dark:prose-invert mt-6 max-w-none">
                        {item.description}
                      </ReactMarkdown>
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
