'use client'

import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import Image from 'next/image'

const dummyTeamData = [
  {
    name: 'One Team. All Your Needs.',
    designation: 'No more juggling freelancers or chasing updates.',
    image: '/images/icons/company/company-1.svg',
  },
  {
    name: 'Creative Management Built In',
    designation: ' We handle quality control, deadlines, and feedback loops.',
    image: '/images/icons/company/company-2.svg',
  },
  {
    name: 'Scalable & Flexible.',
    designation: 'Get one-off projects or ongoing support — whatever fits your workflow.',
    image: '/images/icons/company/company-1.svg',
  },
  {
    name: 'White-Label Ready',
    designation: 'Perfect for agencies and resellers who need a silent, reliable partner.',
    image: '/images/icons/company/company-1.svg',
  },
  {
    name: 'Results-Driven Approach',
    designation: 'We design with purpose — every logo, website, or campaign is built to achieve your business goals.',
    image: '/images/icons/company/company-1.svg',
  },
]

const WhyChooseUsV6 = () => {
  // Row pattern: 3 cards, then 2, then 3 again...
  const rowPattern = [3, 2, 3]
  let patternIndex = 0
  let count = 0
  let currentRowCount = rowPattern[patternIndex]

  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center justify-center gap-x-10 gap-y-4 lg:mb-24">
          <div className="mb-8 text-center md:mb-20">
            <h1 className="mb-4 mt-3.5 font-[400]">
              Why Work <span className="font-instrument italic text-[#F54BB4]">with us</span>
            </h1>
            <h2 className="text-appear mx-auto max-w-[770px] font-[450] md:mb-8 md:text-[28px] md:leading-[1.3] lg:text-[35px] lg:leading-[1.3]">
              We exist so you can focus on your vision: while we handle the creative execution
            </h2>
          </div>

          {/* <div className="w-full md:w-[40%] md:max-w-72 md:self-end lg:max-w-[470px]">
            <RevealWrapper className="mt-5 justify-self-end max-md:w-full md:mt-10">
              <li className="mx-auto block w-full text-center md:inline-block md:w-auto">
                <Link href="/contact" className="rv-button rv-button-primary block md:inline-block">
                  <div className="rv-button-top">
                    <span>Get in Touch</span>
                  </div>
                  <div className="rv-button-bottom">
                    <span>Get in Touch</span>
                  </div>
                </Link>
              </li>
            </RevealWrapper>
          </div> */}
        </div>

        {/* Cards Layout */}
        <div className="-mx-[15px] flex flex-wrap">
          {dummyTeamData.map((member, index) => {
            const widthClass = {
              3: 'lg:w-1/3',
              2: 'lg:w-1/2',
            }[currentRowCount]

            const cardElement = (
              <div key={index} className={`w-full ${widthClass} mb-[30px] px-[15px]`}>
                <RevealWrapper className="flex h-full flex-col border border-[#F54BB4] px-[30px] py-20 dark:border-[#F54BB4] dark:border-dark">
                  <div className="mb-5 h-14 w-14">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={166}
                      height={166}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h5 className="mb-2.5 mt-5 font-medium lg:text-[28px]">{member.name}</h5>
                  <p className="text-base leading-[1.6]">{member.designation}</p>
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
