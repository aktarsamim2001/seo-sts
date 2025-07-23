import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'

const OurWorkV2 = ({ titleOne, titleTwo, subtitle, portfolio, button, buttonUrl }: any) => {
  return (
    <section className="overflow-hidden pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="mb-8 text-center md:mb-20">
        <h1 className="mb-4 mt-3.5 font-[400]">
          {titleOne} <span className="font-instrument italic text-[#F54BB4]">{titleTwo}</span>
        </h1>
        <h2 className="text-appear mx-auto max-w-[770px] font-[450] md:mb-8 md:text-[28px] md:leading-[1.3] lg:text-[35px] lg:leading-[1.3]">
          {subtitle}
        </h2>
      </div>

      <div className="relative mx-auto mb-[60px] grid max-w-[1500px] grid-cols-1 items-center justify-items-center gap-[30px] gap-y-10 px-5 after:absolute after:top-1/2 after:h-[1px] after:w-full after:bg-secondary/10 after:content-[''] dark:after:bg-backgroundBody/10 md:grid-cols-2 md:items-start md:before:absolute md:before:h-full md:before:w-[1px] md:before:bg-secondary/10 md:before:content-[''] md:dark:before:bg-backgroundBody/10">
        {portfolio.map((item: any) => (
          <RevealWrapper key={item.title} className="underline-hover-effect group w-full">
            <div className="block">
              <figure className="w-full overflow-hidden">
                <img
                  src={item?.feature_image}
                  className="h-full w-full transition-all duration-500 group-hover:rotate-3 group-hover:scale-125"
                  alt={item?.title}
                />
              </figure>
            </div>
            <div className="mt-[30px] block">
              <div className="blog-title">
                <h3>{item?.title}</h3>
              </div>
              <p className="mt-3.5 text-xs uppercase leading-[1.2] tracking-[0.96px] text-secondary/70 dark:text-backgroundBody/70">
                {item?.subtitle}
              </p>
            </div>
          </RevealWrapper>
        ))}
      </div>

      <RevealWrapper as="ul" className="flex justify-center px-5">
        <li className="mx-auto block max-md:w-full md:ml-auto md:inline-block md:w-auto">
          <Link
            href={buttonUrl}
            className="rv-button rv-button-primary block w-full text-center md:inline-block md:w-auto">
            <div className="rv-button-top">
              <span>{button}</span>
            </div>
            <div className="rv-button-bottom">
              <span>{button}</span>
            </div>
          </Link>
        </li>
      </RevealWrapper>
    </section>
  )
}

export default OurWorkV2
