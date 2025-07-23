import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useCallback } from 'react'

// Dummy data for sliding content
const heroSlides = [
  {
    id: 1,
    title: 'Transform business with',
    title_two: 'consulting',
    subtitle: 'Strategic Excellence',
    description:
      'We provide expert advice and actionable strategies to help you grow, streamline operations, and stay ahead in a competitive market.',
    primaryButton: { text: 'Explore Services', href: '/services' },
    secondaryButton: { text: 'Get Started', href: '/get-a-quote' },
    images: [
      { src: '/images/hero-img/business-hero-1.png', alt: 'Business professionals in a consultation meeting' },
      { src: '/images/hero-img/hero-img-03.webp', alt: 'Business growth and strategy visualization' },
    ],
  },
  {
    id: 2,
    title: 'Scale your operations with',
    title_two: 'precision',
    subtitle: 'Operational Excellence',
    description:
      'Optimize workflows, reduce costs, and increase efficiency with our data-driven approach to business transformation.',
    primaryButton: { text: 'Explore Services', href: '/services' },
    secondaryButton: { text: 'Get Started', href: '/get-a-quote' },
    images: [
      { src: '/images/hero-img/blog-img-29.png', alt: 'Team analyzing operational metrics' },
      { src: '/images/hero-img/business-hero-1.png', alt: 'Digital transformation dashboard' },
    ],
  },
  {
    id: 3,
    title: 'Innovation driven growth',
    title_two: 'strategies',
    subtitle: 'Future Forward',
    description:
      'Leverage cutting-edge technologies and methodologies to drive sustainable growth and competitive advantage.',
    primaryButton: { text: 'Explore Services', href: '/services' },
    secondaryButton: { text: 'Get Started', href: '/get-a-quote' },
    images: [
      { src: '/images/hero-img/startup-hero-2 (1).jpg', alt: 'Innovation workshop session' },
      { src: '/images/hero-img/startup-hero-1 (1).jpg', alt: 'Technology integration planning' },
    ],
  },
]

const HeroV24 = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
      )
    }
  }, [])

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)

    // Animate out current content
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsAnimating(false)
      },
    })

    tl.to([contentRef.current, imagesRef.current], {
      opacity: 0,
      x: 60, // slide out to right
      duration: 0.3,
      ease: 'power2.in',
    })
  }, [isAnimating, contentRef, imagesRef])

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide()
      }
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [currentSlide, isAnimating, nextSlide])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(index)
        setIsAnimating(false)
      },
    })

    tl.to([contentRef.current, imagesRef.current], {
      opacity: 0,
      x: 60, // slide out to right
      duration: 0.3,
      ease: 'power2.in',
    })
  }

  // Animate in new content when slide changes
  useEffect(() => {
    if (contentRef.current && imagesRef.current) {
      gsap.fromTo(
        [contentRef.current, imagesRef.current],
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.1,
        },
      )
    }
  }, [currentSlide])

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden pb-14 pt-[137px] md:pb-16 md:pt-[160px] lg:pb-[88px] xl:pb-[112px] xl:pt-[220px]"
      aria-labelledby="hero-heading">
      {/* Background Gradient */}
      <div id="hero-gradient-wrapper" className="absolute left-0 top-0 -z-10 blur-[65px]" aria-hidden="true">
        <img
          src="/images/hero-gradient-background.png"
          alt="hero"
          id="hero-gradient"
          className="left-0 top-0"
          role="presentation"
        />
      </div>

      <RevealWrapper className="reveal-me mx-auto flex max-w-[1600px] flex-col items-start justify-start gap-y-8 px-6 pt-14 md:px-14 xl:flex-row xl:justify-between">
        {/* Content Section */}
        <div className="flex-1">
          <div ref={contentRef}>
            {/* Subtitle */}
            <RevealWrapper
              as="span"
              className="reveal-me mb-4 inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white">
              {currentSlideData.subtitle}
            </RevealWrapper>

            {/* Main Title */}
            <RevealWrapper
              as="h1"
              id="hero-heading"
              className="reveal-me mb-4 mt-3.5 text-5xl font-[400] leading-tight tracking-[-2px] sm:text-[55px] md:text-[67px] 2xl:text-8xl 2xl:leading-[1.17] 2xl:tracking-[-2.88px]">
              {currentSlideData?.title}{' '}
              <i className="font-instrument italic text-[#F54BB4]">{currentSlideData?.title_two}</i>
            </RevealWrapper>

            {/* Description */}
            {/* <RevealWrapper as="p" className="reveal-me mt-3 max-w-xl text-gray-600">
              {currentSlideData.description}
            </RevealWrapper> */}

            {/* Buttons */}
            <div className="flex flex-col gap-4 md:mt-9 md:flex-row lg:mt-14">
              <Link
                href={currentSlideData.primaryButton.href}
                className="rv-button rv-button-primary rv-button-sm block md:inline-block"
                aria-label={currentSlideData.primaryButton.text}>
                <div className="rv-button-top text-center">
                  <span>{currentSlideData.primaryButton.text}</span>
                </div>
                <div className="rv-button-bottom text-center">
                  <span className="text-nowrap">{currentSlideData.primaryButton.text}</span>
                </div>
              </Link>
              <Link
                href={currentSlideData.secondaryButton.href}
                className="rv-button rv-button-primary rv-button-sm block md:inline-block"
                aria-label={currentSlideData.secondaryButton.text}>
                <div className="rv-button-top text-center">
                  <span>{currentSlideData.secondaryButton.text}</span>
                </div>
                <div className="rv-button-bottom text-center">
                  <span className="text-nowrap">{currentSlideData.secondaryButton.text}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div
          ref={imagesRef}
          className="flex w-full flex-1 flex-col gap-5 md:flex-row"
          aria-label="Business consulting imagery">
          {currentSlideData.images[0] && (
            <figure className="relative overflow-hidden">
              <img
                src={currentSlideData.images[0].src}
                alt={currentSlideData.images[0].alt}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[540px] md:w-[820px]"
                width={820}
                height={540}
              />
            </figure>
          )}
        </div>
      </RevealWrapper>

      {/* Slide Navigation Dots */}
      {/* <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'scale-125 bg-gradient-to-r from-blue-600 to-purple-600'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* Progress Bar */}
      {/* <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
          }}
        />
      </div> */}

      {/* Navigation Arrows */}
      {/* <button
        onClick={() => goToSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1)}
        className="group absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white"
        aria-label="Previous slide">
        <svg
          className="h-6 w-6 text-gray-800 transition-colors group-hover:text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="group absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white"
        aria-label="Next slide">
        <svg
          className="h-6 w-6 text-gray-800 transition-colors group-hover:text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button> */}
    </section>
  )
}

export default HeroV24
