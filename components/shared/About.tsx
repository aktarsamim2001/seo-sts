'use client'

import Image from 'next/image'
import Link from 'next/link'

type AboutProps = {
  title?: string
  content?: string
  feature_image?: string
  button?: string
  button_url?: string
}

const About = ({ title, content, feature_image, button, button_url }: AboutProps) => {
  const isValidUrl = typeof button_url === 'string' && button_url.trim() !== ''
  const hasImage = typeof feature_image === 'string' && feature_image.trim() !== ''

  return (
    <section className="relative overflow-hidden pb-14 pt-28 md:pb-16 md:pt-32 lg:pb-[88px] lg:pt-44 xl:pb-[100px] xl:pt-[200px]">
      <div className="container">
        <div className="flex flex-col items-center justify-center lg:items-stretch lg:justify-normal">
          {/* Logo (light and dark) */}
          {hasImage && (
            <div className="flex items-center justify-center">
              <Image
                className="inline-block max-h-[140px] w-auto dark:hidden"
                src={feature_image}
                alt="logo"
                width={180}
                height={140}
                priority
              />
              <Image
                className="hidden max-h-[140px] w-auto dark:inline-block"
                src={feature_image}
                alt="logo"
                width={180}
                height={140}
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="mx-auto mt-[34px] flex flex-col items-center gap-6 text-center">
            {title && <h1>{title}</h1>}
            {content && <p>{content}</p>}

            {isValidUrl && (
              <Link
                href={button_url}
                className="rv-button rv-button-primary mt-8 block w-full text-center md:inline-block md:w-auto">
                <div className="rv-button-top">
                  <span>{button}</span>
                </div>
                <div className="rv-button-bottom">
                  <span>{button}</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
