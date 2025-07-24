// Usage example:
// If your API returns:
// testimonials: {
//   title_one: string,
//   title_two: string,
//   subtitle: string,
//   testimonials: Testimonial[]
// }
//
// In your parent component, map the API fields to the expected props:
// <TestimonialV2
//   titleOne={testimonials.title_one}
//   titleTwo={testimonials.title_two}
//   subtitle={testimonials.subtitle}
//   testimonials={testimonials.testimonials}
// />

// src/components/shared/TestimonialV2.tsx
import React from 'react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'

const TestimonialV2 = ({ titleOne = '', titleTwo = '', subtitle = '', testimonials = [] }) => {
  return (
    <section className="overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <div className="mb-8 text-center md:mb-20">
          <h1 className="mb-4 mt-3.5 font-[400]">
            {titleOne} <span className="font-instrument italic text-[#F54BB4]">{titleTwo}</span>
          </h1>
          <h2 className="text-appear mx-auto max-w-[770px] font-[450] md:mb-8 md:text-[28px] md:leading-[1.3] lg:text-[35px] lg:leading-[1.3]">
            {subtitle}
          </h2>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 z-40 h-full w-[25%] bg-gradient-to-r from-backgroundBody to-transparent dark:from-dark-gradient"></div>
        <div className="absolute right-0 top-0 z-40 h-full w-[25%] bg-gradient-to-l from-backgroundBody to-transparent dark:from-dark-gradient"></div>
        <RevealWrapper>
          <Marquee speed={60}>
            <div className="flex justify-center gap-6">
              {testimonials?.map((review, idx) => {
                let borderColor = '#F54BB4'
                if (idx % 3 === 1) borderColor = '#53B9FF'
                if (idx % 3 === 2) borderColor = '#9BCB4B'
                return (
                  <div
                    className="max-w-[388px] border p-5 first:ml-6 dark:border-backgroundBody/10 md:max-w-[408px]"
                    key={idx}
                    style={{ borderColor }}>
                    <div className="flex items-center space-x-4 pb-4">
                      <Image
                        src={review?.avatar_url}
                        alt={review?.name}
                        width={70}
                        height={70}
                        quality={100}
                        className="h-16 w-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-[22px] leading-[28.8px] tracking-wide">{review?.name}</h3>
                        <p className="mt-[2px] text-[15px] font-light leading-6">{review?.designation}</p>
                      </div>
                    </div>
                    <span className="block w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="2"
                        viewBox="0 0 362 2"
                        fill="none"
                        className="w-full">
                        <path
                          className="stroke-secondary dark:stroke-backgroundBody"
                          d="M0 0.785156H362"
                          strokeOpacity="0.1"
                          strokeDasharray="6 6"
                        />
                      </svg>
                    </span>
                    <blockquote className="py-4 text-base text-colorText dark:text-backgroundBody/70 md:text-xl md:leading-7 md:tracking-[0.4px]">
                      {review?.message}
                    </blockquote>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" height="2" viewBox="0 0 362 2" fill="none">
                        <path
                          className="stroke-secondary dark:stroke-backgroundBody"
                          d="M0 0.785156H362"
                          strokeOpacity="0.1"
                          strokeDasharray="6 6"
                        />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-1">
                        <Image width={70} height={70} src={review?.logo} alt="Logo" className="inline dark:hidden" />
                        <Image width={70} height={70} src={review?.logo} alt="Logo" className="hidden dark:inline" />
                      </div>
                      <span className="text-sm font-light leading-5 text-colorText">{review?.posted_at}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Marquee>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default TestimonialV2
