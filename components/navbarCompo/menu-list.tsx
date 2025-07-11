'use client'

import { gsap } from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useRef, useState } from 'react'

interface MenuItemProps {
  title: string
  url: string
  items?: { title: string; url: string }[]
}

const menuItems: MenuItemProps[] = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'About Us',
    url: '/about',
  },
  {
    title: 'Services',
    url: '/services',
    items: [
      { title: 'Brand Identity Design', url: '/services/media' },
      { title: 'Illustration & Custom Graphics', url: '/services/media' },
      { title: 'Packaging & Print Design', url: '/services/media' },
    ],
  },
  {
    title: 'Portfolio',
    url: '/portfolio-agency/case-study',
  },
  {
    title: 'Blog',
    url: '/ai-blog',
  },
  {
    title: 'Contact Us',
    url: '/contact',
  },
]

interface MenuListProps {
  onItemClick?: () => void
}

export const MenuList = forwardRef<HTMLUListElement, MenuListProps>(({ onItemClick }, ref) => {
  const pathname = usePathname()
  const [activeItems, setActiveItems] = useState<string[]>([])
  const dropdownRefs = useRef(new Map<string, HTMLUListElement | null>())

  useEffect(() => {
    // Mark active based on current path
    menuItems.forEach((item) => {
      if (item.items) {
        const isActive = item.items.some((sub) => pathname.startsWith(sub.url))
        if (isActive) {
          setActiveItems([item.title])
        }
      } else if (pathname === item.url || pathname.startsWith(item.url + '/')) {
        setActiveItems([item.title])
      }
    })
    if (pathname === '/') {
      setActiveItems(['Home'])
    }
  }, [pathname])

  useEffect(() => {
    // Animate dropdown open/close
    menuItems.forEach((item) => {
      const dropdown = dropdownRefs.current.get(item.title)
      if (!dropdown) return

      if (activeItems.includes(item.title)) {
        gsap.set(dropdown, { display: 'block', autoAlpha: 0, y: 10 })
        gsap.to(dropdown, { autoAlpha: 1, y: 0, duration: 0.2 })
      } else {
        gsap.to(dropdown, {
          autoAlpha: 0,
          y: 10,
          duration: 0.15,
          onComplete: () => gsap.set(dropdown, { display: 'none' }),
        })
      }
    })
  }, [activeItems])

  const handleClickOrHover = (title: string) => {
    if (window.innerWidth <= 768) {
      setActiveItems((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
    }
  }

  const handleMouseEnter = (title: string) => {
    if (window.innerWidth > 768) {
      setActiveItems([title])
    }
  }

  const handleMouseLeave = (title: string) => {
    if (window.innerWidth > 768) {
      setActiveItems([])
    }
  }

  return (
    <ul ref={ref} className="menu-list">
      {menuItems.map((item) => (
        <li
          key={item.title}
          onMouseEnter={() => handleMouseEnter(item.title)}
          onMouseLeave={() => handleMouseLeave(item.title)}
          className={`menu-list-item ${activeItems.includes(item.title) ? 'active' : ''}`}>
          <div className="relative flex items-center">
            <Link
              href={item.url}
              className={`menu-link ${pathname === item.url ? 'text-[#F54BB4]' : ''}`}
              onClick={() => {
                onItemClick && onItemClick()
              }}>
              {item.title}
            </Link>
            {item.items && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleClickOrHover(item.title)
                }}
                className="ml-2 md:hidden">
                ▼
              </button>
            )}
          </div>
          {item.items && (
            <ul
              ref={(el) => dropdownRefs.current.set(item.title, el)}
              className={`submenu absolute left-0 mt-2 w-[200px] bg-white shadow-lg ${activeItems.includes(item.title) ? '' : 'hidden'}`}>
              {item.items.map((sub) => (
                <li key={sub.title}>
                  <Link
                    href={sub.url}
                    onClick={() => onItemClick && onItemClick()}
                    className="block px-4 py-2 hover:bg-gray-100">
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
})

MenuList.displayName = 'MenuList'
