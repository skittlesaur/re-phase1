import { useQuery } from 'react-query'
import api from '@lib/api'

const useCart = () => {
  const query = useQuery({
    queryKey: 'cart',
    queryFn: () => api.get('/user/customer/cart').then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  })

  return {
    cart: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}

export default useCart