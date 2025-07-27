'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServicesDetails } from '@/store/slice/servicesSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import ServicesV14 from '@/components/homepage-16/ServicesV14'
import Process from '@/components/services-page/Process'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import HeroBanner from '@/components/aboutpage/HeroBanner'
import FAQ from '@/components/shared/FAQ'

const ServicesPageClient = () => {
  const dispatch = useDispatch()
  const servicesDetails = useSelector((state) => state.services)
  useEffect(() => {
    dispatch(fetchServicesDetails({ slug: 'services' }))
  }, [dispatch])
  return (
    <LayoutOne>
      <HeroBanner banner={servicesDetails?.page_content?.banner ?? []} />
      <ServicesV14
        services={servicesDetails.page_content.section_content ?? []}
        title_one={servicesDetails.page_content.section_content.title_one}
        title_two={servicesDetails.page_content.section_content.title_two}
        subtitle={servicesDetails.page_content.section_content.subtitle}
      />
      <Process processSteps={servicesDetails.page_content.process ?? []} />
      <FAQ faqs={servicesDetails.page_content.faqs ?? []} />
      <CTA
        title={servicesDetails.page_content.enquiry_data.title_one ?? ''}
        subtitle={servicesDetails.page_content.enquiry_data.title_two ?? ''}
        button={servicesDetails.page_content.enquiry_data.button}
      />
    </LayoutOne>
  )
}

export default ServicesPageClient
