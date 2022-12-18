import Link from 'next/link'
import SearchIcon from '@icons/search.svg'
import CartIcon from '@icons/cart.svg'
import PersonIcon from '@icons/person.svg'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useUser from '@hooks/use-user'
import useCart from '@hooks/use-cart'

const pages = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
]

interface NavProps {
  currentPage: 'home' | 'contact'
  search: (query: string) => void
  isSearching?: boolean
}

const Nav = ({ currentPage, search, isSearching }: NavProps) => {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const { user } = useUser()
  const { cart } = useCart()

  const countItems = useMemo(() => {
    if (!cart) return 0
    let count = 0

    cart.cartItems.forEach((item: any) => {
      count += item.quantity
    })

    return count
  }, [cart])

  return (
    <header className="sticky top-0 backdrop-blur border-b border-gray-200">
      {isSearchActive && (
        <div
          onClick={() => {
            setIsSearchActive(false)
            search('')
          }}
          className="z-[-1] fixed top-0 w-full h-screen"
        />
      )}
      <div className="max-w-screen-xl py-3 mx-auto flex items-center justify-between">
        <h1 className="font-semibold italic">
          factory
        </h1>
        <div className="flex items-center gap-6">
          <nav>
            <ul className="flex items-center gap-2 text-sm">
              {pages.map(page => (
                <li key={page.href}>
                  <Link
                    className={`${currentPage === page.title.toLowerCase() ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}  transition-colors duration-200 ease-in-out`}
                    href={page.href}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <div className="relative min-w-[1.5rem] min-h-[1.5rem]">
              <AnimatePresence mode="wait">
                {isSearchActive && (
                  <motion.input
                    initial={{ width: 0 }}
                    animate={{ width: '10rem' }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.05, type: 'tween' }}
                    key="search-input"
                    placeholder="Search"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={e => search(e.target.value)}
                    className="relative pl-8 bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                disabled={isSearchActive}
                className={`absolute ${isSearchActive ? 'left-1' : 'left-0'} top-1/2 -translate-y-1/2 text-gray-500 w-6 p-1 rounded-full hover:bg-gray-200 aspect-square transition-all duration-200 ease-in-out disabled:hover:bg-inherit`}
              >
                {!isSearching && <SearchIcon className="fill-current" />}
                {isSearching && (
                  <div className="flex items-center justify-center gap-[2px]">
                    <div className="w-2 aspect-square bg-current rounded-full animate-pulse " />
                    <div className="w-2 aspect-square bg-current rounded-full animate-pulse delay-200" />
                    <div className="w-2 aspect-square bg-current rounded-full animate-pulse delay-400" />
                  </div>
                )}
              </button>
            </div>
            {user?.role === 'CUSTOMER' && (
              <Link
                href="/cart"
                className="group relative text-gray-500 w-7 p-1.5 rounded-full hover:bg-gray-200 aspect-square transition-all duration-200 ease-in-out"
              >
                {countItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 group-hover:text-black rounded-full w-4 flex items-center justify-center aspect-square text-xs transition-all duration-200 ease-in-out">
                    {countItems}
                  </span>
                )}
                <CartIcon className="fill-current" />
              </Link>
            )}
            {user ? (
              <div className="relative group">
                <div className="text-gray-500 w-7 p-1.5 rounded-full aspect-square transition-all duration-200 ease-in-out">
                  <PersonIcon className="fill-current" />
                </div>
                <div className="group-hover:block hidden absolute top-full right-0 pt-2.5">
                  <div className="w-40 py-2 bg-white rounded border border-gray-300 shadow-md flex flex-col">
                    <Link
                      className="w-full px-4 text-sm py-2 hover:bg-gray-100"
                      href="/profile"
                    >
                      Profile
                    </Link>
                    <Link
                      className="w-full px-4 text-sm py-2 hover:bg-gray-100"
                      href="/history"
                    >
                      Orders
                    </Link>
                    <Link
                      className="w-full px-4 text-sm py-2 hover:bg-gray-100"
                      href="/reviews"
                    >
                      Reviews
                    </Link>
                    <Link
                      className="w-full px-4 text-sm py-2 hover:bg-gray-100"
                      href="/signout"
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-gray-500 w-7 p-1.5 rounded-full hover:bg-gray-200 aspect-square transition-all duration-200 ease-in-out"
              >
                <PersonIcon className="fill-current" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav