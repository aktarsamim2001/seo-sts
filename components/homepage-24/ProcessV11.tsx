import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'

const processSteps = [
  {
    step: 'Step 01',
    title: 'Consultation',
    description: 'Understanding your business needs',
  },
  {
    step: 'Step 02',
    title: 'Development',
    description: 'Custom solutions tailored for you',
  },
  {
    step: 'Step 03',
    title: 'Implementation',
    description: 'Hands-on execution support',
  },
  {
    step: 'Step 04',
    title: 'Optimization',
    description: 'Continuous monitoring & improvement',
  },
]

const ProcessV11 = () => {
  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container">
        <div className="mb-10 text-center md:mb-20">
          <TextAppearAnimation>
            <h2 className="text-appear mb-3">
              Our
              <i className="font-instrument"> process </i>
            </h2>
          </TextAppearAnimation>
        </div>

        <div className="flex justify-center gap-[30px] max-xl:flex-wrap">
          {processSteps.map(({ step, title, description }) => (
            <RevealWrapper key={step} className="reveal-me w-full grow pt-6 sm:w-[48%] xl:grow">
              <div className="relative mx-auto grid min-h-[300px] grid-cols-1 content-between border px-5 pb-[42px] pt-10 text-center dark:border-dark">
                <div className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center justify-center rounded-[72px] bg-secondary px-4 pb-2 pt-2.5 dark:bg-backgroundBody">
                  <span className="text-xs uppercase leading-[1.2] tracking-[0.96px] text-backgroundBody dark:text-secondary">
                    {step}
                  </span>
                </div>
                <h6 className="text-2xl font-normal leading-[1.1] text-black dark:text-white">{title}</h6>
                <p className="text-base font-normal leading-[1.3] text-black/70 dark:text-backgroundBody/70">
                  {description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper as="ul" className="reveal-me mt-7 justify-self-center max-md:w-full md:mt-14">
          <li className="mx-auto block w-full text-center md:inline-block md:w-auto">
            <Link href="/contact" className="rv-button rv-button-primary block md:inline-block">
              <div className="rv-button-top">
                <span>Start Your Journey</span>
              </div>
              <div className="rv-button-bottom text-nowrap">
                <span>Start Your Journey</span>
              </div>
            </Link>
          </li>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default ProcessV11
