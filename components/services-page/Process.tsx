import Link from 'next/link'

// Types for Process component
export interface TimelineStep {
  title: string
  content: string
  color?: string
}

export interface ProcessStepsProps {
  title_one: string
  title_two: string
  button: string
  button_url: string
  progrress_timeline: TimelineStep[] | TimelineStep
}

import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'

const Process = ({ processSteps }: { processSteps: ProcessStepsProps }) => {
  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <div className="mb-8 text-center md:mb-16">
          <h2 className="text-appear mb-3">
            {processSteps?.title_one || ''} <br />
            <span className="font-instrument italic text-[#F54BB4]">{processSteps?.title_two || ''}</span>
          </h2>
        </div>

        <RevealWrapper className="relative after:absolute after:-z-10 after:block after:h-[1px] after:w-full after:bg-[#e5e5e5] after:content-[''] dark:after:bg-white/10 max-lg:before:absolute max-lg:before:bottom-[157px] max-lg:before:-z-10 max-lg:before:block max-lg:before:h-[1px] max-lg:before:w-full max-lg:before:bg-[#e5e5e5] max-lg:before:content-[''] dark:max-lg:before:bg-white/10 max-md:bottom-5 max-md:before:bottom-[137px] max-md:after:top-16 md:after:top-[105px]">
          <div className="grid grid-cols-1 items-center justify-between gap-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.isArray(processSteps?.progrress_timeline) ? (
              processSteps.progrress_timeline.map((step: TimelineStep, idx: number) => (
                <RevealWrapper className="text-center" key={idx}>
                  <span
                    className={`relative after:absolute after:-bottom-[37px] after:left-[50%] after:z-50 after:h-5 after:w-5 after:-translate-x-[50%] after:rounded-full after:content-[''] max-md:text-3xl md:text-[64px] md:leading-[1.2] md:tracking-[-1.92px]`}
                    style={{
                      color: step.color || '#001442',
                    }}>
                    {String(idx + 1).padStart(2, '0')}
                    <span
                      className="after:absolute after:-bottom-[37px] after:left-[50%] after:z-50 after:h-5 after:w-5 after:-translate-x-[50%] after:rounded-full after:content-['']"
                      style={{
                        position: 'absolute',
                        bottom: '-37px',
                        left: '50%',
                        zIndex: 50,
                        height: '20px',
                        width: '20px',
                        background: step.color || '#001442',
                        borderRadius: '50%',
                        transform: 'translateX(-50%)',
                        content: "''",
                      }}
                    />
                  </span>
                  <h3 className="mb-5 mt-16 max-md:text-3xl md:leading-[1.2] md:tracking-[-1.68px] md:text-[56PX]">
                    {step.title || 'Discover'}
                  </h3>
                  <p className="text-base leading-[1.4] tracking-[0.32px]">
                    {step.content ||
                      'We mostly work on a fixed-bid basis for our projects, focusing on a select few clients at a time.'}
                  </p>
                </RevealWrapper>
              ))
            ) : (
              <RevealWrapper className="text-center">
                <span className="relative text-[#001442] after:absolute after:-bottom-[37px] after:left-[50%] after:z-50 after:h-5 after:w-5 after:-translate-x-[50%] after:rounded-full after:bg-[#001442] after:content-[''] dark:text-white dark:after:bg-white max-md:text-3xl md:text-[64px] md:leading-[1.2] md:tracking-[-1.92px]">
                  01
                </span>
                <h3 className="mb-5 mt-16 max-md:text-3xl md:leading-[1.2] md:tracking-[-1.68px] md:text-[56PX]">
                  {(processSteps?.progrress_timeline as TimelineStep)?.title || 'Discover'}
                </h3>
                <p className="text-base leading-[1.4] tracking-[0.32px]">
                  {(processSteps?.progrress_timeline as TimelineStep)?.content ||
                    'We mostly work on a fixed-bid basis for our projects, focusing on a select few clients at a time.'}
                </p>
              </RevealWrapper>
            )}
          </div>
        </RevealWrapper>

        <div className="reveal-me mt-7 flex list-none items-center justify-center md:mt-14">
          <div className="mx-auto block w-full text-center md:inline-block md:w-auto">
            <Link
              href={processSteps?.button_url || '/get-a-quote'}
              className="rv-button rv-button-sm rv-button-primary block md:inline-block">
              <div className="rv-button-top">
                <span>{processSteps?.button || 'Lets Start'}</span>
              </div>
              <div className="rv-button-bottom">
                <span className="text-nowrap">{processSteps?.button || 'Lets Start'}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
