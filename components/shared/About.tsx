'use client'
import useReveal from '@/hooks/useReveal'
import RevealWrapper from '../animation/RevealWrapper'
import CompanyLogosMarquee from '../homepage-02/CompanyLogosMarquee'
import CircleTextAnimation from './CircleTextAnimation'
import logoDark from '@/public/images/logo-black.png'
import logo2 from '@/public/images/logo-white2.png'
import Image from 'next/image'

interface AboutProps {
  marquee?: boolean
}

const About = ({ marquee = false }: AboutProps) => {
  const { revealRef } = useReveal()

  if (marquee) {
    return (
      <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[120px]">
        <div className="container">
          <RevealWrapper>
            <h3 className="pb-10 sm:pb-20" ref={revealRef}>
              We provide customized solutions for enhancing your existing site or building a brand-new digital platform
              from the ground up.
            </h3>
          </RevealWrapper>
          <RevealWrapper>
            <CircleTextAnimation />
          </RevealWrapper>

          <div className="flex flex-auto flex-col items-center justify-between gap-x-8 gap-y-14 pt-14 sm:pt-[70px] md:flex-row md:pt-[100px] xl:gap-x-28">
            <RevealWrapper className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-backgroundBody to-transparent dark:from-dark"></div>
              <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-backgroundBody to-transparent dark:from-dark"></div>

              <CompanyLogosMarquee />
            </RevealWrapper>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden pb-14 pt-28 md:pb-16 md:pt-32 lg:pb-[88px] lg:pt-44 xl:pb-[100px] xl:pt-[200px]">
      <div className="container">
        <div className="flex flex-col items-center justify-center lg:items-stretch lg:justify-normal">
          {/* <CircleTextAnimation /> */}
          <div className="flex items-center justify-center">
            <Image
              className="inline-block max-h-[140px] w-auto dark:hidden"
              src={logo2}
              alt="logo"
              width={180}
              height={140}
              priority
            />
            <Image
              className="hidden max-h-[140px] w-auto dark:inline-block"
              src={logoDark}
              alt="logo"
              width={180}
              height={140}
              priority
            />
          </div>
          <h3 className="mx-auto mt-[34px]" ref={revealRef}>
            We create cutting-edge web experiences that fuse bold design with innovative technology.
            <br />
            <br />
            From enhancing existing websites to building custom digital platforms from the ground up, we deliver
            scalable, user-focused solutions that drive impact and growth.
          </h3>
        </div>
      </div>
    </section>
  )
}
export default About
