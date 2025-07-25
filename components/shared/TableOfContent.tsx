'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Props {
  tableOfContents: string[]
}

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '') // remove non-word characters

const TableOfContent = ({ tableOfContents }: any) => {
  const [activeSection, setActiveSection] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      },
    )

    tableOfContents.forEach((title: any) => {
      const id = slugify(title)
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [tableOfContents])

  // Set default section on load
  useEffect(() => {
    if (tableOfContents.length > 0) {
      setActiveSection(slugify(tableOfContents[0]))
    }
  }, [tableOfContents])

  return (
    <div className="dark:border-dark-300 dark:bg-dark-700 sticky top-28 hidden h-fit min-w-[300px] rounded-lg px-4 py-6 xl:block">
      <h3 className="mb-6 mt-9 text-3xl font-semibold text-black dark:text-white">Table of Contents</h3>

      <ul className="flex flex-col gap-4">
        {tableOfContents.map((title: any, index: any) => {
          const slug = slugify(title)
          const isActive = activeSection === slug

          return (
            <li key={slug} className="flex items-start gap-2">
              <span className="mt-3 font-medium text-[#a3a3a3]">{index + 1}.</span>
              <a
                href={`#${slug}`}
                className={`text-xl transition-all hover:text-[#F54BB4] dark:hover:text-[#F54BB4] ${
                  isActive ? 'font-semibold text-[#F54BB4] dark:text-[#F54BB4]' : 'text-[#000000b3] dark:text-dark-100'
                }`}>
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TableOfContent
