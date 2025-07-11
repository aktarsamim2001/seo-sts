'use client'

import { gsap } from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useRef, useState } from 'react'

interface MenuItemProps {
  title: string
  url: string
  items?: { title: string; url: string; isActive?: boolean }[]
  isActive?: boolean
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
    url: '/services', // Changed from '#' to '/services'
    items: [
      { title: 'Brand Identity Design', url: '/services/media' },
      { title: 'Illustration & Custom Graphics', url: '/services/media' },
      { title: 'Packaging & Print Design', url: '/services/media' },
      { title: 'Photo & Image Production', url: '/services/media' },
      { title: 'Video & Motion Services', url: '/services/media' },
      { title: 'Web & Digital Design', url: '/services/media' },
      { title: 'Social Media Content Design', url: '/services/media' },
      { title: 'Copywriting & Content Strategy', url: '/services/media' },
      { title: 'Digital Marketing Services', url: '/services/media' },
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

export const MenuList = forwardRef<HTMLUListElement, MenuListProps>((props, ref) => {
  const { onItemClick } = props
  const pathname = usePathname()
  const [activeItems, setActiveItems] = useState<string[]>([])
  const [initialLoad, setInitialLoad] = useState(true)
  const dropdownRefsMap = useRef(new Map<string, HTMLUListElement | null>())

  //  initial active item current path
  useEffect(() => {
    let foundParent = false

    menuItems.forEach((item) => {
      if (item.items) {
        const activeSubItem = item.items.find(
          (subItem) => pathname === subItem.url || pathname.startsWith(subItem.url + '/'),
        )

        if (activeSubItem) {
          setActiveItems([item.title])
          foundParent = true
        }
      }
    })

    // If no parent found but we're on a top-level path
    if (!foundParent) {
      const topLevelMatch = menuItems.find(
        (item) => pathname === item.url || (item.url !== '#' && pathname.startsWith(item.url + '/')),
      )

      if (topLevelMatch) {
        setActiveItems([topLevelMatch.title])
      }
    }

    if (pathname === '/') {
      setActiveItems(['Home'])
    }

    setInitialLoad(false)
  }, [pathname])

  useEffect(() => {
    if (initialLoad && pathname === '/') {
      setActiveItems(['Home'])

      setTimeout(() => {
        const homeDropdown = dropdownRefsMap.current.get('Home')
        if (homeDropdown) {
          gsap.set(homeDropdown, { display: 'block', autoAlpha: 1, x: 0 })
        }
      }, 100)
    }
  }, [initialLoad, pathname])

  // Handle dropdown animations
  useEffect(() => {
    menuItems.forEach((item) => {
      const dropdownRef = dropdownRefsMap.current.get(item.title)
      if (dropdownRef) {
        if (activeItems.includes(item.title)) {
          // Show dropdown
          gsap.set(dropdownRef, { display: 'block', autoAlpha: 0, x: 10 })
          gsap.to(dropdownRef, {
            autoAlpha: 1,
            x: 0,
            duration: 0.2,
            ease: 'power3.in',
            stagger: {
              amount: 0.1,
              ease: 'back.out(1.7)',
            },
          })
        } else {
          // Hide dropdown
          gsap.to(dropdownRef, {
            autoAlpha: 0,
            x: 10,
            duration: 0.1,
            ease: 'power3.out',
            onComplete: () => {
              gsap.set(dropdownRef, {})
            },
          })
        }
      }
    })
  }, [activeItems])

  const handleDropdownClick = (title: string) => {
    if (window.innerWidth > 368) {
      setActiveItems((prev) => (prev.includes(title) ? [] : [title]))
    } else {
      setActiveItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
    }
  }

  const setDropdownRef = (el: HTMLUListElement | null, title: string) => {
    if (el) {
      dropdownRefsMap.current.set(title, el)

      // If this is the Home dropdown and we're on the homepage, make it visible immediately
      if (title === 'Home' && pathname === '/' && initialLoad) {
        gsap.set(el, { display: 'block', autoAlpha: 1, x: 0 })
      }
    }
  }

  const isLinkActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + '/')
  }

  return (
    <ul ref={ref} className="menu-list">
      {menuItems.map((item) => (
        <li
          key={item.title}
          className={`menu-list-item menu-list-item-anchor menu-text-hover hover:!text-[#9BCB4B] ${activeItems.includes(item.title) ? 'active' : ''}`}>
          {item.items ? (
            <div className="group relative flex items-center">
              <Link
                href={item.url}
                onClick={() => {
                  if (onItemClick) onItemClick()
                }}
                className={`menu-list-item-text text-[28px] leading-[70px] md:text-[42px] xl:text-[56px] xl:leading-[90px] ${activeItems.includes(item.title) ? 'text-[#F54BB4]' : 'text-white hover:text-[#9BCB4B]'}`}>
                {item.title}
              </Link>
              {/* Dropdown toggle button, only visible on mobile */}
              <button
                type="button"
                aria-label="Open submenu"
                onClick={(e) => {
                  e.preventDefault()
                  handleDropdownClick(item.title)
                }}
                className="z-10 ml-2 block p-2 md:hidden"
                tabIndex={0}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="#F54BB4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              href={item.url}
              onClick={() => {
                if (onItemClick) onItemClick()
              }}
              className={`menu-list-item-text text-[28px] leading-[70px] md:text-[42px] xl:text-[56px] xl:leading-[90px] ${activeItems.includes(item.title) ? 'text-[#F54BB4]' : 'text-white hover:text-[#9BCB4B]'}`}>
              {item.title}
            </Link>
          )}
          {item.items && (
            <ul
              ref={(el) => setDropdownRef(el, item.title)}
              className={`menu-list-item-dropdown relative left-0 h-fit max-h-[60vh] w-full gap-x-4 overflow-y-auto md:absolute md:left-[48%] md:max-h-none md:w-[350px] md:overflow-visible md:pb-0 lg:left-[33%] lg:w-[650px] xl:left-[44%] ${item.title === 'Home' ? '!grid !grid-cols-1 lg:-mt-[70px] lg:!grid-cols-2' : '!grid !grid-cols-1 lg:top-5'} ${activeItems.includes(item.title) || (item.title === 'Home' && pathname === '/' && initialLoad) ? 'block' : 'hidden'}`}>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <Link
                    href={subItem.url}
                    onClick={() => {
                      onItemClick && onItemClick()
                    }}
                    className={`menu-list-item-dropdown-list inline-block pb-1 pl-3 text-base leading-8 text-white hover:text-[#9BCB4B] md:text-2xl md:leading-[50px]`}>
                    {subItem.title.includes('-') ? (
                      <>
                        {subItem.title.split('-')[0]}-
                        <i className="font-instrument italic text-inherit">{subItem.title.split('-')[1]}</i>
                      </>
                    ) : (
                      subItem.title
                    )}
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
