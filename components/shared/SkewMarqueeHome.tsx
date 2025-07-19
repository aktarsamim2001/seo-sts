'use client'

import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SkewMarqueeHome = ({ marqueeItems }: { marqueeItems: { id: number; src: string }[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          end: 'top 50%',
          scrub: false,
          once: true,
        },
        y: 200,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
      })
    },
    { scope: containerRef },
  )

  return (
    <section className="relative w-full pb-16 pt-10 lg:pb-48">
      <div
        className="w-[130vw]"
        ref={containerRef}
        style={{
          transform:
            'translate3d(-200px, 0px, 0px) scale3d(1, 1, 1) rotateX(30deg) rotateY(17deg) rotateZ(342deg) skew(7deg, 359deg)',
          transformStyle: 'preserve-3d',
        }}>
        <Marquee speed={180} gradient={false} pauseOnHover={false} className="flex gap-5">
          {marqueeItems?.map((img, i) => (
            <figure key={i} className="mx-2 flex-shrink-0">
              <Image width={370} height={400} src={img.src} alt={`Marquee ${img.id}`} className="object-cover" />
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default SkewMarqueeHome
