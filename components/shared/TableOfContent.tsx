'use client'

import { slugify } from '@/utils/slugify'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface TableOfContentProps {
  tableOfContents: string[]
  children?: ReactNode
}

const getHeadingFromPath = (path: string): string => {
  const segments = path.split('/').filter(Boolean)

  if (segments.includes('services')) {
    return 'About Services'
  } else if (segments.includes('blog')) {
    return 'In This Article'
  }

  return 'Table of Contents'
}

const TableOfContent = ({ tableOfContents, children }: TableOfContentProps) => {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>('')

  const headingTitle = getHeadingFromPath(pathname)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      },
    )

    tableOfContents?.forEach((content) => {
      const element = document.getElementById(slugify(content))
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [tableOfContents])

  return (
    <div>
      <h3 className="mt-7 text-3xl md:text-4xl">{headingTitle}</h3>
      <ul className="mt-3.5 md:mt-5 lg:mt-10 [&>*:not(:last-child)]:mb-2 md:[&>*:not(:last-child)]:mb-5">
        {tableOfContents?.map((content, index) => {
          const slug = slugify(content)
          return (
            <li key={`${slug}-${index}`}>
              <a
                href={`#${slug}`}
                className={`lenis-scroll-to text-xl font-normal normal-case leading-7 tracking-normal transition-all hover:text-secondary dark:hover:text-backgroundBody ${
                  activeSection === slug
                    ? 'text-secondary dark:text-backgroundBody'
                    : 'text-[#000000b3] dark:text-dark-100'
                }`}>
                {content}
              </a>
            </li>
          )
        })}
      </ul>
      {children}
    </div>
  )
}

export default TableOfContent
