'use client'

import { FC, useState } from 'react'
import RevealWrapper from '../animation/RevealWrapper'
import SectionHeader from './SectionHeader'

interface FaqItem {
  id: number
  question: string
  answer: string
}

interface FaqsData {
  data: FaqItem[]
  title_one: string
  title_two: string
  section_content: string
}

interface PropsType {
  titleChange?: boolean
  faqs: FaqsData
}

const FaqV2: FC<PropsType> = ({ titleChange = false, faqs }) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  const faqData = faqs?.data

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prevActive) => (prevActive === id ? null : id))
  }

  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-center gap-x-10 gap-y-4 md:mb-20 md:flex-row md:items-end lg:justify-between">
          <SectionHeader
            titleOne={faqs?.title_one}
            titleTwo={faqs?.title_two}
            headingTitle="Asked Us"
            titleChange={titleChange}
            italicTitle="People"
            description={faqs?.section_content}
          />
        </div>

        <div className="mx-auto grid w-full grid-cols-1 items-start gap-7 md:grid-cols-2 lg:grid-cols-3">
          {faqData?.map((faq, i) => (
            <RevealWrapper key={i} className="reveal-me">
              <div
                className={`accordion-itemV4 faq-body-transition relative w-full space-y-6 border border-[#F54BB4] bg-backgroundBody px-6 pb-8 pt-6 duration-300 dark:border-[#F54BB4] ${
                  activeAccordion === faq?.question
                    ? 'open active border-[#F54BB4] dark:border-[#F54BB4]'
                    : 'h-[200px] border-black/10 dark:border-white/10'
                } dark:bg-dark md:px-10 md:pb-[60px] md:pt-10 lg:max-w-[370px]`}
                data-active={activeAccordion === faq?.question ? true : false}>
                <div
                  className="accordion-headerV4 flex cursor-pointer items-center justify-between"
                  onClick={() => toggleAccordion(faq?.question)}>
                  <h3 className="text-[23px] font-normal tracking-normal md:text-[25px] md:leading-[34.2px]">
                    {faq?.question}
                  </h3>
                  <div
                    className={`accordion-header-iconV4 transition-transform duration-[400ms] dark:border-dark ${
                      activeAccordion === faq?.question ? 'open active rotate-180' : ''
                    }`}
                  />
                </div>

                <div
                  className={`grid transition-all duration-[400ms] ease-in-out ${
                    activeAccordion === faq?.question ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}>
                  <div className="overflow-hidden">
                    <div className={`accordion-bodyV4 transition-transform duration-[400] ease-in-out`}>
                      <p className="font-[375]">{faq?.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqV2
