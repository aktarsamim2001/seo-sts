// src/components/homepage-07/HeroV7.tsx
import React from 'react'
import RevealWrapper from '../animation/RevealWrapper'
import CtaImageSlider from '../shared/CtaImageSlider'
import HeroGradientAnimation from '../shared/HeroGradientAnimation'
import SkewMarquee from '../shared/SkewMarquee'
import HeroAbout from './HeroAbout'

interface HeroV7Props {
  titleOne: string
  titleTwo: string
  titleThree: string
  titleFour: string
  contentOne: string
  contentTwo: string
  titleImages: string[]
  sliderImages: string[]
}

const HeroV7: React.FC<HeroV7Props> = ({
  titleOne,
  titleTwo,
  titleThree,
  titleFour,
  contentOne,
  contentTwo,
  titleImages,
  sliderImages,
}) => {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 max-sm:px-3 md:pb-16 md:pt-44 lg:pb-[88px] xl:pb-[100px]">
      {/* <div className="absolute left-[12%] top-40 -z-10 h-2/6 w-2/6 blur-[35px] md:blur-[60px]">
        <HeroGradientAnimation />
      </div> */}

      <RevealWrapper className="mx-auto max-w-screen-xl px-5">
        <div>
          <h1 className="font-normal max-lg:text-center xl:text-[96px] xl:leading-[1.3] xl:tracking-[-2.88px]">
            {titleOne}
            <CtaImageSlider
              slides={titleImages.map((img, index) => ({
                id: String(index + 1),
                img: img,
              }))}
            />
            {titleTwo}
            <span style={{ color: '#F54BB4' }}>{titleThree}</span> <span style={{ color: '#53B9FF' }}>{titleFour}</span>
          </h1>
        </div>

        <p className="mt-10 max-w-[770px] font-normal max-lg:mx-auto">
          {contentOne} {contentTwo}
        </p>
      </RevealWrapper>

      <SkewMarquee />

      <HeroAbout />
    </section>
  )
}

export default HeroV7
