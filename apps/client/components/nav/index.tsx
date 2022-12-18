import Link from 'next/link'
import SearchIcon from '@icons/search.svg'
import PersonIcon from '@icons/person.svg'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
}

const Nav = ({ currentPage }: NavProps) => {
  const [isSearchActive, setIsSearchActive] = useState(false)

  return (
    <header className="sticky top-0 backdrop-blur border-b border-gray-200">
      {isSearchActive && (
        <div
          onClick={() => setIsSearchActive(false)}
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
          <div className="flex items-center gap-1.5">
            <div className="relative min-w-[1.5rem]">
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
                    className="relative pl-8 bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                disabled={isSearchActive}
                className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 w-6 p-1 rounded-full hover:bg-gray-200 aspect-square transition-all duration-200 ease-in-out disabled:hover:bg-inherit"
              >
                <SearchIcon className="fill-current" />
              </button>
            </div>
            <Link
              href="/login"
              className="text-gray-500 w-7 p-1.5 rounded-full hover:bg-gray-200 aspect-square transition-all duration-200 ease-in-out"
            >
              <PersonIcon className="fill-current" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav