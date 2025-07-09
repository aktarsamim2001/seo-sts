import React from 'react'

function Pagination() {
  return (
    <div className="reveal-me mt-16 md:mt-24">
      <ul className="reveal-me flex flex-wrap items-center justify-center gap-3">
        {/* Previous Button - disabled */}
        <li className="group">
          <button
            className="group flex size-10 cursor-not-allowed items-center justify-center border text-sm font-normal opacity-70 duration-300 dark:border-colorText lg:size-14"
            disabled>
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

        {/* Page Numbers - static */}
        {[1, 2, 3, 4, 5].map((page) => (
          <li className={`group ${page === 1 ? 'page-active' : ''}`} key={page}>
            <button className="flex size-10 items-center justify-center text-sm duration-300 hover:bg-primary hover:text-white group-[.page-active]:bg-primary dark:group-[.page-active]:text-secondary lg:size-14">
              {page}
            </button>
          </li>
        ))}

        {/* Next Button - disabled */}
        <li className="group">
          <button
            className="group flex size-10 cursor-not-allowed items-center justify-center border text-sm font-normal opacity-70 duration-300 dark:border-colorText lg:size-14"
            disabled>
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
