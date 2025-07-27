'use client'

import React, { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetQuotePage } from '@/store/slice/quotePageSlice'
import { submitEnquiry, resetEnquiry } from '../../store/slice/enquirySlice'
import RevealWrapper from '../../components/animation/RevealWrapper'
import PageHero from '../../components/shared/PageHero'
import LayoutOne from '../..//components/shared/LayoutOne'
import type { RootState, AppDispatch } from '@/store/store'
import HeroBanner from '@/components/aboutpage/HeroBanner'

// Interface for submission data
interface SubmissionData {
  service_id: number
  name: string
  company: string
  email: string
  mobile: string
  timeline: string
  budget: string
  about_project: string
  additional_message: string
  project?: string
  file_name?: string
  file_type?: string
  file_size?: number
}

const GetAQuotePage = () => {
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

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileBase64, setFileBase64] = useState<string>('')
  const [fileUploading, setFileUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      setSelectedFile(null) // Reset file selection
      setFileBase64('') // Reset base64
    }
  }, [enquiry.thankYouMessage, enquiry.response?.message])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Convert file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  // File upload handlers with better error handling
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (optional - limit to 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      toast.error('File size should be less than 10MB')
      return
    }

    setFileUploading(true)
    console.log('Converting file to base64:', file.name) // Debug log

    try {
      const base64 = await convertToBase64(file)
      console.log('Base64 conversion successful, length:', base64.length) // Debug log
      setSelectedFile(file)
      setFileBase64(base64)
      toast.success('File uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload file')
      console.error('File conversion error:', error)
      setSelectedFile(null)
      setFileBase64('')
    } finally {
      setFileUploading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Remove file
  const handleRemoveFile = () => {
    setSelectedFile(null)
    setFileBase64('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Find service_id from service_options
    let service_id = 1
    if (page_content?.form_options?.service_options) {
      const found = page_content.form_options.service_options.find((opt: any) => opt.title === formData.service)
      if (found) service_id = found.service_id
    }

    // Prepare submission data with proper typing
    const submissionData: SubmissionData = {
      service_id,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      mobile: formData.phone,
      timeline: formData.timeline,
      budget: formData.budget,
      about_project: formData.description,
      additional_message: formData.otherMessage,
    }

    // Add file data if file is selected and converted to base64
    if (fileBase64 && selectedFile) {
      submissionData.project = fileBase64 // Base64 string: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
      submissionData.file_name = selectedFile.name
      submissionData.file_type = selectedFile.type
      submissionData.file_size = selectedFile.size
    }

    console.log('Submission data:', submissionData) // Debug log

    dispatch(submitEnquiry(submissionData))
  }

  // Reset enquiry message on unmount
  useEffect(() => {
    return () => {
      dispatch(resetEnquiry())
    }
  }, [dispatch])

  return (
    <LayoutOne>
      <HeroBanner banner={page_content?.banner} />
      <section className="pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
        <PageHero
          title={page_content?.banner?.title_one || 'Happy to Assist You'}
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

            {/* Upload file input */}
            <div className="md:col-span-full">
              <label
                htmlFor="file-upload"
                className="text-2xl leading-[1.2] tracking-[-0.48px] text-[#000000b3] dark:text-dark-100">
                Upload file (optional)
              </label>
              <div className="relative mt-3">
                <input
                  type="text"
                  readOnly
                  value={selectedFile ? selectedFile.name : ''}
                  placeholder="Choose a file to upload (PDF, Images, Docs)"
                  className="w-full cursor-pointer border bg-backgroundBody py-4 pl-5 pr-24 text-xl leading-[1.4] tracking-[0.4px] text-colorText focus:border-[#F54BB4] focus:outline-none dark:border-dark dark:bg-dark"
                  onClick={handleUploadClick}
                />

                {/* Upload/Remove buttons */}
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-2">
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-red-500 transition-colors hover:text-red-700"
                      title="Remove file">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={fileUploading}
                    className="text-[#F54BB4] transition-colors hover:text-[#d63ea0] disabled:opacity-50"
                    title="Upload file">
                    {fileUploading ? (
                      <svg
                        className="animate-spin"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 10L12 5L17 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5V15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                />
              </div>

              {/* File info */}
              {selectedFile && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>File: {selectedFile.name}</p>
                  <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p>Type: {selectedFile.type}</p>
                </div>
              )}
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
                disabled={enquiry.loading || fileUploading}>
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

export default GetAQuotePage
