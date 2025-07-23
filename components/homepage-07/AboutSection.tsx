import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import PageHero from '@/components/shared/PageHero'

const AboutSection = ({ titleOne, titleTwo, subtitle, content, button, buttonUrl }: any) => {
  return (
    <section className="overflow-hidden`">
      {/* <div className="container">
        <div className="mb-8 text-center md:mb-20">
          <RevealWrapper className="rv-badge reveal-me mb-5 md:mb-8">
            <span className="rv-badge-text">Smart Task Studios</span>
          </RevealWrapper>
          <TextAppearAnimation>
            <h2 className="text-appear mx-auto max-w-[770px]">Transforming Business to Digital Platforms</h2>
          </TextAppearAnimation>
        </div>
      </div> */}
      <PageHero
        title={titleOne}
        italicTitle={titleTwo}
        subtitle={subtitle}
        description={content}
        buttonText={button}
        buttonUrl={buttonUrl}
      />
      {/* 
      <RevealWrapper>
        <Marquee speed={70} pauseOnHover>
          <div className="flex items-center gap-4 md:gap-[30px]">
            {workImages.slice(0, 5).map((imgUrl: string, index: number) => (
              <div key={index} className="h-72 max-w-60 first:ml-4 md:h-[470px] md:max-w-[370px] md:first:ml-[30px]">
                <Image
                  src={imgUrl}
                  alt={`Work image ${index + 1}`}
                  width={370}
                  height={470}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </RevealWrapper> */}

      {/* <RevealWrapper>
        <Marquee speed={70} pauseOnHover direction="right">
          <div className="flex items-center justify-around gap-4 pt-[30px] md:gap-[30px]">
            {workImages.toReversed().map((imgUrl: string, index: number) => (
              <div key={index} className="h-72 max-w-60 first:ml-4 md:h-[470px] md:max-w-[370px] md:first:ml-[30px]">
                <Image
                  src={imgUrl}
                  alt={`Work image ${index + 1}`}
                  width={370}
                  height={470}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </RevealWrapper> */}
    </section>
  )
}

export default AboutSection
