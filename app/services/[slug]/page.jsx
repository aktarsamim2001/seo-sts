'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import { fetchServiceDetails } from '@/store/slice/serviceDetailsSlice'
import { fetchServicesDetails } from '@/store/slice/servicesSlice'

import LayoutOne from '@/components/shared/LayoutOne'
import HeroBanner from '@/components/servicedetails/HeroBanner'
import ServiceContent from '@/components/services-page/ServiceContent'
import WhyChooseUsV6 from '@/components/homepage-17/WhyChooseUsV6'
import FAQ from '@/components/shared/FAQ'
import CTA from '@/components/shared/CTA'

const ServiceDetails = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const { data, status } = useSelector((state) => state.serviceDetails)
  const servicesDetails = useSelector((state) => state.services)

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      dispatch(fetchServiceDetails({ slug })) // ✅ correct for service detail
      dispatch(fetchServicesDetails({ slug: 'services' })) // ✅ correct for CTA
    }
  }, [dispatch, slug])

  if (status === false && (!data || !data.banner)) {
    return (
      <LayoutOne>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg">No service data available</div>
        </div>
      </LayoutOne>
    )
  }

  return (
    <LayoutOne>
      {data?.banner && <HeroBanner banner={data.banner} />}
      {data?.table_contents && <ServiceContent service={data.table_contents} />}
      {data?.why_choose_us?.length > 0 && (
        <WhyChooseUsV6
          whyChooseUs={{
            title: data?.why_choose_us_title_one,
            sub_title_one: data?.why_choose_us_title_two,
            section_content: data?.why_choose_us_content,
            button: data?.why_choose_us_button,
            button_url: data?.why_choose_us_redirection_url || '#',
            data: data.why_choose_us,
          }}
        />
      )}
      {data?.faqs?.length > 0 && <FAQ faqs={data.faqs} titleChange />}

      {/* ✅ Correct CTA from services slice */}
      {servicesDetails?.page_content?.enquiry_data && (
        <CTA
          title={servicesDetails.page_content.enquiry_data.title_one ?? ''}
          subtitle={servicesDetails.page_content.enquiry_data.title_two ?? ''}
          button={servicesDetails.page_content.enquiry_data.button}
        />
      )}
    </LayoutOne>
  )
}

export default ServiceDetails
