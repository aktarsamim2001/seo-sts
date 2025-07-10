import ContactForm from '@/components/contactpage/ContactForm'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import Link from 'next/link'
import Image from 'next/image'
import RevealWrapper from '@/components/animation/RevealWrapper'
import TextAppearAnimation from '@/components/animation/TextAppearAnimation'
import ClientsV3 from '@/components/shared/ClientsV3'

export const metadata = {
  title: 'Contact',
}

const ContactPage = () => {
  return (
    <LayoutOne>
      <div className="container relative overflow-hidden py-32 md:py-40 lg:py-[185px]">
        <div className="mb-10 flex flex-col items-start justify-center gap-x-10 gap-y-6 sm:items-center md:mb-20 md:flex-row lg:justify-start">
          <div className="flex-1">
            <RevealWrapper className="rv-badge mb-3 md:mb-4">
              <span className="rv-badge-text">Contact Us</span>
            </RevealWrapper>
            <TextAppearAnimation>
              <h2 className="text-appear">
                Elevating Your <br />
                <span className="font-instrument italic !text-[#F54BB4]">Digital Presence</span>
              </h2>
            </TextAppearAnimation>
          </div>
          <div className="flex-1 max-md:w-full">
            <TextAppearAnimation>
              <p className="text-appear max-w-lg max-md:text-justify md:place-self-end md:text-right">
                We offer expert digital solutions to boost your brand and online presence. Our services drive growth,
                engagement, and success in the digital world.
              </p>
            </TextAppearAnimation>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-2">
          {/* ✅ STATIC CARD 1 */}
          <RevealWrapper className="group border border-[#F54BB4] px-6 py-9 lg:px-[30px] lg:py-[25px]">
            <Link href="/marketing/services/static-service-1">
              <h5 className="mb-2 mt-4 lg:mb-3 lg:mt-6">Address</h5>
              <p className="">2261 Market Street #5039 San Francisco, CA 94114</p>
            </Link>
          </RevealWrapper>

          {/* ✅ STATIC CARD 2 */}
          <RevealWrapper className="group border border-[#F54BB4] px-6 py-9 lg:px-[30px] lg:py-[25px]">
            <Link href="/marketing/services/static-service-2">
              <h5 className="mb-2 mt-4 lg:mb-3 lg:mt-6">Reach Us</h5>
              <p className="">
                Email - jtndumbe@smarttaskstudios.com <br />
                Phone - +1 240 4378 462
              </p>
            </Link>
          </RevealWrapper>
        </div>
      </div>

      <ClientsV3 />
      <PageHero
        title="Happy to Assist You"
        badgeTitle="Contact"
        description="Discover our innovative, cutting-edge no-code websites, crafted to effortlessly captivate and engage your visitors."
        scale
        spacing="pt-[130px] md:pt-[180px] pb-20 sm:pb-32 md:pb-36 lg:pb-36 xl:pb-[100px] relative overflow-hidden"
      />

      <ContactForm />

      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: '1', img: '/images/agent/09.webp' },
            { id: '2', img: '/images/agent/17.webp' },
            { id: '3', img: '/images/agent/18.webp' },
          ]}
        />
        with us.
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          A virtual coffee?
        </i>
      </CTA>
    </LayoutOne>
  )
}

export default ContactPage
