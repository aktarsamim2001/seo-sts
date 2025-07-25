import { useDispatch } from 'react-redux'
import { fetchPortfoliosList } from '@/store/slice/portfoliosListSlice'
import Image from 'next/image'
import Pagination from './Pagination'
import { AppDispatch } from '@/store/store'

interface ProjectItem {
  title: string
  feature_image: string
  [key: string]: any
}

interface PaginationData {
  total: number
  per_page: number
  current_page: number
  total_pages: number
}

const ProjectServicesV3 = ({
  portfolio,
  paginationData,
}: {
  portfolio: ProjectItem[]
  paginationData: PaginationData
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const paginate = (pageNumber: number) => {
    dispatch(fetchPortfoliosList({ page_no: pageNumber }))
  }

  const { total, per_page, current_page, total_pages } = paginationData

  return (
    <section className="pb-14 pt-28 sm:pt-36 md:pb-16 md:pt-[157px] lg:pb-[88px] xl:pb-[100px]">
      <div className="container grid gap-20 max-md:gap-y-16 md:grid-cols-2 xl:gap-16">
        {portfolio.map((project, idx) => (
          <a
            key={project.title || idx}
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
                USER EXPERIENCE
              </p>
              <div className="blog-title mb-2 mt-3 md:mt-4 lg:mb-4 lg:mt-5 xl:mt-7">
                <h3 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[56px] lg:leading-[1.2] lg:tracking-[-1.68px]">
                  {project.title}
                </h3>
              </div>
              <p className="text-base leading-[1.4] tracking-[0.48px] text-[#000000b3] dark:text-dark-100 md:text-2xl">
                /{project.year}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Only show pagination if more than one page */}
      {total_pages < total && <Pagination currentPage={current_page} totalPages={total_pages} paginate={paginate} />}
    </section>
  )
}

export default ProjectServicesV3
