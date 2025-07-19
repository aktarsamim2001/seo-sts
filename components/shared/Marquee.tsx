'use client'
import React from 'react'
import Marquee from 'react-fast-marquee'
import gradientBg from '@/public/images/gradient-bg.png'
import Image from 'next/image'
import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'

interface WithBorderProps {
  withBorder: boolean
  clientsData: string[]
}

const MarqueeComponent: React.FC<WithBorderProps> = ({ withBorder, clientsData }) => {
  return (
    <section className="relative mx-auto w-full max-w-[1920px] max-md:pt-0.5">
      {withBorder ? (
        <div className="relative -z-0 overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
          <div className="absolute left-1/2 top-1/2 -z-30 -translate-x-1/2 -translate-y-1/2 scale-x-[2.5] scale-y-50 lg:scale-y-[0.3]">
            <Image src={gradientBg} alt="gradient-bg" />
          </div>
          <div className="relative overflow-hidden">
            <Marquee speed={100} gradient={false} pauseOnHover={true} className="flex gap-2.5">
              {clientsData?.map((item, i) => (
                <div
                  key={i}
                  className="z-50 mx-2 flex h-24 w-48 flex-shrink-0 items-center justify-center border border-secondary/10 bg-backgroundBody dark:border-backgroundBody/10 dark:bg-dark">
                  <Image
                    src={item}
                    alt={`Client logo ${i}`}
                    width={120}
                    height={60}
                    className="inline-block dark:hidden"
                  />
                  <Image
                    src={item}
                    alt={`Client logo ${i}`}
                    width={120}
                    height={60}
                    className="hidden dark:inline-block"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
          <RevealWrapper as="p" className="container mb-10 text-wrap text-center lg:mb-20">
            Trusted by over 100+ fast-growing companies all around the world
          </RevealWrapper>

          <Marquee speed={100} gradient={false} pauseOnHover={true} className="flex gap-2.5">
            {clientsData?.map((item, i) => (
              <div
                key={i}
                className="z-50 mx-2 flex h-24 w-48 flex-shrink-0 items-center justify-center border border-secondary/10 bg-backgroundBody dark:border-backgroundBody/10 dark:bg-dark">
                <Image
                  src={item}
                  alt={`Client logo ${i}`}
                  width={120}
                  height={60}
                  className="inline-block dark:hidden"
                />
                <Image
                  src={item}
                  alt={`Client logo ${i}`}
                  width={120}
                  height={60}
                  className="hidden dark:inline-block"
                />
              </div>
            ))}
          </Marquee>

          <RevealWrapper as="ul" className="reveal-me container mt-7 grid justify-self-center max-md:w-full md:mt-14">
            <li className="mx-auto block w-full text-center md:inline-block md:w-auto">
              <Link href="#" className="rv-button rv-button-white block md:inline-block">
                <div className="rv-button-top">
                  <span>View Our Network</span>
                </div>
                <div className="rv-button-bottom">
                  <span>View Our Network</span>
                </div>
              </Link>
            </li>
          </RevealWrapper>
        </div>
      )}
    </section>
  )
}

export default MarqueeComponent
