import RevealWrapper from '../animation/RevealWrapper'
import HeroGradientAnimation from './HeroGradientAnimation'
import Link from 'next/link'

interface PropsType {
  badgeTitle?: string
  title: string
  italicTitle?: string
  description?: string
  spacing?: string
  scale?: boolean
  image?: string
  subtitle?: string
  buttonText?: string
  buttonUrl?: string
}

const PageHero = ({
  badgeTitle,
  title,
  subtitle,
  description,
  italicTitle,
  spacing,
  scale,
  image,
  buttonText,
  buttonUrl,
}: PropsType) => {
  return (
    <section className={`${spacing ?? 'relative overflow-hidden py-32 md:py-40 lg:py-[185px]'} `}>
      <HeroGradientAnimation scale={scale} />

      <div className="container">
        <RevealWrapper className="text-center">
          {/* {badgeTitle && (
            <div className="rv-badge">
              <span className="rv-badge-text">{badgeTitle}</span>
            </div>
          )} */}
          {title && (
            <h1 className="mb-4 mt-3.5 font-[400]">
              {title} <i className="font-instrument italic text-[#F54BB4]">{italicTitle}</i>
            </h1>
          )}
          {subtitle && (
            <h2 className="text-appear mx-auto max-w-[770px] font-[450] md:mb-8 md:text-[28px] md:leading-[1.3] lg:text-[35px] lg:leading-[1.3]">
              {subtitle}
            </h2>
          )}
          {description && <p className="text-appear mx-auto max-w-[470px] md:max-w-[68rem]">{description}</p>}
          {image && (
            <RevealWrapper as="figure" className="mt-8">
              <img src={image} alt="Page Hero Image" className="mx-auto w-full max-w-[600px] object-cover" />
            </RevealWrapper>
          )}
          {buttonText && buttonUrl && (
            <Link
              href={buttonUrl}
              className="rv-button rv-button-primary rv-button-sm mt-8 block md:inline-block"
              aria-label={buttonText}>
              <div className="rv-button-top text-center">
                <span>{buttonText}</span>
              </div>
              <div className="rv-button-bottom text-center">
                <span className="text-nowrap">{buttonText}</span>
              </div>
            </Link>
          )}
        </RevealWrapper>
      </div>
    </section>
  )
}

export default PageHero
