'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { fetchServiceDetails } from '@/store/slice/serviceDetailsSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import ServicesHero from '@/components/services-page/ServicesHero'
import ServiceContent from '@/components/services-page/ServiceContent'
import WhyChooseUsV6 from '@/components/homepage-17/WhyChooseUsV6'
import FaqV2 from '@/components/shared/FaqV2'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'

import React from 'react'

const ServiceDetails = ({ params }) => {
  const dispatch = useDispatch()
  const unwrappedParams = React.use(params)
  const { slug } = unwrappedParams
  const serviceDetails = useSelector((state) => state?.serviceDetails)
  const servicesDetails = useSelector((state) => state?.services)

  console.log('Service details:', serviceDetails)

  useEffect(() => {
    dispatch(fetchServiceDetails(slug))
  }, [dispatch, slug])

  console.log('Service Details Content:', serviceDetails?.page_content?.faqs)
  return (
    <LayoutOne>
      <ServicesHero
        title={serviceDetails?.page_content?.banner?.title}
        description={serviceDetails?.page_content?.banner?.short_desc}
        scale
      />
      <ServiceContent service={serviceDetails?.page_content?.table_contents} />
      <WhyChooseUsV6 whyChooseUs={serviceDetails?.page_content?.why_choose_us} />
      {/* <FaqV2 faqs={serviceDetails?.page_content?.faqs} titleChange /> */}
      <CTA enquiryData={servicesDetails.page_content.enquiry_data}>
        {servicesDetails.page_content.enquiry_data.title_one}
        <CtaImageSlider
          slides={servicesDetails.page_content.enquiry_data.title_images.map((img, index) => ({
            id: String(index + 1),
            img: img,
          }))}
        />
        {servicesDetails.page_content.enquiry_data.title_two}
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          {servicesDetails.page_content.enquiry_data.title_three}
        </i>
      </CTA>
    </LayoutOne>
  )
}

export default ServiceDetails
