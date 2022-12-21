import useUser from '@hooks/use-user'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const EnsureLoggedIn = () => {
  const router = useRouter()
  const { user, isLoading, isError } = useUser()

  useEffect(() => {
    if (isLoading) return

    if (isError || !user)
      router.push(`/login?message=You must be logged in to view this page.`)
  }, [user, isError, isLoading])

  return (
    <>
    </>
  )
}

export default EnsureLoggedIn