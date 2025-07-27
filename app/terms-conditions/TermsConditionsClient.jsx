'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTermsConditionsDetails } from '@/store/slice/termsConditionsSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import TermsPolicyBody from '@/components/shared/TermsPolicyBody'

const TermsConditionsClient = () => {
  const dispatch = useDispatch()
  const pageDetails = useSelector((state) => state?.termsConditions)
  const terms = pageDetails?.page_content?.page_content

  useEffect(() => {
    dispatch(fetchTermsConditionsDetails({ slug: 'terms-conditions' }))
  }, [dispatch])

  return (
    <LayoutOne>
      <PageHero title={pageDetails?.page_content?.title_one} italicTitle={pageDetails?.page_content?.title_two} scale />
      <TermsPolicyBody termsData={terms} />
      {/* ...existing code for CTA and CtaImageSlider if needed... */}
    </LayoutOne>
  )
}

export default TermsConditionsClient
