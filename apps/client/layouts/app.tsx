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
    </div>
  )
}

export default AppLayout