import processImg from '@/public/images/process-img-01.webp'
import Image from 'next/image'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import Link from 'next/link'

const ProcessV4 = ({ title, italicTitle, subtitle, featureImage, processSteps }: any) => {
  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <div className="mb-8 text-center md:mb-20">
          <h1 className="mb-4 mt-3.5 font-[400]">
            {title} <span className="font-instrument italic text-[#F54BB4]">{italicTitle}</span>
          </h1>
          <h2 className="text-appear mx-auto max-w-[770px] font-[450] md:mb-8 md:text-[28px] md:leading-[1.3] lg:text-[35px] lg:leading-[1.3]">
            {subtitle}
          </h2>
        </div>
        <RevealWrapper className="relative flex flex-col gap-20 md:flex-row">
          <div className="flex flex-col items-center">
            <figure>
              <Image src={processImg} alt="Process Images" />
            </figure>
            <button className="absolute -bottom-20 left-0 md:bottom-56 md:left-40">
              <Link
                href="/get-a-quote"
                className="rv-button rv-button-primary block w-full text-center md:inline-block md:w-auto">
                <div className="rv-button-top">
                  <span>Get Started</span>
                </div>
                <div className="rv-button-bottom">
                  <span>Get Started</span>
                </div>
              </Link>
            </button>
          </div>

          <div>
            <ul className="relative space-y-10 border-secondary dark:border-backgroundBody md:border-l lg:space-y-28 xl:space-y-[170px]">
              <li className="max-w-max px-10">
                <div className="absolute left-0 flex items-center justify-center rounded-full border-backgroundBody bg-[#53B9FF] px-3.5 py-5 text-lg font-bold text-white dark:border-[#151515] md:-left-11 md:border-[18px] lg:-left-[52px] lg:px-6 lg:py-8">
                  <span className="inline-block text-xl font-semibold text-white">01</span>
                </div>
                <div className="ml-[30px]">
                  <h3 className="">Book a Call</h3>
                  <p className="mt-5 max-w-[483px]">
                    Choose a date and time to book a discovery session, during which we’ll define the project
                    objectives, timeline, and budget.
                  </p>
                </div>
              </li>
              <li className="max-w-max px-10">
                <div className="absolute left-0 flex items-center justify-center rounded-full border-backgroundBody bg-[#F54BB4] px-3.5 py-5 text-lg font-bold text-white dark:border-[#151515] md:-left-11 md:border-[18px] lg:-left-[54px] lg:px-6 lg:py-8">
                  <span className="inline-block text-xl font-semibold text-white">02</span>
                </div>
                <div className="ml-[30px]">
                  <h3 className="">Receive an Offer</h3>
                  <p className="mt-5 max-w-[483px]">
                    We’ll send you a bespoke project proposal including deliverables, project roadmap, and a quote in
                    1-2 business days.
                  </p>
                </div>
              </li>
              <li className="max-w-max px-10">
                <div className="absolute left-0 flex items-center justify-center rounded-full border-backgroundBody bg-[#9BCB4B] px-3.5 py-5 text-lg font-bold text-white dark:border-[#151515] md:-left-11 md:border-[18px] lg:-left-[54px] lg:px-6 lg:py-8">
                  <span className="inline-block text-xl font-semibold text-white">03</span>
                </div>
                <div className="ml-[30px]">
                  <h3 className="">Kickoff the Project</h3>
                  <p className="mt-5 max-w-[483px]">
                    Sign the contract, send the deposit, lean back, and let us do our thing. We’ll invite you to a
                    design review meeting in 5-7 business days.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default ProcessV4
