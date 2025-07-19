'use client'

import Image from 'next/image'
import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import Pagination from './Pagination'

interface ProjectItem {
  title: string
  feature_image: string
  [key: string]: any
}

interface projectType {
  slug: string
  content: string
  banner: {
    title_one: string
    title_two: string
    content: string
  }
  portfolio: ProjectItem[]
}

const ProjectServicesV3 = ({ portfolio }: { portfolio: projectType }) => {
  return (
    <section className="pb-14 pt-28 sm:pt-36 md:pb-16 md:pt-[157px] lg:pb-[88px] xl:pb-[100px]">
      <div className="container">
        <div className="mb-20 flex flex-col justify-center gap-x-10 gap-y-3 sm:gap-y-7 md:mb-28 lg:flex-row lg:items-end lg:justify-between xl:mb-32">
          <div>
            <TextAppearAnimation>
              <h2 className="text-appear text-[46px] font-normal leading-[1.1] md:text-7xl md:tracking-[-2.88px] xl:text-[96px]">
                <span className="font-instrument italic !text-[#F54BB4]">{portfolio?.banner?.title_one}</span>
                <br />
                {portfolio?.banner?.title_two}
              </h2>
            </TextAppearAnimation>
          </div>
          <div className="lg:self-end">
            <TextAppearAnimation>
              <p className="text-appear max-w-[470px]">
                <span className="">{portfolio?.banner?.content}</span>
              </p>
            </TextAppearAnimation>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">
          {portfolio?.portfolio?.map((item: ProjectItem, idx: number) => (
            <RevealWrapper key={idx} className="single-project-item underline-hover-effect">
              <div className="block">
                <figure className="overflow-hidden">
                  <Image
                    src={item.feature_image}
                    height={553}
                    width={553}
                    className="h-full w-full transition-all duration-500 hover:scale-125"
                    alt={item.title || 'Project Image'}
                  />
                </figure>
                <div className="blog-title mb-1 mt-[30px] text-center">
                  <h3 className="text-center capitalize">{item.title}</h3>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
        <Pagination />
      </div>
    </section>
  )
}

export default ProjectServicesV3
