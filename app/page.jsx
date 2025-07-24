// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  const dispatch = useDispatch()
  const pageDetails = useSelector((state) => state.pageDetails)

  console.log('Page details:', pageDetails)

  useEffect(() => {
    dispatch(fetchPageDetails({ slug: 'home' }))
  }, [dispatch])

  const content = pageDetails?.page_content || {}
  return (
    <LayoutOne>
      <HeroV24 heroSlides={content.banner ?? []} />
      <AboutSection
        titleOne={content.about?.title_one ?? ''}
        titleTwo={content.about?.title_two ?? ''}
        subtitle={content.about?.subtitle ?? ''}
        content={content.about?.content ?? ''}
        button={content.about?.button ?? ''}
        buttonUrl={content.about?.button_url ?? '#'}
      />
      <ServicesV6
        titleOne={content.services?.title_one ?? ''}
        titleTwo={content.services?.title_two ?? ''}
        subtitle={content.services?.subtitle ?? ''}
        button={content.services?.button ?? ''}
        buttonUrl={content.services?.button_url ?? '#'}
        services={content.services?.services ?? []}
      />
      <OurWorkV2
        titleOne={content.what_we_did?.title_one ?? ''}
        titleTwo={content.what_we_did?.title_two ?? ''}
        subtitle={content.what_we_did?.subtitle ?? ''}
        portfolio={content.what_we_did?.portfolio ?? []}
        button={content.what_we_did?.button ?? ''}
        buttonUrl={content.what_we_did?.button_url ?? '#'}
      />
      <ProcessV4
        titleOne={content.how_we_work?.title_one ?? ''}
        titleTwo={content.how_we_work?.title_two ?? ''}
        subtitle={content.how_we_work?.subtitle ?? ''}
        featureImage={content.how_we_work?.feature_image ?? ''}
        workTimeline={content.how_we_work?.work_timeline ?? []}
        button={content.how_we_work?.button ?? ''}
        buttonUrl={content.how_we_work?.button_url ?? '#'}
      />
      <TestimonialV2
        title_one={content.testimonials?.title_one ?? ''}
        title_two={content.testimonials?.title_two ?? ''}
        subtitle={content.testimonials?.subtitle ?? ''}
        testimonials={content.testimonials?.testimonials ?? []}
      />
      {/* <PricingCard showHeader={true} /> */}
      <CTA
        title={content.enquiry_data?.title ?? ''}
        subtitle={content.enquiry_data?.subtitle ?? ''}
        button={content.enquiry_data?.button ?? ''}
        buttonUrl={content.enquiry_data?.button_url ?? '#'}
      />
    </LayoutOne>
  )
}

export default Page
