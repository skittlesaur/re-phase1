import { ReactNode } from 'react'

interface AppProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 w-full h-screen flex items-center justify-center">
      {children}
    </div>
  )
}

export default AppLayout