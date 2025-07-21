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
import FaqV2 from '@/components/shared/FaqV2'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import { useParams } from 'next/navigation'

const ServiceDetails = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const serviceDetails = useSelector((state) => state.serviceDetails)
  const servicesDetails = useSelector((state) => state.services)

  useEffect(() => {
    dispatch(fetchServicesDetails({ slug: 'services' }))
    dispatch(fetchServiceDetails(slug))
  }, [dispatch, slug])

  return (
    <LayoutOne>
      {serviceDetails?.page_content?.data?.banner && (
        <ServicesHero
          title={serviceDetails?.page_content?.data?.banner?.title}
          description={serviceDetails?.page_content?.data?.banner?.short_desc}
          buttonText={serviceDetails?.page_content?.data?.banner?.button}
          scale
        />
      )}
      <ServiceContent service={serviceDetails?.page_content?.data?.table_contents} />
      <WhyChooseUsV6 whyChooseUs={serviceDetails?.page_content?.data?.why_choose_us} />
      <FaqV2 faqs={serviceDetails?.page_content?.data?.faqs} titleChange />
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
