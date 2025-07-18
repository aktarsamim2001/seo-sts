'use client'

import { gsap } from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useRef, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { fetchMenus } from '@/store/slice/menuSlice'

interface MenuItemProps {
  title: string
  url: string
  id: string
  items?: { title: string; url: string; id: string; isActive?: boolean }[]
  isActive?: boolean
}

// const menuItems: MenuItemProps[] = [
//   {
//     title: 'Home',
//     url: '/',
//     id: 'home',
//   },
//   {
//     title: 'About Us',
//     url: '/about',
//     id: 'about',
//   },
//   {
//     title: 'Services',
//     url: '/services', // Changed from '#' to '/services'
//     id: 'services',
//     items: [
//       { id: 'brand-identity', title: 'Brand Identity Design', url: '/services/brand-identity' },
//       { id: 'illustration', title: 'Illustration & Custom Graphics', url: '/services/illustration' },
//       { id: 'packaging', title: 'Packaging & Print Design', url: '/services/packaging' },
//       { id: 'photo', title: 'Photo & Image Production', url: '/services/photo' },
//       { id: 'video', title: 'Video & Motion Services', url: '/services/video' },
//       { id: 'web-digital', title: 'Web & Digital Design', url: '/services/web-digital' },
//       { id: 'social-media', title: 'Social Media Content Design', url: '/services/social-media' },
//       { id: 'copywriting', title: 'Copywriting & Content Strategy', url: '/services/copywriting' },
//       { id: 'digital-marketing', title: 'Digital Marketing Services', url: '/services/digital-marketing' },
//     ],
//   },
//   {
//     title: 'Portfolio',
//     url: '/portfolio-agency/case-study',
//     id: 'portfolio',
//   },
//   {
//     title: 'Blog',
//     url: '/ai-blog',
//     id: 'blog',
//   },
//   {
//     title: 'Contact Us',
//     url: '/contact',
//     id: 'contact',
//   },
// ]

interface MenuListProps {
  onItemClick?: () => void
}

export const MenuList = forwardRef<HTMLUListElement, MenuListProps>((props, ref) => {
  const { onItemClick } = props
  const pathname = usePathname()
  const [activeItems, setActiveItems] = useState<string[]>([])
  const [initialLoad, setInitialLoad] = useState(true)
  const dropdownRefsMap = useRef(new Map<string, HTMLUListElement | null>())
  const dispatch = useDispatch()
  const menuDetails = useSelector((state: RootState) => state.menus)

  const menuItems = useMemo(() => {
    return menuDetails?.data?.length > 0 ? menuDetails?.data[0]?.menu_items : []
  }, [menuDetails])
  // If your API returns the array directly, use: const menuItems = menuDetails?.data || []
  console.log('Menu items:', menuItems) // Debugging line to check menu details

  useEffect(() => {
    dispatch(fetchMenus())
  }, [dispatch])

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
  }, [pathname, menuItems])

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
  }, [activeItems, menuItems])

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
          key={item.menu_item_id}
          className={`menu-list-item menu-list-item-anchor menu-text-hover hover:!text-[#9BCB4B] ${activeItems.includes(item.menu_item_title) ? 'active' : ''}`}
          onMouseEnter={() => setActiveItems([item.menu_item_title])}
          onMouseLeave={() => setActiveItems([])}>
          {item.sub_menues && item.sub_menues.length > 0 ? (
            <div className="group relative flex items-center">
              <Link
                href={`/${item.menu_item_slug}`}
                onClick={() => {
                  if (onItemClick) onItemClick()
                }}
                className={`menu-list-item-text text-[28px] leading-[70px] md:text-[42px] xl:text-[56px] xl:leading-[90px] ${activeItems.includes(item.menu_item_title) ? 'text-[#F54BB4]' : 'text-white hover:!text-[#9BCB4B]'}`}>
                {item.menu_item_title}
              </Link>
              {/* Dropdown toggle button, only visible on mobile */}
              <button
                type="button"
                aria-label="Open submenu"
                onClick={(e) => {
                  e.preventDefault()
                  handleDropdownClick(item.menu_item_title)
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
              href={`/${item.menu_item_slug}`}
              onClick={() => {
                if (onItemClick) onItemClick()
              }}
              className={`menu-list-item-text text-[28px] leading-[70px] md:text-[42px] xl:text-[56px] xl:leading-[90px] ${activeItems.includes(item.menu_item_title) ? 'text-[#F54BB4]' : 'text-white hover:text-[#9BCB4B]'}`}>
              {item.menu_item_title}
            </Link>
          )}
          {item.sub_menues && item.sub_menues.length > 0 && (
            <ul
              ref={(el) => setDropdownRef(el, item.menu_item_title)}
              className={`menu-list-item-dropdown relative left-0 h-fit max-h-[60vh] w-full gap-x-4 overflow-y-auto md:absolute md:left-[48%] md:max-h-none md:w-[350px] md:overflow-visible md:pb-0 lg:left-[33%] lg:w-[650px] xl:left-[44%] ${item.menu_item_title === 'Home' ? '!grid !grid-cols-1 lg:-mt-[70px] lg:!grid-cols-2' : '!grid !grid-cols-1 lg:top-5'} ${activeItems.includes(item.menu_item_title) || (item.menu_item_title === 'Home' && pathname === '/' && initialLoad) ? 'block' : 'hidden'}`}>
              {item.sub_menues.map((subItem) => (
                <li key={subItem.menu_item_id + '-' + subItem.menu_item_slug} className="group cursor-pointer">
                  <Link
                    href={`/${subItem.menu_item_slug}`}
                    onClick={() => {
                      onItemClick && onItemClick()
                    }}
                    className={`menu-list-item-dropdown-list block w-full pb-1 pl-3 text-base leading-8 text-white transition-colors duration-150 hover:!text-[#9BCB4B] md:text-2xl md:leading-[50px]`}
                    tabIndex={0}>
                    {subItem.menu_item_title.includes('-') ? (
                      <>
                        {subItem.menu_item_title.split('-')[0]}-
                        <i className="font-instrument italic text-inherit">{subItem.menu_item_title.split('-')[1]}</i>
                      </>
                    ) : (
                      subItem.menu_item_title
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
