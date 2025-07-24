// src/app/portfolio.tsx
'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '@/store/store'
import { fetchPortfolioDetails } from '@/store/slice/portfolioSlice'
import { fetchPortfoliosList } from '@/store/slice/portfoliosListSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import ProjectServicesV3 from '@/components/projectpage-03/ProjectServicesV3'
import CTA from '@/components/shared/CTA'
import HeroBanner from '@/components/aboutpage/HeroBanner'
import PageHero from '@/components/shared/PageHero'

// export const metadata = {
//   title: 'Portfolio',
// }

const CaseStudy = () => {
  const dispatch = useDispatch()

  const portfolioDetails = useSelector((state) => state.portfolio)
  const portfoliosList = useSelector((state) => state.portfoliosList)

  useEffect(() => {
    dispatch(fetchPortfolioDetails({ slug: 'portfolio' }))
    dispatch(fetchPortfoliosList({ page_no: 1 }))
  }, [dispatch])

  console.log('Portfolio Details:', portfolioDetails)
  console.log('Portfolios List:', portfoliosList)

  return (
    <LayoutOne>
      <HeroBanner banner={portfolioDetails?.page_content?.banner} />
      <PageHero
        title={portfolioDetails?.page_content?.portfolio?.title_one}
        subtitle={portfolioDetails?.page_content?.portfolio?.title_two}
        italicTitle={portfolioDetails?.page_content?.portfolio?.content}
      />
      <ProjectServicesV3 portfolio={portfoliosList?.portfolios?.data || []} />
      <CTA
        title={portfolioDetails?.page_content?.enquiry_data?.title_one}
        subtitle={portfolioDetails?.page_content?.enquiry_data?.title_two}
        button={portfolioDetails?.page_content?.enquiry_data?.button}
        buttonUrl={portfolioDetails?.page_content?.enquiry_data?.button_url}
      />
    </LayoutOne>
  )
}

export default CaseStudy
