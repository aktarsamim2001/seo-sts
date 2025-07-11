'use client'

import React, { useState } from 'react'

interface FormDataType {
  name: string
  email: string
  phone?: string
  service: string
  description: string
  timeline: string
  budget: string
  otherMessage?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
    timeline: '',
    budget: '',
    otherMessage: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    // Send data to backend or handle as needed
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mx-auto grid max-w-[800px] grid-cols-1 gap-[30px] md:grid-cols-2">
        {/* Full Name */}
        <div className="md:col-span-full">
          <label htmlFor="name" className="text-2xl">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="mt-3 w-full border py-4 pl-5 text-xl"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-2xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
            className="mt-3 w-full border py-4 pl-5 text-xl"
          />
        </div>

        {/* Phone (Optional) */}
        <div>
          <label htmlFor="phone" className="text-2xl">
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="mt-3 w-full border py-4 pl-5 text-xl"
          />
        </div>

        {/* Services Looking For (Dropdown) */}
        <div className="md:col-span-full">
          <label htmlFor="service" className="text-2xl">
            Services Looking For
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="mt-3 w-full border py-4 pl-5 text-xl">
            <option value="">Select a service</option>
            <option value="Brand Identity Design">Brand Identity Design</option>
            <option value="Web & Digital Design">Web & Digital Design</option>
            <option value="Copywriting & Content Strategy">Copywriting & Content Strategy</option>
          </select>
        </div>

        {/* About Project Description (textarea) */}
        <div className="md:col-span-full">
          <label htmlFor="description" className="text-2xl">
            About the project description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about your project"
            required
            className="mt-3 w-full border py-4 pl-5 text-xl"></textarea>
        </div>

        {/* How soon you want? */}
        <div>
          <label htmlFor="timeline" className="text-2xl">
            How soon you want?
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
            className="mt-3 w-full border py-4 pl-5 text-xl">
            <option value="">Select timeline</option>
            <option value="Immediate">Immediate</option>
            <option value="Within a week">Within a week</option>
            <option value="7 to 14 days">7 to 14 days</option>
            <option value="15 to 30 days">15 to 30 days</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="text-2xl">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="mt-3 w-full border py-4 pl-5 text-xl">
            <option value="">Select budget</option>
            <option value="100 - 500 USD">100 - 500 USD</option>
            <option value="500 to 750 USD">500 to 750 USD</option>
            <option value="750 - 1500 USD">750 - 1500 USD</option>
            <option value="1500 USD +">1500 USD +</option>
          </select>
        </div>

        {/* Any other message (Optional) */}
        <div className="md:col-span-full">
          <label htmlFor="otherMessage" className="text-2xl">
            Any other message (optional)
          </label>
          <textarea
            id="otherMessage"
            name="otherMessage"
            value={formData.otherMessage}
            onChange={handleChange}
            placeholder="Any other details you'd like to share?"
            className="mt-3 w-full border py-4 pl-5 text-xl"></textarea>
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button type="submit" className="mt-5 block w-full bg-[#000] py-4 text-xl text-white hover:bg-[#333]">
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}
