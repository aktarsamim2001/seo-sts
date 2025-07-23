import ContactForm from '@/components/shared/ContactForm'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { FC } from 'react'
import RevealWrapper from '../animation/RevealWrapper'
import CtaImageSlider from './CtaImageSlider'

interface CTAProps {
  title: string
  subtitle: string
  button: string
  buttonUrl: string
  headingClass?: string
}

const CTA: FC<CTAProps> = ({ title, subtitle, button, buttonUrl, headingClass = '' }) => {
  return (
    <section className="relative pb-[70px] pt-14 md:pt-16 lg:pb-[140px] lg:pt-[88px] xl:pt-[100px]">
      <div className="container">
        <RevealWrapper>
          <h2
            className={cn(
              'text-center font-normal xl:text-[96px] xl:leading-[1.1] xl:tracking-[-2.88px]',
              headingClass,
            )}>
            {title}
            <span className="block font-instrument italic text-[#F54BB4] max-md:inline-block sm:mt-10">{subtitle}</span>
          </h2>
        </RevealWrapper>
        <RevealWrapper as="ul" className="mt-14 flex list-none items-center justify-center">
          <li className="mx-auto block w-full text-center md:inline-block md:w-auto">
            <Link href={buttonUrl || '/contact'} className="rv-button rv-button-primary block md:inline-block">
              <div className="rv-button-top">
                <span>{button}</span>
              </div>
              <div className="rv-button-bottom">
                <span className="whitespace-nowrap">{button}</span>
              </div>
            </Link>
          </li>
        </RevealWrapper>
        {/* {form && <ContactForm budgets={enquiryData.form_budgets} interests={enquiryData.form_interests} />} */}
      </div>
    </section>
  )
}

export default CTA
