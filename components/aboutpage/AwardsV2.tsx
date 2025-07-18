// src/components/aboutpage/AwardsV2.tsx
import React, { useState } from 'react'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import AwardItem from './AwardItem'
import ServicesV6 from '@/components/shared/ServicesV6'
import gradientBg from '@/public/images/services-gradient-bg-2.png'
import Image from 'next/image'
import Link from 'next/link'

interface Service {
  id: number
  title: string
  subtitle: string
  items: string[]
}

interface AwardsV2Props {
  title: string
  subtitle: string
  button: string
  buttonUrl: string
  services: Service[]
}

const AwardsV2: React.FC<AwardsV2Props> = ({ title, subtitle, button, buttonUrl, services }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="container relative overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="mb-8 flex flex-col gap-x-8 gap-y-4 md:mb-20 lg:flex-row lg:justify-between">
        <div>
          <RevealWrapper className="rv-badge">
            <span className="rv-badge-text">{title}</span>
          </RevealWrapper>
          <TextAppearAnimation>
            <h2 className="text-appear mt-3 lg:mt-5">{subtitle}</h2>
          </TextAppearAnimation>
        </div>
        <TextAppearAnimation>
          <p className="text-appear max-w-[470px] lg:self-end">
            Our commitment to exceptional design has earned global recognition and industry accolades.
          </p>
        </TextAppearAnimation>
      </div>
      <RevealWrapper className="mx-auto w-full max-w-[1170px] [&>*:not(:last-child)]:mb-6">
        {services.map((service, index) => (
          <div
            key={service.service_id}
            className="faq-body-transition overflow-hidden border border-[#F54BB4] bg-backgroundBody duration-300 dark:border-[#F54BB4] dark:bg-dark">
            <div
              className={`group relative flex cursor-pointer items-center justify-between px-5 py-5 md:px-10 ${
                activeIndex === index ? 'active' : ''
              }`}
              onClick={() => toggleAccordion(index)}>
              <h3 className="flex flex-col items-start gap-x-10 gap-y-3 text-[25px] font-normal leading-[25.2px] text-secondary dark:text-white md:flex-row md:items-center md:text-5xl md:leading-[1.2]">
                <span className="max-w-sm text-inherit">{service.title}</span>
                <span className="flex items-start pr-[2px] text-base text-secondary/70 dark:text-white/70 md:text-xl md:leading-[1.4] md:tracking-[0.4px]">
                  {service.short_desc}
                </span>
              </h3>
              <div className="accordion-header-iconV5 transition-all duration-300 group-hover:bg-[#F54BB4]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-team-bezier group-hover:rotate-90 md:size-8">
                  <path d="M5 16H27" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M18 7L27 16L18 25"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}>
              <div className="overflow-hidden">
                <div className="accordion-body flex flex-col justify-start px-10 pb-10 duration-300 sm:ml-2.5 sm:flex-row sm:gap-10 md:ml-6 lg:gap-x-[73px]">
                  <ul className="[&>*:not(:last-child)]:mb-1">
                    {(service.features ?? [])
                      .slice(0, Math.ceil((service.features ?? []).length / 2))
                      .map((item, idx) => (
                        <li
                          key={`first-${service.service_id}-${item}`}
                          className="list-disc text-[17px] leading-[1.5] tracking-[0.36px] text-secondary/70 dark:text-backgroundBody/70">
                          {item}
                        </li>
                      ))}
                  </ul>
                  <ul className="[&>*:not(:last-child)]:mb-1">
                    {(service.features ?? []).slice(Math.ceil((service.features ?? []).length / 2)).map((item, idx) => (
                      <li
                        key={`second-${service.service_id}-${item}`}
                        className="list-disc text-[17px] leading-[1.5] tracking-[0.36px] text-secondary/70 dark:text-backgroundBody/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RevealWrapper>
      <RevealWrapper as="ul" className="reveal-me mt-14 flex justify-center">
        <li className="max-md:w-full">
          <Link
            href={buttonUrl}
            className="rv-button rv-button-primary block w-full text-center md:inline-block md:w-auto">
            <div className="rv-button-top">
              <span>{button}</span>
            </div>
            <div className="rv-button-bottom">
              <span>{button}</span>
            </div>
          </Link>
        </li>
      </RevealWrapper>
    </section>
  )
}

export default AwardsV2
