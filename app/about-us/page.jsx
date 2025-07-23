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
  const pageDetails = useSelector((state) => state.pageDetails)

  useEffect(() => {
    dispatch(fetchAboutUsDetails({ slug: 'about-us' }))
    dispatch(fetchPageDetails({ slug: 'home' }))
  }, [dispatch])

  const services = aboutUsDetails?.page_content?.services
  const sectionContent = aboutUsDetails?.page_content?.section_content
  const enquiryData = aboutUsDetails?.page_content?.enquiry_data
  const clients = aboutUsDetails?.page_content?.clients
  const testimonials = pageDetails?.page_content?.testimonials?.testimonials

  return (
    <LayoutOne>
      <HeroBanner />
      <PageHero
        title="SmartTask"
        subtitle="Your Creative Powerhouse, On Demand"
        italicTitle="Studios"
        description={
          'At SmartTask Studio, we believe that high-quality creative work should be accessible, efficient, and stress-free. That’s why we built a modern studio that connects growing brands, entrepreneurs, and agencies with a dedicated team of top-tier designers, developers, writers, and marketers — all managed under one roof. We’re not just a service provider — we’re your behind-the-scenes creative team, helping you build bold brands, launch better content, and market smarter. Whether you need a full rebrand, a sleek website, a scroll-stopping ad, or consistent content creation, SmartTask Studio delivers the quality of a full agency — without the agency price tag or delays.'
        }
      />

      {services && (
        <AwardsV2
          title={services.title}
          subtitle={services.subtitle}
          button={services.button}
          buttonUrl={services.button_url}
          services={services.services}
        />
      )}

      {sectionContent && (
        <About
          title="Our Mission"
          content_one="To simplify creative production for modern businesses by delivering premium design, content, and marketing solutions — fast, affordable, and done right the first time."
          feature_image={sectionContent.feature_image}
        />
      )}

      <OurVision />

      {clients && <Marquee clientsData={clients} withBorder={true} />}

      {testimonials && (
        <TestimonialV2
          title="What Our"
          italicTitle="Clients Say"
          subtitle="Celebrating excellence in Digital Transformation"
          testimonials={testimonials}
        />
      )}

      {enquiryData && <CTA enquiryData={enquiryData} form={false} />}
    </LayoutOne>
  )
}

export default AboutPage
