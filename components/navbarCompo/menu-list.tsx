'use client'

import { gsap } from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useRef, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store/hook'
import { RootState } from '@/store/store'
import { fetchMenus } from '@/store/slice/menuSlice'

interface SubMenuItem {
  menu_item_id: number
  menu_item_title: string
  menu_item_slug: string
}

interface MenuItem {
  menu_item_id: number
  menu_item_title: string
  menu_item_slug: string
  sub_menues?: SubMenuItem[]
}

interface MenuListProps {
  onItemClick?: () => void
}

export const MenuList = forwardRef<HTMLUListElement, MenuListProps>((props, ref) => {
  const { onItemClick } = props
  const pathname = usePathname()
  const [activeItems, setActiveItems] = useState<string[]>([])
  const [initialLoad, setInitialLoad] = useState(true)
  const dropdownRefsMap = useRef(new Map<string, HTMLUListElement | null>())
  const dispatch = useAppDispatch()
  const menuDetails = useSelector((state: RootState) => state.menus)

  const menuItems: MenuItem[] = useMemo(() => {
    return menuDetails?.data?.length > 0 ? menuDetails?.data[0]?.menu_items : []
  }, [menuDetails])

  useEffect(() => {
    dispatch(fetchMenus())
  }, [dispatch])

  useEffect(() => {
    let foundParent = false

    menuItems.forEach((item) => {
      if (item.sub_menues && item.sub_menues.length > 0) {
        const activeSubItem = item.sub_menues.find(
          (subItem) => pathname === `/${subItem.menu_item_slug}` || pathname.startsWith(`/${subItem.menu_item_slug}/`),
        )

        if (activeSubItem) {
          setActiveItems([item.menu_item_title])
          foundParent = true
        }
      }
    })

    if (!foundParent) {
      const topLevelMatch = menuItems.find(
        (item) =>
          pathname === `/${item.menu_item_slug}` ||
          (item.menu_item_slug !== '#' && pathname.startsWith(`/${item.menu_item_slug}/`)),
      )

      if (topLevelMatch) {
        setActiveItems([topLevelMatch.menu_item_title])
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

  useEffect(() => {
    menuItems.forEach((item) => {
      const dropdownRef = dropdownRefsMap.current.get(item.menu_item_title)
      if (dropdownRef) {
        if (activeItems.includes(item.menu_item_title)) {
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
      if (title === 'Home' && pathname === '/' && initialLoad) {
        gsap.set(el, { display: 'block', autoAlpha: 1, x: 0 })
      }
    }
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
                href={item.menu_item_title === 'Home' ? '/' : `/${item.menu_item_slug}`}
                onClick={() => onItemClick?.()}
                className={`menu-list-item-text text-[28px] leading-[70px] md:text-[42px] xl:text-[56px] xl:leading-[90px] ${
                  activeItems.includes(item.menu_item_title) ? 'text-[#F54BB4]' : 'text-white hover:!text-[#9BCB4B]'
                }`}>
                {item.menu_item_title}
              </Link>
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
              href={item.menu_item_title === 'Home' ? '/' : `/${item.menu_item_slug}`}
              onClick={() => onItemClick?.()}
              className={`menu-list-item-text text-[28px] leading-[70px] md:text-[42px] xl:text-[56px] xl:leading-[90px] ${
                activeItems.includes(item.menu_item_title) ? 'text-[#F54BB4]' : 'text-white hover:text-[#9BCB4B]'
              }`}>
              {item.menu_item_title}
            </Link>
          )}

          {item.sub_menues && item.sub_menues.length > 0 && (
            <ul
              ref={(el) => setDropdownRef(el, item.menu_item_title)}
              className={`menu-list-item-dropdown relative h-fit max-h-[50vh] w-full gap-x-4 overflow-y-auto md:absolute md:left-1/2 md:w-[350px] md:-translate-x-1/2 md:overflow-visible md:pb-0 lg:w-[650px] xl:w-[700px] ${
                item.menu_item_title === 'Home'
                  ? '!grid !grid-cols-1 lg:-mt-[70px] lg:!grid-cols-2'
                  : '!grid !grid-cols-1 items-center lg:-mt-[70px]'
              } ${activeItems.includes(item.menu_item_title) || (item.menu_item_title === 'Home' && pathname === '/' && initialLoad) ? 'block' : 'hidden'}`}>
              {item.sub_menues.map((subItem) => (
                <li key={`${subItem.menu_item_id}-${subItem.menu_item_slug}`} className="group cursor-pointer">
                  <Link
                    href={`/services/${subItem.menu_item_slug}`}
                    onClick={() => onItemClick?.()}
                    className="menu-list-item-dropdown-list block w-full pb-1 pl-3 text-base leading-8 text-white transition-colors duration-150 hover:!text-[#9BCB4B] md:text-2xl md:leading-[50px]"
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
