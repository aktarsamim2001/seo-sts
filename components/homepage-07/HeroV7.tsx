import RevealWrapper from '../animation/RevealWrapper'
import CtaImageSlider from '../shared/CtaImageSlider'
import HeroGradientAnimation from '../shared/HeroGradientAnimation'
import SkewMarquee from '../shared/SkewMarquee'
import HeroAbout from './HeroAbout'

const HeroV7 = () => {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 max-sm:px-3 md:pb-16 md:pt-44 lg:pb-[88px] xl:pb-[100px]">
      {/* <div className="absolute left-[12%] top-40 -z-10 h-2/6 w-2/6 blur-[35px] md:blur-[60px]">
        <HeroGradientAnimation />
      </div> */}

      <RevealWrapper className="mx-auto max-w-screen-xl px-5">
        <div>
          <h1 className="font-normal max-lg:text-center xl:text-[96px] xl:leading-[1.3] xl:tracking-[-2.88px]">
            Design Studio
            <CtaImageSlider
              slides={[
                { id: '1', img: '/images/home 7/01.webp' },
                { id: '2', img: '/images/home 7/02.webp' },
                { id: '3', img: '/images/home 7/03.webp' },
              ]}
            />
            <span style={{ color: '#F54BB4' }}>Shaping Web3,</span>{' '}
            <span style={{ color: '#53B9FF' }}>Tech & AI Horizons</span>
          </h1>
        </div>

        <p className="mt-10 max-w-[770px] font-normal max-lg:mx-auto">
          As a agency we are working on client projects, official Webflow Templates and cloneables for the Webflow
          community.
        </p>
      </RevealWrapper>

      <SkewMarquee />

      <HeroAbout />
    </section>
  )
}

export default HeroV7
