import Loader from '@components/loader'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import { useEffect } from 'react'
import useUser from '@hooks/use-user'

const Logout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { user, isLoading, isError } = useUser()
  console.log(isError)
  const mutation = useMutation({
    mutationKey: 'logout',
    mutationFn: () => api.post('/user/logout').then((res) => res.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries('user')
      router.push('/login')
    },
    onError: () => {
      router.push('/login')
    },
  })

  useEffect(() => {
    if (!isLoading && user) {
      mutation.mutate()
    }

    if (isError) {
      router.push('/login')
    }
  }, [isLoading, user, user])

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default Logout