import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  paginate: (pageNumber: number) => void
}

function Pagination({ currentPage, totalPages, paginate }: PaginationProps) {
  // Generate page numbers
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="reveal-me mt-16 md:mt-24">
      <ul className="reveal-me flex flex-wrap items-center justify-center gap-3">
        {/* Previous Button */}
        <li className="group">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`group flex size-10 items-center justify-center border text-sm font-normal duration-300 dark:border-colorText lg:size-14 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-70' : 'hover:bg-primary hover:text-white'
            }`}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 16"
                fill="none"
                className="flex h-3 w-[18px] stroke-black dark:stroke-white lg:h-4">
                <path
                  d="M17.25 8H0.75M0.75 8L7.5 1.25M0.75 8L7.5 14.75"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li className={`group ${currentPage === number ? 'page-active' : ''}`} key={number}>
            <button
              onClick={() => paginate(number)}
              className="flex size-10 items-center justify-center text-sm duration-300 hover:bg-primary hover:text-white group-[.page-active]:bg-primary dark:group-[.page-active]:text-secondary lg:size-14">
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li className="group">
          <button
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`group flex size-10 items-center justify-center border text-sm font-normal duration-300 dark:border-colorText lg:size-14 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-70' : 'hover:bg-primary hover:text-white'
            }`}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex h-3 w-[18px] stroke-black dark:stroke-white lg:h-4"
                viewBox="0 0 18 16"
                fill="none">
                <path
                  d="M0.75 8H17.25M17.25 8L10.5 1.25M17.25 8L10.5 14.75"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
