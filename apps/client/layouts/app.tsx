import { ReactNode } from 'react'
import Nav from '@components/nav'

interface AppProps {
  children: ReactNode
  currentPage: 'home' | 'contact'
}

const AppLayout = ({ children, currentPage }: AppProps) => {
  return (
    <div className="min-h-screen">
      <Nav currentPage={currentPage} />
      <div className="max-w-screen-xl mx-auto px-2 md:px-0 py-12">
        {children}
      </div>
    </div>
  )
}

export default AppLayout