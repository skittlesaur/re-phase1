import { useQuery } from 'react-query'
import api from '@lib/api'
import Loader from '@components/loader'

const History = () => {
  const { data: history, isLoading, isError } = useQuery({
    queryKey: 'history',
    queryFn: () => api.get('/user/customer/history').then((res) => res.data),
  })

  const formatDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  if (isLoading) return <Loader />

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">
        Order History
      </h1>
      <div className="flex flex-col gap-10">
        {history.map((order: any) => (
          <div className="flex flex-col gap-2 border border-gray-200 rounded-lg">
            <div className="flex flex-col bg-gray-100 px-8 py-3">
              <h2 className="text-lg">
                Order #{order.id}
              </h2>
              <p className="text-gray-500 text-sm">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="flex flex-col gap-2 px-8">
              {order.items.map((item: any, idx: number) => (
                <div className={`flex items-center justify-between gap-2 ${idx === 0 ? '' : 'border-t border-gray-200'} py-2`}>
                  <div className="flex flex-col">
                    <h3>
                      {item.productName}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {item.quantity} x ${item.productPrice}
                    </p>
                  </div>
                  <p className="text-lg text-gray-500">
                    ${item.quantity * item.productPrice}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end px-8 font-medium py-3">
              <p className="text-lg">
                Total: ${order.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History