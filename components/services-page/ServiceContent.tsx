import Image from 'next/image'
import RevealWrapper from '../animation/RevealWrapper'
import TableOfContent from '../shared/TableOfContent'
import img from '../../public/images/services/services-details2-img.webp'

interface ContentItem {
  title: string
  description: string
}

interface ServiceContentProps {
  service: {
    content_data?: ContentItem[]
    content_list?: any[]
  }
}

const ServiceContent = ({ service }: ServiceContentProps) => {
  const contentItems = service?.content_data || []
  console.log(service)
  const tableOfContents = service?.content_list || []

  return (
    <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
      <div className="mx-auto max-w-[1440px] px-8 md:px-20">
        <div className="flex flex-col justify-start gap-8 lg:flex-row">
          <aside className="min-w-[275px] flex-1">
            <div className="sticky top-28">
              <TableOfContent tableOfContents={tableOfContents} />
            </div>
          </aside>

          <article className="project-details-body">
            <RevealWrapper as="figure" className="h-[497px] w-full">
              <Image
                width={870}
                height={497}
                src={img}
                alt="Services Big Img"
                className="h-full w-full object-cover object-center"
              />
            </RevealWrapper>

            <RevealWrapper>
              {contentItems.length > 0 ? (
                <div className="space-y-8">
                  {contentItems.map((item, index) => (
                    <div key={index} className="content-section">
                      <h2 className="mb-4 text-2xl font-bold">{item.title}</h2>
                      <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
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
