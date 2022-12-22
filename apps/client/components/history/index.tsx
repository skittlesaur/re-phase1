import { useQuery } from 'react-query'
import api from '@lib/api'

const History = () => {
  const { data: history, isLoading, isError } = useQuery({
    queryKey: 'history',
    queryFn: () => api.get('/user/history').then((res) => res.data),
  })
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">
        Order History
      </h1>
    </div>
  )
}

export default History