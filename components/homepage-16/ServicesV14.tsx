import { brandStrategy } from '@/data/servicesV3/brand-strategy'
import Image from 'next/image'
import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import RevealWrapperV2 from '../animation/RevealWrapperV2'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import TextAppearAnimation02 from '../animation/TextAppearAnimation02'

interface WorkType {
  slug: string
  content: string
  [key: string]: any
}

// Replace getMarkDownData with direct array import
const services: WorkType[] = brandStrategy.map((service, idx) => ({
  ...service,
  slug:
    (service as any).slug ||
    (typeof service.title === 'string' &&
      service.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')) ||
    `service-${idx}`,
  content: (service as any).content || '',
}))

const ServicesV14 = () => {
  return (
    <section className="overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="mb-8 text-center md:mb-16">
        <RevealWrapperV2 className="rv-badge reveal-me mb-3">
          <span className="rv-badge-text">Services</span>
        </RevealWrapperV2>
        <TextAppearAnimation02>
          <h2 className="text-appear mb-3">
            Digital solutions designed for <br />
            <i className="font-instrument text-[#F54BB4]"> maximum impact</i>
          </h2>
        </TextAppearAnimation02>
        <TextAppearAnimation>
          <p className="text-appear mx-auto lg:max-w-[770px]">
            Our marketing solutions boost engagement and ROI with targeted campaigns, improving brand visibility through
            SEO and social media.
          </p>
        </TextAppearAnimation>
      </div>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-[30px] px-4 md:grid-cols-2 md:px-[30px] 2xl:grid-cols-3">
        {services.map((service, idx) => (
          <RevealWrapper
            key={service.slug || idx}
            className="reveal-me group border border-[#F54BB4] px-6 py-9 lg:px-[30px] lg:py-[50px]">
            <div>
              <figure>
                <Image
                  src={service.logo}
                  alt="Light Logo"
                  className="inline-block dark:hidden"
                  width={60}
                  height={60}
                />
                <Image
                  src={service.logoDark}
                  alt="Light Logo"
                  className="hidden dark:inline-block"
                  width={60}
                  height={60}
                />
              </figure>
              <h5 className="mb-2 mt-4 lg:mb-3 lg:mt-6">{service.title}</h5>
              <p className="mb-20 lg:mb-[106px]">{service.description}</p>
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
          </RevealWrapper>
        ))}
      </div>
      {/* <RevealWrapper as="ul" className="mx-auto mt-7 flex justify-center max-md:w-full max-md:px-4 md:mt-14">
        <li className="mx-auto block w-full text-center md:inline-block md:w-auto">
          <Link href="/services" className="rv-button rv-button-primary block md:inline-block">
            <div className="rv-button-top">
              <span>Explore Our Services</span>
            </div>
            <div className="rv-button-bottom">
              <span>Explore Our Services</span>
            </div>
          </Link>
        </li>
      </RevealWrapper> */}
    </section>
  )
}

export default ServicesV14
