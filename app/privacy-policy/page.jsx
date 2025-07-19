'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/store/store'
import { fetchPrivacyPolicyDetails } from '@/store/slice/privacyPolicySlice'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import TermsPolicyBody from '@/components/shared/TermsPolicyBody'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'

// export const metadata = {
//   title: 'Privacy & Policy - SmartTask Studios',
// }

const FAQPage = () => {
  const dispatch = useDispatch()
  const pageDetails = useSelector((state) => state.privacyPolicy)
  const privacyData = pageDetails?.page_content?.page_content

  useEffect(() => {
    dispatch(fetchPrivacyPolicyDetails({ slug: 'privacy-policy' }))
  }, [dispatch])

  if (pageDetails.status) {
    return <p>Loading...</p>
  }

  return (
    <LayoutOne>
      <PageHero title={privacyData?.sub_title_one} italicTitle={privacyData?.sub_title_two} badgeTitle="Policy" scale />
      <TermsPolicyBody termsData={privacyData?.page_content} />

      {/* <CTA enquiryData={pageDetails.page_content.enquiry_data}>
        {pageDetails.page_content.enquiry_data.title_one}
        <CtaImageSlider
          slides={pageDetails.page_content.enquiry_data.title_images.map((img, index) => ({
            id: String(index + 1),
            img: img,
          }))}
        />
        {pageDetails.page_content.enquiry_data.title_two}
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          {pageDetails.page_content.enquiry_data.title_three}
        </i>
      </CTA> */}
    </LayoutOne>
  )
}

export default FAQPage
