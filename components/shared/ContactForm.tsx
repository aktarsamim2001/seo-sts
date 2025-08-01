'use client'

import React, { useState } from 'react'

interface ContactFormProps {
  budgets?: string[]
  interests?: string[]
}

const ContactForm: React.FC<ContactFormProps> = ({ budgets, interests }) => {
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
        {interests && interests.length > 0 ? (
          <div className="mt-3 grid h-full grid-cols-1 gap-6 md:grid-cols-3">
            {interests.map((interest, idx) => (
              <div key={`interest-${idx}`} className="radio-wrapper flex h-full items-center justify-center">
                <input
                  type="radio"
                  id={`interest-${idx}`}
                  name="interest"
                  value={interest}
                  checked={selectedInterest === interest}
                  onChange={() => setSelectedInterest(interest)}
                  className="hidden"
                />
                <label
                  htmlFor={`interest-${idx}`}
                  className="interest-btn flex h-full min-h-[64px] w-full items-center justify-center">
                  {interest}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 text-red-500">No interests available.</div>
        )}
      </div>

      {/* Budget Section */}
      <div className="mt-8 md:col-span-full">
        <label className="mt-3 text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
          Budget in USD:
        </label>
        {budgets && budgets.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-6">
            {budgets.map((budget, idx) => (
              <div key={`budget-${idx}`} className="radio-wrapper">
                <input type="radio" id={`budget-${idx}`} name="budget" value={budget} className="hidden" />
                <label htmlFor={`budget-${idx}`} className="interest-btn">
                  {budget}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 text-red-500">No budgets available.</div>
        )}
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
