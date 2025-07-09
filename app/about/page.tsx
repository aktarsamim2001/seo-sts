import AwardsV2 from '@/components/aboutpage/AwardsV2'
import Team from '@/components/aboutpage/Team'
import About from '@/components/shared/About'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import LayoutOne from '@/components/shared/LayoutOne'
import Marquee from '@/components/shared/Marquee'
import PageHero from '@/components/shared/PageHero'
import Video from '@/components/shared/Video'

export const metadata = {
  title: 'About',
}

const AboutPage = () => {
  return (
    <LayoutOne>
      <PageHero
        badgeTitle="About"
        title="SmartTask "
        italicTitle=""
        description="At SmartTask Studios, we transform ideas into powerful visual stories. From brand identity and custom graphics to digital marketing and motion design, we craft compelling content and experiences that elevate brands across print, web, and social platforms."
      />
      <Video />
      <About />
      <Team />
      <Marquee withBorder={true} />
      <AwardsV2 />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: '1', img: '/images/about/11.webp' },
            { id: '2', img: '/images/about/12.webp' },
            { id: '3', img: '/images/about/13.webp' },
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

export default AboutPage
