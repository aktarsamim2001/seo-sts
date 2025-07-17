'use client'

import { gsap } from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store/store'
import { fetchMenus } from '@/store/slice/menuSlice'

interface MenuListProps {
  onItemClick?: () => void
}

export const MenuList = forwardRef<HTMLUListElement, MenuListProps>(({ onItemClick }, ref) => {
  const pathname = usePathname()
  const dispatch = useDispatch()

  /* ------------- Redux state ------------- */
  const menuData = useSelector((s: RootState) => s.menus.data?.[0])
  const menuItems = menuData?.menu_items ?? []
  const loading = useSelector((s: RootState) => s.menus.status)
  const error = useSelector((s: RootState) => s.menus.error)
  console.log('Menu items:', menuItems) // Debugging line to check menu items
  /* ------------- Local state ------------- */
  const [activeParents, setActiveParents] = useState<string[]>([])
  const [initialLoad, setInitialLoad] = useState(true)
  const dropdownRefs = useRef(new Map<string, HTMLUListElement | null>())

  /* ------------- Effects ------------- */
  useEffect(() => {
    dispatch(fetchMenus())
  }, [dispatch])

  /* auto-detect active parent on route change */
  useEffect(() => {
    if (!menuItems.length) return

    let matched = false
    for (const item of menuItems) {
      if (item.sub_menues?.length) {
        const hit = item.sub_menues.some(
          (sub) => pathname === `/${sub.menu_item_slug}` || pathname.startsWith(`/${sub.menu_item_slug}/`),
        )
        if (hit) {
          setActiveParents([item.menu_item_title])
          matched = true
          break
        }
      }
    }

    if (!matched) {
      const topMatch = menuItems.find(
        (item) =>
          pathname === `/${item.menu_item_slug}` ||
          (item.menu_item_slug !== '#' && pathname.startsWith(`/${item.menu_item_slug}/`)),
      )
      if (topMatch) setActiveParents([topMatch.menu_item_title])
    }

    if (pathname === '/') setActiveParents(['Home'])
    setInitialLoad(false)
  }, [pathname, menuItems])

  /* GSAP animations */
  useEffect(() => {
    if (typeof window === 'undefined') return

    menuItems.forEach((item) => {
      const el = dropdownRefs.current.get(item.menu_item_title)
      if (!el) return

      if (activeParents.includes(item.menu_item_title)) {
        gsap.set(el, { display: 'block', autoAlpha: 0, x: 10 })
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          duration: 0.2,
          ease: 'power3.in',
          stagger: { amount: 0.1, ease: 'back.out(1.7)' },
        })
      } else {
        gsap.to(el, {
          autoAlpha: 0,
          x: 10,
          duration: 0.1,
          ease: 'power3.out',
          onComplete: () => gsap.set(el, { display: 'none' }),
        })
      }
    })
  }, [activeParents, menuItems])

  /* ------------- Handlers ------------- */
  const toggleDropdown = (title: string) =>
    setActiveParents((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))

  const setDropdownRef = (el: HTMLUListElement | null, title: string) => {
    if (el) dropdownRefs.current.set(title, el)
  }

  const isActive = (slug: string) => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`)

  /* ------------- Loading / error ------------- */
  if (loading) return <p className="px-4">Loading menu…</p>
  if (error) return <p className="px-4 text-red-500">{error}</p>

  /* ------------- Render ------------- */
  return (
    <ul ref={ref} className="menu-list">
      {menuItems.map((item) => (
        <li
          key={item.menu_item_id}
          className={`menu-list-item menu-list-item-anchor menu-text-hover hover:!text-[#9BCB4B] ${
            activeParents.includes(item.menu_item_title) ? 'active' : ''
          }`}
          onMouseEnter={() => setActiveParents([item.menu_item_title])}
          onMouseLeave={() => setActiveParents([])}>
          {item.sub_menues?.length ? (
            <div className="group relative flex items-center">
              <Link
                href={`/${item.menu_item_slug}`}
                onClick={onItemClick}
                className={`menu-list-item-text text-[28px] leading-[70px] md:text-[42px] xl:text-[56px] xl:leading-[90px] ${
                  activeParents.includes(item.menu_item_title) ? 'text-[#F54BB4]' : 'text-white hover:!text-[#9BCB4B]'
                }`}>
                {item.menu_item_title}
              </Link>

              {/* Mobile chevron */}
              <button
                type="button"
                aria-label="Open submenu"
                onClick={(e) => {
                  e.preventDefault()
                  toggleDropdown(item.menu_item_title)
                }}
                className="z-10 ml-2 block p-2 md:hidden">
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
              onClick={onItemClick}
              className={`menu-list-item-text text-[28px] leading-[70px] md:text-[42px] xl:text-[56px] xl:leading-[90px] ${
                activeParents.includes(item.menu_item_title) ? 'text-[#F54BB4]' : 'text-white hover:text-[#9BCB4B]'
              }`}>
              {item.menu_item_title}
            </Link>
          )}

          {/* Sub-menu */}
          {item.sub_menues && (
            <ul
              ref={(el) => setDropdownRef(el, item.menu_item_title)}
              className={`menu-list-item-dropdown relative left-0 h-fit max-h-[60vh] w-full gap-x-4 overflow-y-auto md:absolute md:left-[48%] md:max-h-none md:w-[350px] md:overflow-visible md:pb-0 lg:left-[33%] lg:w-[650px] xl:left-[44%] ${
                item.menu_item_title === 'Home'
                  ? '!grid !grid-cols-1 lg:-mt-[70px] lg:!grid-cols-2'
                  : '!grid !grid-cols-1 lg:top-5'
              } ${activeParents.includes(item.menu_item_title) ? 'block' : 'hidden'}`}>
              {item.sub_menues.map((sub) => (
                <li key={sub.menu_item_id} className="group cursor-pointer">
                  <Link
                    href={`/${sub.menu_item_slug}`}
                    onClick={onItemClick}
                    className="menu-list-item-dropdown-list block w-full pb-1 pl-3 text-base leading-8 text-white transition-colors duration-150 hover:!text-[#9BCB4B] md:text-2xl md:leading-[50px]">
                    {sub.menu_item_title.includes('-') ? (
                      <>
                        {sub.menu_item_title.split('-')[0]}-
                        <i className="font-instrument italic">{sub.menu_item_title.split('-')[1]}</i>
                      </>
                    ) : (
                      sub.menu_item_title
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
