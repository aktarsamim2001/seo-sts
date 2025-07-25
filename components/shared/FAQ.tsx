'use client'

import gradientBg from '@/public/images/gradient-bg.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import RevealWrapper from '../animation/RevealWrapper'

interface FaqItem {
  question: string
  answer: string
}

interface FaqContent {
  title_one?: string
  title_two?: string
  button?: string
  button_url?: string
  faq_data?: FaqItem[]
}

interface FaqProps {
  faqs: FaqContent | FaqItem[] // Allow both formats
  bigTitleWithBadge?: boolean
  titleChange?: boolean // For service details page
}

const FAQ = ({ faqs, bigTitleWithBadge, titleChange }: FaqProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Handle different data formats
  let data: FaqItem[] = []
  let title_one = 'Frequently Asked'
  let title_two = 'Questions'
  let button = "Let's Start"
  let button_url = '/get-a-quote'

  if (Array.isArray(faqs)) {
    data = faqs
    if (titleChange) {
      title_one = 'Frequently Asked'
      title_two = 'Questions'
    }
  } else if (faqs && typeof faqs === 'object') {
    data = faqs.faq_data ?? []
    title_one = faqs.title_one ?? 'Frequently Asked'
    title_two = faqs.title_two ?? 'Questions'
    button = faqs.button ?? "Let's Start"
    button_url = faqs.button_url ?? '/get-a-quote'
  }

  // Return null if no data
  if (!data || data.length === 0) {
    return null
  }

  // Helper to render answer as numbered list if it contains numbered points
  const renderAnswer = (answer?: string) => {
    if (!answer) return null

    // Check if answer contains HTML tags
    if (answer.includes('<') && answer.includes('>')) {
      return (
        <div
          className="faq-body-transition duration-[500ms] max-md:px-5 max-md:text-base md:px-10"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )
    }

    // Regex to match lines starting with number-dot-space (e.g., 1. )
    const numberedLines = answer.match(/^(\d+)\.\s+/m)
    if (numberedLines) {
      // Split by lines, filter those starting with number-dot-space
      const lines = answer.split(/\n/).filter((line) => /^\d+\.\s+/.test(line))
      // If at least 2 numbered lines, render as list
      if (lines.length >= 2) {
        return (
          <ol className="faq-body-transition list-inside list-decimal space-y-1 duration-[500ms] max-md:px-5 max-md:text-base md:px-10">
            {lines.map((line, idx) => (
              <li key={idx}>{line.replace(/^\d+\.\s+/, '')}</li>
            ))}
          </ol>
        )
      }
    }
    // Otherwise, render as paragraph (with line breaks)
    return (
      <p className="faq-body-transition whitespace-pre-line duration-[500ms] max-md:px-5 max-md:text-base md:px-10">
        {answer}
      </p>
    )
  }

  return (
    <section
      className={`relative overflow-hidden pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px] ${
        bigTitleWithBadge ? 'pt-28 sm:pt-32 xl:pt-32' : 'pt-14 md:pt-16 lg:pt-[88px] xl:pt-[100px]'
      }`}>
      <div className="absolute left-1/2 top-1/2 -z-30 -translate-x-1/2 -translate-y-1/2 scale-x-[2.8] scale-y-[3.4] sm:scale-y-[1.6] md:scale-x-[1.9] md:scale-y-[1.5] lg:scale-x-[1.7] lg:scale-y-[1.5] xl:scale-y-[1.4] 2xl:scale-y-[1]">
        <Image src={gradientBg} alt="gradient-bg" />
      </div>

      <div className="container">
        <div className="mb-8 text-center md:mb-16">
          <h2 className="text-appear mb-3">
            {title_one} <br />
            <span className="font-instrument italic text-[#F54BB4]">{title_two}</span>
          </h2>
        </div>

        <RevealWrapper className="mx-auto w-full max-w-[900px] [&>*:not(:last-child)]:mb-6">
          {data.map((item, index) => (
            <div
              key={index}
              className={`faq-body-transition overflow-hidden border bg-backgroundBody duration-[400ms] dark:bg-dark ${
                activeIndex === index ? 'pb-10' : 'pb-0'
              }`}
              style={{
                borderColor: activeIndex === index ? 'black' : 'transparent',
              }}>
              <div
                className={`relative cursor-pointer py-5 max-md:px-5 md:px-10 md:py-[35px] ${
                  activeIndex === index ? 'open active' : ''
                }`}
                onClick={() => toggleAccordion(index)}>
                <h3 className="text-xl font-normal max-lg:pr-[33px] sm:text-[23px] sm:font-medium md:text-[25px] md:leading-[25.2px] md:tracking-wide">
                  {item.question}
                </h3>
                <div
                  className={`accordion-header-icon transition-transform duration-[400ms] ${
                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}></div>
              </div>

              <div
                className={`grid transition-all duration-[400ms] ease-in-out ${
                  activeIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}>
                <div className="overflow-hidden">{renderAnswer(item.answer)}</div>
              </div>
            </div>
          ))}
        </RevealWrapper>

        <RevealWrapper as="ul" className="mx-auto mt-[56px] flex list-none justify-center">
          {button && (
            <li className="mx-auto block w-[90%] text-center md:inline-block md:w-auto">
              <Link href={button_url} className="rv-button rv-button-sm rv-button-primary block md:inline-block">
                <div className="rv-button-top">
                  <span>{button}</span>
                </div>
                <div className="rv-button-bottom">
                  <span className="text-nowrap">{button}</span>
                </div>
              </Link>
            </li>
          )}
        </RevealWrapper>
      </div>
    </section>
  )
}

export default FAQ
