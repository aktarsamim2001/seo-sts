// src/app/services.tsx
'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/store/store'
import { fetchServicesDetails } from '@/store/slice/servicesSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import ServicesV14 from '@/components/homepage-16/ServicesV14'
import Process from '@/components/services-page/Process'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'

// export const metadata = {
//   title: 'Services',
// }

const ServicesPage = () => {
  const dispatch = useDispatch()
  const servicesDetails = useSelector((state) => state.services)
  console.log('Services details:', servicesDetails) // Debugging line to check services details

  useEffect(() => {
    dispatch(fetchServicesDetails({ slug: 'services' }))
  }, [dispatch])

  if (servicesDetails.status) {
    return <p>Loading...</p>
  }

  if (servicesDetails.error) {
    return <p>Error: {servicesDetails.error}</p>
  }

  return (
    <LayoutOne>
      <PageHero
        badgeTitle={servicesDetails.page_content.banner.title}
        title={servicesDetails.page_content.banner.sub_title}
        description={servicesDetails.page_content.banner.content}
      />
      <ServicesV14 services={servicesDetails.page_content.section_content} />
      <Process processSteps={servicesDetails.page_content.process} />
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

export default ServicesPage
