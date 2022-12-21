import Authentication from '../components/authentication/index'
import AppLayout from '@layouts/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const router = useRouter()

  useEffect(() => {
    const { message } = router.query

    if (message) {
      toast.error(message as string)
    }
  }, [router])
  return (
    <AppLayout>
      <Authentication />
    </AppLayout>
  )
}

export default LoginPage
