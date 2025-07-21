'use client'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '@/store/store'
import RevealWrapper from '../animation/RevealWrapper'
import { submitEnquiry, resetEnquiry } from '../../store/slice/contactEnquirySlice'

const ContactForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, thankYouMessage } = useSelector((state: any) => state.enquiry)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Prepare payload for submitEnquiry
    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
    }
    dispatch(submitEnquiry(payload))
  }

  // Optionally reset thank you message on mount/unmount
  React.useEffect(() => {
    return () => {
      dispatch(resetEnquiry())
    }
  }, [dispatch])

  React.useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  React.useEffect(() => {
    if (thankYouMessage) {
      toast.success(thankYouMessage)
      setFormData({
        name: '',
        company: '',
        email: '',
        message: '',
      })
    }
  }, [thankYouMessage])

  return (
    <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
      <div className="container">
        {/* {thankYouMessage && <div className="mb-4 rounded bg-green-100 p-4 text-green-600">{thankYouMessage}</div>}
        {error && <div className="mb-4 rounded bg-red-100 p-4 text-red-600">{error}</div>} */}
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
              className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-primary focus:outline-none dark:border-dark dark:bg-dark"
              required
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-primary focus:outline-none dark:border-dark dark:bg-dark"
            />
          </div>

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
              className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-primary focus:outline-none dark:border-dark dark:bg-dark"
              required
            />
          </div>

          <div className="md:col-span-full">
            <label
              htmlFor="message"
              className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
              Project Brief*
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project goals and timeline"
              className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-primary focus:outline-none dark:border-dark dark:bg-dark"
              required></textarea>
          </div>

          <div className="col-span-full sm:mt-14 md:mx-auto">
            <button
              type="submit"
              className="rv-button rv-button-primary block w-full md:inline-block md:w-auto"
              disabled={loading}>
              <div className="rv-button-top">
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </div>
              <div className="rv-button-bottom">
                <span className="text-nowrap">{loading ? 'Sending...' : 'Send Message'}</span>
              </div>
            </button>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default ContactForm
