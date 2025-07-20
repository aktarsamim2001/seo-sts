'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContactPage } from '@/store/slice/contactSlice'

import ContactForm from '@/components/contactpage/ContactForm'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import Link from 'next/link'
import RevealWrapper from '@/components/animation/RevealWrapper'
import TextAppearAnimation from '@/components/animation/TextAppearAnimation'
import ClientsV3 from '@/components/shared/ClientsV3'

const ContactPage = () => {
  const dispatch = useDispatch()
  const { page_content, status, error } = useSelector((state) => state?.contactPage)

  useEffect(() => {
    dispatch(fetchContactPage({ slug: 'contact-us' }))
  }, [dispatch])

  const { banner, contact_data, enquiry_data } = page_content

  console.log('Contact Page details:', page_content)

  return (
    <LayoutOne>
      {/* Hero Section */}
      <div className="container relative overflow-hidden py-32 md:py-40 lg:py-[185px]">
        <div className="mb-10 flex flex-col items-start justify-center gap-x-10 gap-y-6 sm:items-center md:mb-20 md:flex-row lg:justify-start">
          <div className="flex-1">
            <RevealWrapper className="rv-badge mb-3 md:mb-4">
              <span className="rv-badge-text">{page_content?.banner?.title}</span>
            </RevealWrapper>
            {page_content?.banner?.sub_title_one && page_content?.banner?.sub_title_two && (
              <TextAppearAnimation>
                <h2 className="text-appear" key={page_content.banner.sub_title_one + page_content.banner.sub_title_two}>
                  {page_content.banner.sub_title_one} <br />
                  <span className="font-instrument italic !text-[#F54BB4]">{page_content.banner.sub_title_two}</span>
                </h2>
              </TextAppearAnimation>
            )}
          </div>
          <div className="flex-1 max-md:w-full">
            <TextAppearAnimation>
              <p className="text-appear max-w-lg max-md:text-justify md:place-self-end md:text-right">
                {page_content?.banner?.content}
              </p>
            </TextAppearAnimation>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid w-full grid-cols-1 gap-[30px] md:grid-cols-2">
          {/* Dynamic Card 1: Address */}
          <RevealWrapper className="group border border-[#F54BB4] px-6 py-9 lg:px-[30px] lg:py-[25px]">
            <Link href="#">
              <h5 className="mb-2 mt-4 lg:mb-3 lg:mt-6">Address</h5>
              <p>{page_content?.contact_data?.address}</p>
            </Link>
          </RevealWrapper>

          {/* Dynamic Card 2: Contact Info */}
          <RevealWrapper className="group border border-[#F54BB4] px-6 py-9 lg:px-[30px] lg:py-[25px]">
            <Link href="#">
              <h5 className="mb-2 mt-4 lg:mb-3 lg:mt-6">Reach Us</h5>
              <p>
                Email - {page_content?.contact_data?.support_email} <br />
                Phone - {page_content?.contact_data?.support_number}
              </p>
            </Link>
          </RevealWrapper>
        </div>
      </div>

      {/* Clients */}
      <ClientsV3 moveText={contact_data?.moving_texts} />

      {/* Enquiry Hero */}
      <PageHero
        title={page_content?.enquiry_data?.subtitle}
        badgeTitle={page_content?.enquiry_data?.title}
        description={page_content?.enquiry_data?.content}
        scale
        spacing="pt-[130px] md:pt-[180px] pb-20 sm:pb-32 md:pb-36 lg:pb-36 xl:pb-[100px] relative overflow-hidden"
      />

      {/* Contact Form */}
      <ContactForm />
    </LayoutOne>
  )
}

export default ContactPage
