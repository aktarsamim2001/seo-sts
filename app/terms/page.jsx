// src/app/terms/page.jsx
'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTermsConditionsDetails } from '@/store/slice/termsConditionsSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import TermsPolicyBody from '@/components/shared/TermsPolicyBody'

const Page = () => {
  const dispatch = useDispatch()
  const pageDetails = useSelector((state) => state.termsConditions)
  console.log('Page details:', pageDetails) // Debugging line to check page details

  useEffect(() => {
    dispatch(fetchTermsConditionsDetails('terms-conditions')) // Pass the slug as a string
  }, [dispatch])

  if (pageDetails.status) {
    return <p>Loading...</p>
  }

  if (pageDetails.error) {
    return <p>Error: {pageDetails.error}</p>
  }

  return (
    <LayoutOne>
      <PageHero
        title={pageDetails.page_content.title}
        italicTitle={pageDetails.page_content.sub_title_two}
        badgeTitle="Terms"
        scale
      />
      <TermsPolicyBody
        termsData={{
          slug: pageDetails.page_slug,
          content: pageDetails.page_content.page_content,
        }}
        heading={true}
      />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: '1', img: '/images/agent/18.webp' },
            { id: '2', img: '/images/agent/16.webp' },
            { id: '3', img: '/images/agent/19.webp' },
          ]}
        />
        with us.
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          A virtual coffee?
        </i>
      </CTA>
    </LayoutOne>
  )
}

export default Page
