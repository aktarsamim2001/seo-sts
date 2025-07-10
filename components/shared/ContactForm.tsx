'use client'

import React, { useState } from 'react'

const interestData = [
  { id: 'brand-identity', value: 'Brand Identity Design' },
  { id: 'illustration', value: 'Illustration & Custom Graphics' },
  { id: 'packaging', value: 'Packaging & Print Design' },
  { id: 'photo', value: 'Photo & Image Production' },
  { id: 'video', value: 'Video & Motion Services' },
  { id: 'web-digital', value: 'Web & Digital Design' },
  { id: 'social-media', value: 'Social Media Content Design' },
  { id: 'copywriting', value: 'Copywriting & Content Strategy' },
  { id: 'digital-marketing', value: 'Digital Marketing Services' },
]
const budgetData = [
  { id: 'budget1', value: '$2k-4k' },
  { id: 'budget2', value: '$4k-6k' },
  { id: 'budget3', value: '$6k-8k' },
]

const ContactForm = () => {
  // Track selected interest
  const [selectedInterest, setSelectedInterest] = React.useState('')

  return (
    <form className="reveal-me mx-auto mt-20 grid max-w-[800px] grid-cols-1 gap-[30px] md:grid-cols-2">
      {/* Your Data Field */}
      <div className="md:col-span-full">
        <label htmlFor="name" className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
          Your Data
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name*"
          className="mt-3 w-full border bg-backgroundBody py-4 pl-5 text-lg leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark md:text-xl"
        />
      </div>

      {/* Interests Section */}
      <div className="md:col-span-full">
        <label className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
          You are interested in
        </label>

        <div className="mt-3 grid h-full grid-cols-1 gap-6 md:grid-cols-3">
          {interestData.map((item) => (
            <div key={item.id} className="radio-wrapper">
              <input
                type="radio"
                id={item.id}
                name="interest"
                value={item.value}
                checked={selectedInterest === item.value}
                onChange={() => setSelectedInterest(item.value)}
                className="hidden"
              />
              <label htmlFor={item.id} className="interest-btn">
                {item.value}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Section */}
      <div className="md:col-span-full">
        <label className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
          Budget in USD:
        </label>

        <div className="mt-3 flex flex-wrap gap-6">
          {budgetData.map((item) => (
            <div key={item.id} className="radio-wrapper">
              <input type="radio" id={item.id} name="budget" value={item.value} className="hidden" />
              <label htmlFor={item.id} className="interest-btn">
                {item.value}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Section */}
      <div className="md:col-span-full">
        <label
          htmlFor="message"
          className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your project goals and timeline"
          className="mt-3 min-h-44 w-full border bg-backgroundBody py-4 pl-5 text-base leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark md:text-xl"></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" className="rv-button rv-button-primary col-span-full !w-full">
        <div className="rv-button-top !w-full !text-center">
          <span className="!font-normal">Submit Message</span>
        </div>
        <div className="rv-button-bottom !w-full !text-center">
          <span className="!font-normal">Submit Message</span>
        </div>
      </button>
    </form>
  )
}

export default ContactForm
