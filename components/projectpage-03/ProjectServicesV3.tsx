'use client'

import Image from 'next/image'
import Link from 'next/link'
import RevealWrapper from '../animation/RevealWrapper'
import TextAppearAnimation from '../animation/TextAppearAnimation'
import Pagination from './Pagination'
import { useState } from 'react'

interface ProjectItem {
  title: string
  feature_image: string
  [key: string]: any
}

interface projectType {
  slug: string
  content: string
  portfolio: ProjectItem[]
}

const ProjectServicesV3 = ({ portfolio }: { portfolio: projectType }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const portfolioListData = portfolio?.portfolio || []
  const totalItems = portfolioListData.length

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = portfolioListData.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <section className="pb-14 pt-28 sm:pt-36 md:pb-16 md:pt-[157px] lg:pb-[88px] xl:pb-[100px]">
      <div className="container">
        <div className="mb-20 flex flex-col items-center justify-center gap-y-7 text-center md:mb-28 xl:mb-32">
          <div className="flex flex-col items-center justify-center text-center">
            <TextAppearAnimation>
              <h2 className="text-appear pb-14 text-[46px] font-normal leading-[1.1] md:text-7xl md:tracking-[-2.88px] xl:text-[96px]">
                Crafting Tomorrow’s
                <span className="mt-5 font-instrument italic !text-[#F54BB4]"> Solutions, Today</span>
              </h2>
            </TextAppearAnimation>
            <div>
              <Link
                href="/get-a-quote"
                className="rv-button rv-button-primary rv-button-sm block md:inline-block"
                aria-label="Explore Services">
                <div className="rv-button-top text-center">
                  <span>Get Started</span>
                </div>
                <div className="rv-button-bottom text-center">
                  <span className="text-nowrap">Get Started</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8 text-center md:mb-16">
          <h2 className="text-appear mb-3">
            Quality stuff. In every project.
            <br />
            <i className="font-instrument text-[#F54BB4]">every project.</i>
          </h2>
          <TextAppearAnimation>
            <p className="text-appear mx-auto px-4 md:px-0 lg:max-w-[770px]">
              With years of industry expertise, our team of visionaries, storytellers, and design virtuosos come
              together here for you to see.
            </p>
          </TextAppearAnimation>
        </div>

        <div className="container grid gap-20 max-md:gap-y-16 md:grid-cols-2 xl:gap-16">
          {currentItems.map((project, idx) => (
            <a
              key={project.title || idx}
              href="#"
              className="project-item underline-hover-effect group col-span-full flex flex-col gap-x-10 gap-y-6 lg:items-center">
              <figure className="overflow-hidden max-lg:w-full">
                <Image
                  src={project.feature_image}
                  alt={project.title}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:rotate-3 group-hover:scale-125"
                />
              </figure>
              <div className="project-item-content">
                <p className="text-xs font-normal uppercase leading-3 tracking-[5px] text-secondary dark:text-backgroundBody md:leading-6 md:tracking-[8px]">
                  USER EXPERIENCE{project.category}
                </p>
                <div className="blog-title mb-2 mt-3 md:mt-4 lg:mb-4 lg:mt-5 xl:mt-7">
                  <h3 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[56px] lg:leading-[1.2] lg:tracking-[-1.68px]">
                    {project.title}
                  </h3>
                </div>
                <p className="text-base leading-[1.4] tracking-[0.48px] text-[#000000b3] dark:text-dark-100 md:text-2xl">
                  /2020
                </p>
              </div>
            </a>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      </div>
    </section>
  )
}

export default ProjectServicesV3
