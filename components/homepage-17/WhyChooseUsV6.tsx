'use client'

import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import Image from 'next/image'

const WhyChooseUsV6 = ({ whyChooseUs }: any) => {
  if (!whyChooseUs) return null

  // Row pattern: 3 cards, then 2, then 3 again...
  const rowPattern = [3, 2, 3]

  let patternIndex = 0
  let count = 0
  let currentRowCount = rowPattern[patternIndex]

  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-center gap-x-10 gap-y-4 md:flex-row lg:mb-24 lg:justify-between">
          <div className="mb-8 text-center md:mb-20">
            <h1 className="mb-4 mt-3.5 font-[400]">
              {whyChooseUs?.title}{' '}
              <span className="font-instrument italic text-[#F54BB4]">{whyChooseUs?.sub_title_one}</span>
            </h1>
            <h2 className="text-appear mx-auto max-w-[770px] font-[450] md:mb-8 md:text-[28px] md:leading-[1.3] lg:text-[35px] lg:leading-[1.3]">
              {whyChooseUs?.section_content}
            </h2>
            {whyChooseUs?.button && (
              <RevealWrapper className="mt-5 flex w-full justify-center md:mt-10">
                <li className="block w-full text-center md:inline-block md:w-auto">
                  <Link href="/contact" className="rv-button rv-button-primary block md:inline-block">
                    <div className="rv-button-top">
                      <span>{whyChooseUs?.button}</span>
                    </div>
                    <div className="rv-button-bottom">
                      <span>{whyChooseUs?.button}</span>
                    </div>
                  </Link>
                </li>
              </RevealWrapper>
            )}
          </div>
          {/* <TextAppearAnimation>
              <p className="text-appear max-w-lg md:place-self-end md:text-right">{whyChooseUs?.section_content}</p>
            </TextAppearAnimation> */}
        </div>

        {/* Cards Layout */}
        <div className="-mx-[15px] flex flex-wrap">
          {whyChooseUs?.data?.map((card: any, index: number) => {
            // Determine how many items in current row
            const widthClass = {
              3: 'lg:w-1/3',
              2: 'lg:w-1/2',
            }[currentRowCount]

            const cardElement = (
              <div key={index} className={`w-full ${widthClass} mb-[30px] px-[15px]`}>
                <RevealWrapper className="flex h-full flex-col border border-[#F54BB4] px-[30px] py-20 dark:border-[#F54BB4] dark:border-dark">
                  <div className="mb-5 h-14 w-14">
                    {card?.icon ? (
                      <Image src={card.icon} alt={card.title || 'Feature icon'} width={56} height={56} />
                    ) : (
                      <div className="h-full w-full rounded bg-gray-200" />
                    )}
                  </div>
                  <h5 className="mb-2.5 mt-5 lg:text-[35px]">{card?.title || 'No title'}</h5>
                  <p className="text-base leading-[1.6]">{card?.description || 'No description available'}</p>
                </RevealWrapper>
              </div>
            )

            count++
            if (count >= currentRowCount) {
              patternIndex = (patternIndex + 1) % rowPattern.length
              currentRowCount = rowPattern[patternIndex]
              count = 0
            }

            return cardElement
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsV6
