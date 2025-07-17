// src/app/about.tsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { fetchAboutUsDetails } from '@/store/slice/aboutUsSlice'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import Video from '@/components/shared/Video'
import About from '@/components/shared/About'
import Team from '@/components/aboutpage/Team'
import Marquee from '@/components/shared/Marquee'
import AwardsV2 from '@/components/aboutpage/AwardsV2'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'

export const metadata = {
  title: 'About - SmartTask Studios',
}

const AboutPage = () => {
  const dispatch = useDispatch()
  const aboutUsDetails = useSelector((state: RootState) => state.aboutUs)
  console.log('About Us details:', aboutUsDetails) // Debugging line to check about us details

  useEffect(() => {
    dispatch(fetchAboutUsDetails())
  }, [dispatch])

  if (aboutUsDetails.status) {
    return <p>Loading...</p>
  }

  if (aboutUsDetails.error) {
    return <p>Error: {aboutUsDetails.error}</p>
  }

  return (
    <LayoutOne>
      <PageHero
        badgeTitle={aboutUsDetails.page_content.banner.title}
        title={aboutUsDetails.page_content.banner.sub_title_one}
        italicTitle={aboutUsDetails.page_content.banner.sub_title_two}
        description={aboutUsDetails.page_content.banner.content}
      />
      <Video />
      <About />
      <Team />
      <Marquee withBorder={true} />
      <AwardsV2 />
      <CTA>
        {aboutUsDetails.page_content.enquiry_data.title_one}
        <CtaImageSlider
          slides={aboutUsDetails.page_content.enquiry_data.title_images.map((img, index) => ({
            id: String(index + 1),
            img: img,
          }))}
        />
        {aboutUsDetails.page_content.enquiry_data.title_two}
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          {aboutUsDetails.page_content.enquiry_data.title_three}
        </i>
      </CTA>
    </LayoutOne>
  )
}

export default AboutPage
