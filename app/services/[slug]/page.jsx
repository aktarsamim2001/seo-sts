'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServiceDetails } from '@/store/slice/serviceDetailsSlice'

import LayoutOne from '@/components/shared/LayoutOne'
import ServicesHero from '@/components/services-page/ServicesHero'
import ServiceContent from '@/components/services-page/ServiceContent'
import WhyChooseUsV6 from '@/components/homepage-17/WhyChooseUsV6'
import FAQ from '@/components/shared/FAQ'
import { useParams } from 'next/navigation'
import HeroBanner from '@/components/aboutpage/HeroBanner'

const ServiceDetails = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const serviceDetails = useSelector((state) => state.serviceDetails)

  useEffect(() => {
    if (slug) {
      dispatch(fetchServiceDetails(slug))
    }
  }, [dispatch, slug])

  return (
    <LayoutOne>
      <HeroBanner banner={serviceDetails.page_content.banner} />
      <ServiceContent service={serviceDetails.page_content.table_contents} />
      <WhyChooseUsV6 whyChooseUs={serviceDetails.page_content.why_choose_us} />
      <FAQ faqs={serviceDetails.page_content.faqs} titleChange />
    </LayoutOne>
  )
}

export default ServiceDetails
