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
import { fetchServicesDetails } from '@/store/slice/servicesSlice'

const ServiceDetails = ({ params }) => {
  const dispatch = useDispatch()
  const unwrappedParams = React.use(params)
  const { slug } = unwrappedParams
  const serviceDetails = useSelector((state) => state?.serviceDetails)
  const servicesDetails = useSelector((state) => state?.services)

  useEffect(() => {
    dispatch(fetchServicesDetails({ slug: 'services' }))
    dispatch(fetchServiceDetails(slug))
  }, [dispatch, slug])

  console.log(serviceDetails?.page_content?.data)

  return (
    <LayoutOne>
      <ServicesHero
        title={serviceDetails?.page_content?.data?.banner?.title}
        description={serviceDetails?.page_content?.data?.banner?.short_desc}
        scale
      />
      <ServiceContent service={serviceDetails?.page_content?.data?.table_contents} />
      <WhyChooseUsV6 whyChooseUs={serviceDetails?.page_content?.data?.why_choose_us} />
      <FaqV2 faqs={serviceDetails?.page_content?.data?.faqs} titleChange />
      <CTA enquiryData={servicesDetails.page_content?.data?.enquiry_data}>
        {servicesDetails?.page_content?.enquiry_data?.data?.title_one}
        <CtaImageSlider
          slides={servicesDetails?.page_content?.enquiry_data?.data?.title_images?.map((img, index) => ({
            id: String(index + 1),
            img: img,
          }))}
        />
        {servicesDetails?.page_content?.enquiry_data?.data?.title_two}
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          {servicesDetails?.page_content?.enquiry_data?.data?.title_three}
        </i>
      </CTA>
    </LayoutOne>
  )
}

export default ServiceDetails
