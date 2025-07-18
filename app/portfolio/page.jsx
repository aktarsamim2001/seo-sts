// src/app/portfolio.tsx
'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/store/store'
import { fetchPortfolioDetails } from '@/store/slice/portfolioSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import ProjectServicesV3 from '@/components/projectpage-03/ProjectServicesV3'
import CtaV2 from '@/components/shared/CtaV2'

// export const metadata = {
//   title: 'Portfolio',
// }

const CaseStudy = () => {
  const dispatch = useDispatch()
  const portfolioDetails = useSelector((state) => state.portfolio)
  console.log('Portfolio details:', portfolioDetails)

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
      <ProjectServicesV3 portfolio={portfolioDetails.page_content} />
      <CtaV2 enquiryData={portfolioDetails.page_content.enquiry_data} />
    </LayoutOne>
  )
}

export default CaseStudy
