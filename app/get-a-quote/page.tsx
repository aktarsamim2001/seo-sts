'use client'

import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetQuotePage } from '@/store/slice/quotePageSlice'
import { submitEnquiry, resetEnquiry } from '../../store/slice/enquirySlice'
import RevealWrapper from '../../components/animation/RevealWrapper'
import PageHero from '../../components/shared/PageHero'
import LayoutOne from '../..//components/shared/LayoutOne'
import type { RootState, AppDispatch } from '@/store/store'

const Page = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { page_content } = useSelector((state: RootState) => state.getQuotePage)

  useEffect(() => {
    dispatch(fetchGetQuotePage('get-a-quote'))
  }, [dispatch])

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    description: '',
    timeline: '',
    budget: '',
    message: '',
    otherMessage: '',
  })
  const enquiry = useSelector((state: any) => state.enquiry)

  // Show error toast
  useEffect(() => {
    if (enquiry.error) {
      toast.error(enquiry.error)
    }
  }, [enquiry.error])

  // Show thank you message toast and reset form
  useEffect(() => {
    if (enquiry.thankYouMessage) {
      // Prefer API message if available
      toast.success(enquiry.response?.message || enquiry.thankYouMessage)
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        description: '',
        timeline: '',
        budget: '',
        message: '',
        otherMessage: '',
      })
    }
  }, [enquiry.thankYouMessage, enquiry.response?.message])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Find service_id from service_options
    let service_id = 1
    if (page_content?.form_options?.service_options) {
      const found = page_content.form_options.service_options.find((opt: any) => opt.title === formData.service)
      if (found) service_id = found.service_id
    }
    dispatch(
      submitEnquiry({
        service_id,
        name: formData.name,
        company: formData.company,
        email: formData.email,
        mobile: formData.phone,
        timeline: formData.timeline,
        budget: formData.budget,
        about_project: formData.description,
        additional_message: formData.otherMessage,
      }),
    )
  }

  // Reset enquiry message on unmount
  useEffect(() => {
    return () => {
      dispatch(resetEnquiry())
    }
  }, [dispatch])

  return (
    <LayoutOne>
      <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
        <PageHero
          title={page_content?.banner?.title || 'Happy to Assist You'}
          badgeTitle={page_content?.banner?.sub_title || 'Get a Quote'}
          description={
            page_content?.banner?.content ||
            'Discover our innovative, cutting-edge no-code websites, crafted to effortlessly captivate and engage your visitors.'
          }
          scale
          spacing="pt-[130px] md:pt-[180px] pb-20 sm:pb-32 md:pb-36 lg:pb-36 xl:pb-[100px] relative overflow-hidden"
        />
        <div className="container">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <RevealWrapper
            as="form"
            onSubmit={handleSubmit}
            className="reveal-me mx-auto grid max-w-[800px] grid-cols-1 gap-[30px] md:grid-cols-2">
            {/* Show response message as toast handled in useEffect, not inline */}
            {/* Full Name */}
            <div className="md:col-span-full">
              <label
                htmlFor="name"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark"
                required
              />
            </div>

            {/* Phone (Optional) */}
            <div>
              <label
                htmlFor="phone"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark"
              />
            </div>

            {/* Services Looking for */}
            <div className="relative">
              <label
                htmlFor="service"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                Services Looking for
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="mt-3 w-full appearance-none text-ellipsis border bg-backgroundBody px-5 py-4 indent-px text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark"
                required>
                <option value="">Select a service</option>
                {page_content?.form_options?.service_options?.map((option: any) => (
                  <option key={option.service_id} value={option.title}>
                    {option.title}
                  </option>
                ))}
              </select>
              <span className="absolute right-5 top-1/2 translate-y-1/3">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="#F54BB4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* How soon you want? */}
            <div className="relative">
              <label
                htmlFor="timeline"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                How soon you want?
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="mt-3 w-full appearance-none text-ellipsis border bg-backgroundBody px-5 py-4 indent-px text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark"
                required>
                <option value="">Select timeline</option>
                {page_content?.form_options?.service_time_options?.map((option: string, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="absolute right-5 top-1/2 translate-y-1/3">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="#F54BB4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* Budget */}
            <div className="relative">
              <label
                htmlFor="budget"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                Budget (if any)
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="mt-3 w-full appearance-none text-ellipsis border bg-backgroundBody px-5 py-4 indent-px text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark">
                <option value="">Select budget</option>
                {page_content?.form_options?.budget_options?.map((option: string, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="absolute right-5 top-1/2 translate-y-1/3">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="#F54BB4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* About the project description */}
            <div className="md:col-span-full">
              <label
                htmlFor="description"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                About the project description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project goals and timeline"
                className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark"
                required></textarea>
            </div>

            {/* Any other message (optional) */}
            <div className="md:col-span-full">
              <label
                htmlFor="otherMessage"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                Any other message (optional)
              </label>
              <textarea
                id="otherMessage"
                name="otherMessage"
                value={formData.otherMessage}
                onChange={handleChange}
                placeholder="Any additional notes?"
                className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark"></textarea>
            </div>

            {/* Submit */}
            <div className="col-span-full sm:mt-14 md:mx-auto">
              <button
                type="submit"
                className="rv-button rv-button-primary block w-full md:inline-block md:w-auto"
                disabled={enquiry.loading}>
                <div className="rv-button-top">
                  <span>{enquiry.loading ? 'Sending...' : 'Send Message'}</span>
                </div>
                <div className="rv-button-bottom">
                  <span className="text-nowrap">{enquiry.loading ? 'Sending...' : 'Send Message'}</span>
                </div>
              </button>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </LayoutOne>
  )
}

export default Page
