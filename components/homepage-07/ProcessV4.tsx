import processImg from '@/public/images/process-img-01.webp'
import Image from 'next/image'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import Link from 'next/link'

const ProcessV4 = ({ titleOne, titleTwo, subtitle, featureImage, workTimeline, button, buttonUrl }: any) => {
  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <div className="mb-8 text-center md:mb-20">
          <h1 className="mb-4 mt-3.5 font-[400]">
            {titleOne} <span className="font-instrument italic text-[#F54BB4]">{titleTwo}</span>
          </h1>
          <h2 className="text-appear mx-auto max-w-[770px] font-[450] md:mb-8 md:text-[28px] md:leading-[1.3] lg:text-[35px] lg:leading-[1.3]">
            {subtitle}
          </h2>
        </div>
        <RevealWrapper className="relative flex flex-col gap-20 md:flex-row">
          <div className="flex flex-col items-center">
            {featureImage ? (
              <figure>
                <Image
                  src={featureImage}
                  alt="Process Images"
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </figure>
            ) : null}
            <button className="absolute -bottom-20 left-16 md:left-40 lg:bottom-96 xl:bottom-80">
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
            </button>
          </div>

          <div>
            <ul className="relative space-y-6 border-secondary dark:border-backgroundBody md:border-l lg:space-y-28 xl:space-y-[170px]">
              {workTimeline?.map((step: any, idx: number) => (
                <li key={idx} className="max-w-max px-10">
                  <div
                    className="absolute left-0 flex items-center justify-center rounded-full border-backgroundBody px-3.5 py-5 text-lg font-bold text-white dark:border-[#151515] md:-left-11 md:border-[18px] lg:-left-[52px] lg:px-6 lg:py-8"
                    style={{ background: step.color || '#53B9FF' }}>
                    <span className="inline-block text-xl font-semibold text-white">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="ml-[30px]">
                    <h3 className="">{step.title}</h3>
                    <p className="mt-5 max-w-[483px]">{step.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default ProcessV4
