import { ReactNode, useMemo } from 'react'
import Nav from '@components/nav'
import useUser from '@hooks/use-user'
import { useRouter } from 'next/router'

interface AppProps {
  children: ReactNode
  currentPage?: 'home' | 'contact' | 'other'
  search?: (query: string) => void
  isSearching?: boolean
}

const AppLayout = ({ children, currentPage, search, isSearching }: AppProps) => {
  const router = useRouter()
  const { user, isLoading } = useUser()

  const isPathAllowed = useMemo(() => {
    if (user?.role === 'PRODUCTS_SELLER') {
      return router.pathname.includes('seller') || router.pathname === '/profile' || router.pathname === '/logout'
    }
    return true
  }, [router.pathname, user])

  if (!isLoading && !isPathAllowed) {
    router.push('/seller')
    return <></>
  }

  return (
    <div className="min-h-screen">
      <Nav currentPage={currentPage} search={search} isSearching={isSearching} />
      <div className="max-w-screen-xl mx-auto px-2 md:px-0 py-12">
        {children}
      </div>
    </div>
  )
}

export default AppLayout