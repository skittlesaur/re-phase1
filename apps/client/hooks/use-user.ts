import { useQuery } from 'react-query'
import api from '@lib/api'

const useUser = () => {
  const query = useQuery({
    queryKey: 'user',
    queryFn: () => api.get('/user').then((res) => res.data),
    staleTime: 120000,
    retry: 1,
  })

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}

export default useUser