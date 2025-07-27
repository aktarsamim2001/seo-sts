'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolioDetails } from '@/store/slice/portfolioSlice'
import { fetchPortfoliosList } from '@/store/slice/portfoliosListSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import ProjectServicesV3 from '@/components/projectpage-03/ProjectServicesV3'
import CTA from '@/components/shared/CTA'
import HeroBanner from '@/components/aboutpage/HeroBanner'
import PageHero from '@/components/shared/PageHero'

const PortfolioClient = () => {
  const dispatch = useDispatch()
  const portfolioDetails = useSelector((state) => state.portfolio)
  const portfoliosList = useSelector((state) => state.portfoliosList)

  useEffect(() => {
    dispatch(fetchPortfolioDetails({ slug: 'portfolio' }))
    dispatch(fetchPortfoliosList({ page_no: 1 }))
  }, [dispatch])

  return (
    <LayoutOne>
      <HeroBanner banner={portfolioDetails?.page_content?.banner} />
      <PageHero
        title={portfolioDetails?.page_content?.portfolio?.title_one}
        subtitle={portfolioDetails?.page_content?.portfolio?.title_two}
        italicTitle={portfolioDetails?.page_content?.portfolio?.content}
      />
      <ProjectServicesV3
        portfolio={portfoliosList?.portfolios?.data || []}
        paginationData={{
          total: portfoliosList?.portfolios?.total || 0,
          current_page: portfoliosList?.portfolios?.current_page || 1,
          per_page: portfoliosList?.portfolios?.per_page || 4,
          total_pages: portfoliosList?.portfolios?.total_pages || 1,
        }}
      />
      <CTA
        title={portfolioDetails?.page_content?.enquiry_data?.title_one}
        subtitle={portfolioDetails?.page_content?.enquiry_data?.title_two}
        button={portfolioDetails?.page_content?.enquiry_data?.button}
        buttonUrl={portfolioDetails?.page_content?.enquiry_data?.button_url}
      />
    </LayoutOne>
  )
}

export default PortfolioClient
