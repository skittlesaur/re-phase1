import Loader from '@components/loader'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import { useEffect } from 'react'
import useUser from '@hooks/use-user'

const Logout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { user, isLoading } = useUser()

  const mutation = useMutation({
    mutationKey: 'logout',
    mutationFn: () => api.post('/user/logout').then((res) => res.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries('user')
      router.reload()
    },
  })

  useEffect(() => {
    if (!isLoading && user) {
      mutation.mutate()
    }

    if (!isLoading && !user) {
      router.push('/')
    }
  }, [isLoading, user, mutation])

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default Logout