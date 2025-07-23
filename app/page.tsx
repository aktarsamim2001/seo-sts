// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'
import { fetchPageDetails } from '@/store/slice/homeSlice'
import HeroV24 from '@/components/homepage-24/HeroV24'
import AboutSection from '@/components/homepage-07/AboutSection'
import PricingCard from '@/components/homepage-07/PricingCard'
import ProcessV4 from '@/components/homepage-07/ProcessV4'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import LayoutOne from '@/components/shared/LayoutOne'
import ServicesV6 from '@/components/shared/ServicesV6'
import TestimonialV2 from '@/components/shared/TestimonialV2'
import { fetchMenus } from '@/store/slice/menuSlice'
import OurWorkV2 from '@/components/homepage-15/OurWorkV2'

const Page = () => {
  const dispatch = useDispatch<AppDispatch>()
  const pageDetails = useSelector((state: RootState) => state.pageDetails)

  console.log('Page details:', pageDetails)

  useEffect(() => {
    dispatch(fetchPageDetails({ slug: 'home' }))
  }, [dispatch])

  return (
    <LayoutOne>
      <HeroV24 />
      <AboutSection
        title={pageDetails.page_content.our_work.title}
        subtitle={pageDetails.page_content.our_work.subtitle}
        workImages={pageDetails.page_content.our_work.work_images}
      />
      <ServicesV6
        title={'What'}
        italicTitle={'We Do'}
        subtitle={'We build innovative digital experiences where creativity meets advanced technology'}
        button={pageDetails.page_content.services.button}
        buttonUrl={pageDetails.page_content.services.button_url}
        services={pageDetails.page_content.services.services.map((service: any, idx: number) => ({
          id: service.service_id ?? idx,
          ...service,
        }))}
      />
      <OurWorkV2
        title="What"
        italicTitle="We Did"
        subtitle="Brand identities that speak for themselves"
        workImages={pageDetails?.page_content?.our_work?.work_images}
      />
      <ProcessV4
        title="How"
        italicTitle="We Work"
        subtitle="Our Work Process Journey"
        featureImage={pageDetails.page_content.process_data.feature_image}
        processSteps={pageDetails.page_content.process_data.process_data}
      />
      <TestimonialV2
        title="What Our"
        italicTitle="Clients Say"
        subtitle="Celebrating excellence in Digital Transformation"
        testimonials={pageDetails.page_content.testimonials.testimonials}
      />
      {/* <PricingCard showHeader={true} /> */}
      <CTA enquiryData={pageDetails?.page_content?.enquiry_data} form={false} />
    </LayoutOne>
  )
}

export default Page
