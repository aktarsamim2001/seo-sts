// src/components/homepage-07/HeroV7.tsx
import React from 'react'
import RevealWrapper from '../animation/RevealWrapper'
import CtaImageSlider from '../shared/CtaImageSlider'
import HeroGradientAnimation from '../shared/HeroGradientAnimation'
import SkewMarqueeHome from '../shared/SkewMarqueeHome'
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
                key: `marquee-item-${index}`,
              }))}
            />
            {titleTwo}
            <span style={{ color: '#F54BB4' }}> {titleThree}</span>{' '}
            <span style={{ color: '#53B9FF' }}>{titleFour}</span>
          </h1>
        </div>

        <p className="mt-10 max-w-[770px] font-normal max-lg:mx-auto">{contentOne}</p>
      </RevealWrapper>
      <SkewMarqueeHome
        marqueeItems={sliderImages?.map((img, idx) => ({
          id: idx + 1,
          src: img,
          key: `marquee-item-${idx}`,
        }))}
      />
      {/* <SkewMarquee marqueeItems={sliderImages}/> */}

      <HeroAbout contentTwo={contentTwo} />
    </section>
  )
}

export default HeroV7

// import RevealWrapper from '../animation/RevealWrapper'
// import CtaImageSlider from '../shared/CtaImageSlider'
// import HeroGradientAnimation from '../shared/HeroGradientAnimation'
// import SkewMarquee from '../shared/SkewMarquee'
// import HeroAbout from './HeroAbout'

// const HeroV7 = () => {
//   return (
//     <section className="relative overflow-hidden pb-14 pt-32 max-sm:px-3 md:pb-16 md:pt-44 lg:pb-[88px] xl:pb-[100px]">
//       {/* <div className="absolute left-[12%] top-40 -z-10 h-2/6 w-2/6 blur-[35px] md:blur-[60px]">
//         <HeroGradientAnimation />
//       </div> */}

//       <RevealWrapper className="mx-auto max-w-screen-xl px-5">
//         <div>
//           <h1 className="font-normal max-lg:text-center xl:text-[96px] xl:leading-[1.3] xl:tracking-[-2.88px]">
//             Design Studio
//             <CtaImageSlider
//               slides={[
//                 { id: '1', img: '/images/home 7/01.webp' },
//                 { id: '2', img: '/images/home 7/02.webp' },
//                 { id: '3', img: '/images/home 7/03.webp' },
//               ]}
//             />
//             Shaping
//             <span style={{ color: '#F54BB4' }}> Web3,</span>{' '}
//             <span style={{ color: '#53B9FF' }}>Tech & AI Horizons</span>
//           </h1>
//         </div>

//         <p className="mt-10 max-w-[770px] font-normal max-lg:mx-auto">
//           Transforming brands with memorable logos, stunning websites, and results-driven digital marketing strategies
//           that help businesses stand out, connect with their audience, and grow across every platform and screen.
//         </p>
//       </RevealWrapper>

//       <SkewMarquee />

//       <HeroAbout />
//     </section>
//   )
// }

// export default HeroV7
