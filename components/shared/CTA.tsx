import ContactForm from '@/components/shared/ContactForm'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { FC } from 'react'
import RevealWrapper from '../animation/RevealWrapper'
import CtaImageSlider from './CtaImageSlider'

interface EnquiryData {
  button: string
  button_url: string
  form_budgets?: string[]
  form_interests?: string[]
  title_images: string[]
  title_one: string
  title_two: string
  title_three: string
}

interface CTAProps {
  enquiryData: EnquiryData
  headingClass?: string
}

const CTA: FC<CTAProps> = ({ enquiryData, headingClass = '', form = true }) => {
  return (
    <section className="relative pb-[70px] pt-14 md:pt-16 lg:pb-[140px] lg:pt-[88px] xl:pt-[100px]">
      <div className="container">
        <RevealWrapper>
          <h2
            className={cn(
              'text-center font-normal xl:text-[96px] xl:leading-[1.1] xl:tracking-[-2.88px]',
              headingClass,
            )}>
            {enquiryData.title_one}
            <CtaImageSlider
              slides={enquiryData.title_images.map((img, index) => ({
                id: String(index + 1),
                img: img,
              }))}
            />
            {enquiryData.title_two}
            <span className="block font-instrument italic text-[#F54BB4] max-md:inline-block sm:mt-10">
              {enquiryData.title_three}
            </span>
          </h2>
        </RevealWrapper>
        <RevealWrapper as="ul" className="mt-14 flex list-none items-center justify-center">
          <li className="mx-auto block w-full text-center md:inline-block md:w-auto">
            <Link
              href={enquiryData.button_url || '/contact'}
              className="rv-button rv-button-primary block md:inline-block">
              <div className="rv-button-top">
                <span>{enquiryData.button}</span>
              </div>
              <div className="rv-button-bottom">
                <span className="whitespace-nowrap">{enquiryData.button}</span>
              </div>
            </Link>
          </li>
        </RevealWrapper>
        {form && <ContactForm budgets={enquiryData.form_budgets} interests={enquiryData.form_interests} />}
      </div>
    </section>
  )
}

export default CTA
