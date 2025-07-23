// src/app/portfolio.tsx
'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/store/store'
import { fetchPortfolioDetails } from '@/store/slice/portfolioSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import ProjectServicesV3 from '@/components/projectpage-03/ProjectServicesV3'
import CTA from '@/components/shared/CTA'
import HeroBanner from '@/components/aboutpage/HeroBanner'

// export const metadata = {
//   title: 'Portfolio',
// }

const CaseStudy = () => {
  const dispatch = useDispatch()
  const portfolioDetails = useSelector((state) => state.portfolio)

  useEffect(() => {
    dispatch(fetchPortfolioDetails({ slug: 'portfolio' }))
  }, [dispatch])

  if (portfolioDetails.status) {
    return <p>Loading...</p>
  }

  if (portfolioDetails.error) {
    return <p>Error: {portfolioDetails.error}</p>
  }

  return (
    <LayoutOne>
      <HeroBanner />
      <ProjectServicesV3 portfolio={portfolioDetails.page_content} />
      <CTA
        enquiryData={{
          ...portfolioDetails.page_content.enquiry_data,
          button: portfolioDetails.page_content.enquiry_data.button || 'Contact Us',
          title_three: portfolioDetails.page_content.enquiry_data.title_three || '',
          title_images: [],
          form_budgets: [],
          form_interests: [],
        }}
        form={false}
      />
    </LayoutOne>
  )
}

export default CaseStudy
