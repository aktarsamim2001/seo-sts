import WhyChooseUsV6 from '@/components/homepage-17/WhyChooseUsV6'
import ServiceContent from '@/components/services-page/ServiceContent'
import ServicesHero from '@/components/services-page/ServicesHero'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import FaqV2 from '@/components/shared/FaqV2'
import LayoutOne from '@/components/shared/LayoutOne'
import { ServicesType } from '@/components/shared/ServicesV8'
import getMarkDownContent from '@/utils/GetMarkDownContent'
import getMarkDownData from '@/utils/GetMarkDownData'
import { mediaServices } from '@/data/servicesV2/media'

export async function generateStaticParams() {
  const services: ServicesType[] = getMarkDownData('data/servicesV2')
  return services.map((service) => ({
    slug: service.slug,
  }))
}

const ServiceDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug
  const service = getMarkDownContent('data/servicesV2/', slug)
  const postServices = service.data

  // If the slug is 'media', use the updated JS array data
  const isMedia = slug === 'media'
  const mediaData = isMedia ? mediaServices[0] : null

  return (
    <LayoutOne>
      <ServicesHero
        title={isMedia ? (mediaData?.title ?? '') : postServices?.title}
        description={isMedia ? (mediaData?.description ?? '') : postServices?.description}
        scale
      />
      <ServiceContent service={service} />
      <WhyChooseUsV6 />
      <FaqV2 titleChange />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: '1', img: '/images/agent/11.webp' },
            { id: '2', img: '/images/agent/16.webp' },
            { id: '3', img: '/images/agent/17.webp' },
          ]}
        />
        with us.
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          A virtual coffee?
        </i>
      </CTA>
    </LayoutOne>
  )
}

export default ServiceDetails
