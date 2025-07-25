'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { fetchAboutUsDetails } from '@/store/slice/aboutUsSlice'
import { fetchPageDetails } from '@/store/slice/homeSlice'

import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import About from '@/components/shared/About'
import OurVision from '@/components/aboutpage/OurVision'
import Marquee from '@/components/shared/Marquee'
import AwardsV2 from '@/components/aboutpage/AwardsV2'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import HeroBanner from '@/components/aboutpage/HeroBanner'
import TestimonialV2 from '@/components/shared/TestimonialV2'

const AboutPage = () => {
  const dispatch = useDispatch()

  const aboutUsDetails = useSelector((state) => state.aboutUs)

  useEffect(() => {
    dispatch(fetchAboutUsDetails({ slug: 'about-us' }))
  }, [dispatch])

  return (
    <LayoutOne>
      <HeroBanner banner={aboutUsDetails?.page_content?.banner ?? []} />
      <PageHero
        title={aboutUsDetails?.page_content?.section_content?.title_one ?? ''}
        subtitle={aboutUsDetails?.page_content?.section_content?.subtitle ?? ''}
        italicTitle={aboutUsDetails?.page_content?.section_content?.title_two ?? ''}
        description={aboutUsDetails?.page_content?.section_content?.content ?? ''}
      />

      {aboutUsDetails?.page_content?.services && (
        <AwardsV2
          title={aboutUsDetails?.page_content?.services?.title}
          subtitle={aboutUsDetails?.page_content?.services?.subtitle}
          content={aboutUsDetails?.page_content?.services?.content}
          button={aboutUsDetails?.page_content?.services?.button}
          buttonUrl={aboutUsDetails?.page_content?.services?.button_url}
          services={aboutUsDetails?.page_content?.services?.services}
        />
      )}

      {aboutUsDetails?.page_content?.our_mission && (
        <About
          title={aboutUsDetails?.page_content?.our_mission?.title}
          content={aboutUsDetails?.page_content?.our_mission?.content}
          feature_image={aboutUsDetails?.page_content?.our_mission?.feature_image}
          button={aboutUsDetails?.page_content?.our_mission?.button}
          button_url={aboutUsDetails?.page_content?.our_mission?.button_url || '#'}
        />
      )}
      {aboutUsDetails?.page_content?.work_with_us?.data && (
        <OurVision
          title_one={aboutUsDetails.page_content.work_with_us.title_one}
          title_two={aboutUsDetails.page_content.work_with_us.title_two}
          content={aboutUsDetails.page_content.work_with_us.content}
          data={aboutUsDetails.page_content.work_with_us.data}
        />
      )}

      {aboutUsDetails?.page_content?.clients && (
        <Marquee clientsData={aboutUsDetails?.page_content?.clients} withBorder={true} />
      )}

      {aboutUsDetails?.page_content?.testimonial && (
        <TestimonialV2
          title_one={aboutUsDetails?.page_content?.testimonial?.title_one}
          title_two={aboutUsDetails?.page_content?.testimonial?.title_two}
          subtitle={aboutUsDetails?.page_content?.testimonial?.subtitle}
          testimonials={aboutUsDetails?.page_content?.testimonial?.testimonials}
        />
      )}

      {aboutUsDetails?.page_content?.enquiry_data && (
        <CTA
          title={aboutUsDetails?.page_content?.enquiry_data?.title ?? ''}
          subtitle={aboutUsDetails?.page_content?.enquiry_data?.subtitle ?? ''}
          button={aboutUsDetails?.page_content?.enquiry_data?.button ?? ''}
          buttonUrl={aboutUsDetails?.page_content?.enquiry_data?.button_url ?? '#'}
        />
      )}
    </LayoutOne>
  )
}

export default AboutPage
