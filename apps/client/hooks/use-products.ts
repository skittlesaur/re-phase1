import { useQuery } from 'react-query'
import api from '@lib/api'

const useProducts = () => {
  const query = useQuery({
    queryKey: 'products',
    queryFn: () => api.get('/products').then((res) => res.data),
  })

  return {
    products: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}

export default useProducts