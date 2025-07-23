'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { fetchServiceDetails } from '@/store/slice/serviceDetailsSlice'
import { fetchServicesDetails } from '@/store/slice/servicesSlice'

import LayoutOne from '@/components/shared/LayoutOne'
import ServicesHero from '@/components/services-page/ServicesHero'
import ServiceContent from '@/components/services-page/ServiceContent'
import WhyChooseUsV6 from '@/components/homepage-17/WhyChooseUsV6'
import FAQ from '@/components/shared/FAQ'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import { useParams } from 'next/navigation'
import HeroBanner from '@/components/aboutpage/HeroBanner'
import TestimonialV2 from '@/components/shared/TestimonialV2'
import { fetchPageDetails } from '@/store/slice/homeSlice'

const ServiceDetails = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const serviceDetails = useSelector((state) => state.serviceDetails)
  const servicesDetails = useSelector((state) => state.services)
  const pageDetails = useSelector((state) => state.pageDetails)

  const testimonials = pageDetails?.page_content?.testimonials?.testimonials

  useEffect(() => {
    dispatch(fetchServicesDetails({ slug: 'services' }))
    dispatch(fetchServiceDetails(slug))
    dispatch(fetchPageDetails({ slug: 'home' }))
  }, [dispatch, slug])

  return (
    <LayoutOne>
      <HeroBanner />
      {/* {serviceDetails?.page_content?.data?.banner && (
        <ServicesHero
          title={serviceDetails?.page_content?.data?.banner?.title}
          description={serviceDetails?.page_content?.data?.banner?.short_desc}
          buttonText={serviceDetails?.page_content?.data?.banner?.button}
          scale
        />
      )} */}
      <ServiceContent service={serviceDetails?.page_content?.data?.table_contents} />
      <WhyChooseUsV6 whyChooseUs={serviceDetails?.page_content?.data?.why_choose_us} />
      <TestimonialV2
        title="What Our"
        italicTitle="Clients Say"
        subtitle="Celebrating excellence in Digital Transformation"
        testimonials={testimonials}
      />
      <FAQ faqs={serviceDetails?.page_content?.data?.faqs} titleChange />
      {servicesDetails?.page_content?.enquiry_data && (
        <CTA enquiryData={servicesDetails.page_content.enquiry_data}>
          {servicesDetails.page_content.enquiry_data?.title_one && (
            <p>{servicesDetails.page_content.enquiry_data.title_one}</p>
          )}

          {Array.isArray(servicesDetails.page_content.enquiry_data?.title_images) && (
            <CtaImageSlider
              slides={servicesDetails.page_content.enquiry_data.title_images.map((img, index) => ({
                id: String(index + 1),
                img,
              }))}
            />
          )}

          {servicesDetails.page_content.enquiry_data?.title_two && (
            <p>{servicesDetails.page_content.enquiry_data.title_two}</p>
          )}

          {servicesDetails.page_content.enquiry_data?.title_three && (
            <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
              {servicesDetails.page_content.enquiry_data.title_three}
            </i>
          )}
        </CTA>
      )}
    </LayoutOne>
  )
}

export default ServiceDetails
