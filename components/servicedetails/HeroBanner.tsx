import Link from 'next/link'

type Banner = {
  title_one?: string
  title_two?: string
  title_three?: string
  content?: string
  feature_image?: string
  button?: string
  button_url?: string
  short_desc?: string
}

const HeroBanner = ({ banner }: { banner: Banner }) => {
  console.log('Banner:', banner)
  return (
    <section
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

      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-start gap-y-8 px-6 xl:flex-row xl:justify-between">
        {/* Content Section */}
        <div className="flex-1">
          <h1
            id="hero-heading"
            className="mb-4 mt-3.5 text-5xl font-[400] leading-tight tracking-[-2px] sm:text-[55px] md:pr-6 md:text-[67px] 2xl:text-8xl 2xl:leading-[1.17] 2xl:tracking-[-2.88px]">
            {banner?.title_one} <i className="font-instrument italic text-[#F54BB4]">{banner?.title_two}</i>
          </h1>

          {banner?.short_desc && <p className="mt-3 max-w-xl text-gray-600">{banner.short_desc}</p>}

          {banner?.button && (
            <div className="flex flex-col gap-4 md:mt-9 md:flex-row lg:mt-14">
              <Link
                href={banner?.button_url ?? '#'}
                className="rv-button rv-button-primary rv-button-sm block md:inline-block"
                aria-label="Get Started">
                <div className="rv-button-top text-center">
                  <span>{banner?.button}</span>
                </div>
                <div className="rv-button-bottom text-center">
                  <span className="text-nowrap">{banner?.button}</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="flex w-full flex-1 flex-col gap-5 md:flex-row" aria-label="Business consulting imagery">
          <figure className="relative overflow-hidden">
            {banner?.feature_image && (
              <img
                src={banner.feature_image}
                alt="Banner"
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[540px] md:w-[820px]"
                width={820}
                height={540}
              />
            )}
          </figure>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
