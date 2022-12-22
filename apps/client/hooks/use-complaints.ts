import { useQuery } from 'react-query'
import api from '@lib/api'

const useComplaints = (role: 'CUSTOMER' | 'CUSTOMER_SERVICE') => {
  const query = useQuery({
    queryKey: 'complaints',
    queryFn: () => api.get(`/user/${role === 'CUSTOMER' ? 'customer/myComplaints' : 'customer-service'}`).then((res) => res.data),
  })

  return {
    complaints: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}

export default useComplaints