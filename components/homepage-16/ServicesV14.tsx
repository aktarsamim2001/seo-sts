import Image from 'next/image'
import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import RevealWrapperV2 from '../animation/RevealWrapperV2'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import TextAppearAnimation02 from '../animation/TextAppearAnimation02'

interface ServiceType {
  slug: string
  content: string
  logo: string
  logoDark: string
  title: string
  description: string
  service_id?: number
  list_image?: string
  short_desc?: string
  [key: string]: any
}

interface ServicesData {
  title: string
  sub_title_one: string
  sub_title_two: string
  content: string
  services: ServiceType[]
}

const ServicesV14 = ({
  services,
  title_one,
  title_two,
  subtitle,
}: {
  services: ServicesData
  title_one: string
  title_two: string
  subtitle: string
}) => {
  return (
    <section className="overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="mb-8 text-center md:mb-16">
        <h2 className="text-appear mb-3">
          {title_one} <br />
          <span className="font-instrument italic text-[#F54BB4]">{title_two}</span>
        </h2>
        <p className="text-appear mx-auto px-4 md:px-0 lg:max-w-[770px]">{subtitle}</p>
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-[30px] px-4 md:grid-cols-2 md:px-[30px] 2xl:grid-cols-3">
        {services?.services?.map((service) => (
          <RevealWrapper
            key={service.service_id}
            className="reveal-me group border border-[#F54BB4] px-6 py-9 lg:px-[30px] lg:py-[50px]">
            <Link href={`/services/${service.slug}`}>
              <div className="flex flex-col items-start">
                <figure>
                  {service.list_image && (
                    <Image src={service.list_image} alt="Light Logo" className="inline-block" width={60} height={60} />
                  )}
                </figure>
                <h5 className="mb-2 mt-4 lg:mb-3 lg:mt-6">{service.title}</h5>
                <p className="mb-20 lg:mb-[106px]">{service.short_desc}</p>
                <div className="accordion-header-iconV5 transition-all duration-300 group-hover:bg-[#F54BB4]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-team-bezier group-hover:rotate-90 md:size-8">
                    <path d="M5 16H27" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M18 7L27 16L18 25"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}

export default ServicesV14
