import useUser from '@hooks/use-user'
import register from '../../../server/src/controllers/user/register'
import Register from './register'
import { useState } from 'react'
import Login from './login'
import SEO from 'ui/seo'

const Authentication = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  return (
    <div className="flex flex-col gap-8 w-full h-[70vh] items-center justify-center">
      <SEO title={`${isLogin ? 'Login' : 'Register'}`} />
      <h1 className="text-2xl">
        {isLogin ? 'Login' : 'Register'}
      </h1>
      <div className="flex flex-col gap-4">
        {isLogin ? (
          <Login />
        ) : (
          <Register />
        )}
        <div className="flex items-center gap-1">
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          </p>
          <button
            className="text-sm font-medium hover:text-white hover:bg-black hover:px-2 py-1 rounded-md transition-all duration-200 ease-in-out"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Authentication
