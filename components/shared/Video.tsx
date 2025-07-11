'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const Video = () => {
  const videoRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Reset GSAP animations when route changes
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [pathname])

  useGSAP(() => {
    const videoElement = videoRef.current

    const animation = gsap.fromTo(
      videoElement,
      {
        scale: 0.4,
        opacity: 0.6,
      },
      {
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.video-section',
          start: 'top 80%',
          end: 'top 0%',
          scrub: 1,
        },
      },
    )

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="video-section">
      <div ref={videoRef} className="h-fit w-full origin-top scale-50">
        <Image
          width={1920}
          height={1080}
          src="/images/about_us.avif"
          alt="Video Placeholder"
          className="h-full w-full object-cover"
          style={{ transition: 'transform 0.5s, opacity 0.5s' }}
        />
      </div>
    </section>
  )
}

export default Video
