'use client'

import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import Image from 'next/image'

type WhyChooseUsV6Props = {
  title_one?: string
  title_two?: string
  content?: string
  data: {
    title: string
    content: string
    feature_image: string
  }[]
}

const OurVision = ({ title_one, title_two, content, data }: WhyChooseUsV6Props) => {
  const rowPattern = [3, 2, 3]
  let patternIndex = 0
  let count = 0
  let currentRowCount = rowPattern[patternIndex]

  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-x-10 gap-y-4">
          <div className="mb-8 text-center md:mb-20">
            <h1 className="mb-4 mt-3.5 font-[400]">
              {title_one} <span className="font-instrument italic text-[#F54BB4]">{title_two}</span>
            </h1>
            <h2 className="text-appear mx-auto max-w-[770px] font-[450] md:text-[28px] md:leading-[1.3] lg:text-[35px] lg:leading-[1.3]">
              {content}
            </h2>
          </div>
        </div>

        <div className="-mx-[15px] flex flex-wrap">
          {data.map((item, index) => {
            const widthClass = {
              3: 'lg:w-1/3',
              2: 'lg:w-1/2',
            }[currentRowCount]

            const cardElement = (
              <div key={index} className={`w-full ${widthClass} mb-[30px] px-[15px]`}>
                <div className="flex h-full flex-col border border-[#F54BB4] px-[30px] py-20 dark:border-[#F54BB4] dark:border-dark">
                  <div className="mb-5 h-14 w-14">
                    <Image
                      src={item.feature_image || '/images/default-icon.svg'}
                      alt={item.title}
                      width={166}
                      height={166}
                      className="rounded-full object-contain"
                    />
                  </div>
                  <h5 className="mb-2.5 mt-5 font-medium lg:text-[28px]">{item.title}</h5>
                  <p className="text-base leading-[1.6]">{item.content}</p>
                </div>
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

export default OurVision
