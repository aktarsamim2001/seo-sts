// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/store/store'
import { fetchPageDetails } from '@/store/slice/homeSlice'
import HeroV7 from '@/components/homepage-07/HeroV7'
import OurWork from '@/components/homepage-07/OurWork'
import PricingCard from '@/components/homepage-07/PricingCard'
import ProcessV4 from '@/components/homepage-07/ProcessV4'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import LayoutOne from '@/components/shared/LayoutOne'
import ServicesV6 from '@/components/shared/ServicesV6'
import TestimonialV2 from '@/components/shared/TestimonialV2'
import { fetchMenus } from '@/store/slice/menuSlice'
// export const metadata = {
//   title: 'Design Studio - SmartTask Studios',
// }

const Page = () => {
  const dispatch = useDispatch()
  const pageDetails = useSelector((state) => state.pageDetails)

  console.log('Page details:', pageDetails) // Debugging line to check page details

  useEffect(() => {
    dispatch(fetchPageDetails({ slug: 'home' }))
  }, [dispatch])

  if (pageDetails.status) {
    return <p>Loading...</p>
  }

  if (pageDetails.error) {
    return <p>Error: {pageDetails.error}</p>
  }

  return (
    <LayoutOne>
      <HeroV7
        titleOne={pageDetails.page_content.banner.title_one}
        titleTwo={pageDetails.page_content.banner.title_two}
        titleThree={pageDetails.page_content.banner.title_three}
        titleFour={pageDetails.page_content.banner.title_four}
        contentOne={pageDetails.page_content.banner.content_one}
        contentTwo={pageDetails.page_content.banner.content_two}
        titleImages={pageDetails.page_content.banner.title_images}
        sliderImages={pageDetails.page_content.banner.slider_images}
      />
      <OurWork
        title={pageDetails.page_content.our_work.title}
        subtitle={pageDetails.page_content.our_work.subtitle}
        workImages={pageDetails.page_content.our_work.work_images}
      />
      <ServicesV6
        title={pageDetails.page_content.services.title}
        subtitle={pageDetails.page_content.services.subtitle}
        button={pageDetails.page_content.services.button}
        buttonUrl={pageDetails.page_content.services.button_url}
        services={pageDetails.page_content.services.services}
      />
      <TestimonialV2
        title={pageDetails.page_content.testimonials.title}
        subtitle={pageDetails.page_content.testimonials.subtitle}
        testimonials={pageDetails.page_content.testimonials.testimonials}
      />
      <ProcessV4
        title={pageDetails.page_content.process_data.title}
        subtitle={pageDetails.page_content.process_data.subtitle}
        featureImage={pageDetails.page_content.process_data.feature_image}
        processSteps={pageDetails.page_content.process_data.process_data}
      />
      {/* <PricingCard showHeader={true} /> */}
      <CTA enquiryData={pageDetails.page_content.enquiry_data}>
        Let’s
        <CtaImageSlider
          slides={pageDetails.page_content.enquiry_data.title_images.map((img, index) => ({
            id: String(index + 1),
            img: img,
          }))}
        />
        Create
        <span className="block font-instrument italic text-[#F54BB4] max-md:inline-block sm:mt-10">
          Something Iconic
        </span>
      </CTA>
    </LayoutOne>
  )
}

export default Page
