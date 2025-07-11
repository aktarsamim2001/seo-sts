'use client'

import React, { useState } from 'react'
import RevealWrapper from '../../components/animation/RevealWrapper'
import ContactForm from '../../components/contactpage/ContactForm'
import PageHero from '../../components/shared/PageHero'
import LayoutOne from '../..//components/shared/LayoutOne'

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '', // Added phone field
    service: 'UI/UX',
    description: '',
    timeline: '',
    budget: '40k',
    message: '',
    otherMessage: '', // Added otherMessage field for textarea
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form Data Submitted:', formData)
    alert(`${formData.name} Your Data Has Been Submited`)
    // Add your form submission logic here (e.g., API call)
  }

  return (
    <LayoutOne>
      <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
        <PageHero
          title="Happy to Assist You"
          badgeTitle="Get a Quote"
          description="Discover our innovative, cutting-edge no-code websites, crafted to effortlessly captivate and engage your visitors."
          scale
          spacing="pt-[130px] md:pt-[180px] pb-20 sm:pb-32 md:pb-36 lg:pb-36 xl:pb-[100px] relative overflow-hidden"
        />
        <div className="container">
          <RevealWrapper
            as="form"
            onSubmit={handleSubmit}
            className="reveal-me mx-auto grid max-w-[800px] grid-cols-1 gap-[30px] md:grid-cols-2">
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
                <option value="Brand Identity">Brand Identity</option>
                <option value="Illustration">Illustration & Graphics</option>
                <option value="Packaging">Packaging & Print</option>
                <option value="Photo Production">Photo & Image Production</option>
                <option value="Video Motion">Video & Motion</option>
                <option value="Web Design">Web & Digital Design</option>
                <option value="Social Media Content">Social Media Content Design</option>
                <option value="Copywriting">Copywriting & Content Strategy</option>
                <option value="Digital Marketing">Digital Marketing Services</option>
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
                <option value="Immediate">Immediate</option>
                <option value="Week">Within a week</option>
                <option value="7-14 days">7 to 14 days</option>
                <option value="15-30 days">15 to 30 days</option>
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
                <option value="100-500">100 - 500 USD</option>
                <option value="500-750">500 to 750 USD</option>
                <option value="750-1500">750 - 1500 USD</option>
                <option value="1500+">1500 USD +</option>
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
              <button type="submit" className="rv-button rv-button-primary block w-full md:inline-block md:w-auto">
                <div className="rv-button-top">
                  <span>Send Message</span>
                </div>
                <div className="rv-button-bottom">
                  <span className="text-nowrap">Send Message</span>
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
