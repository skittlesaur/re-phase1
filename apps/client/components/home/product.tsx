import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import { API_URL } from '@lib/constants'
import toast from 'react-hot-toast'
import ChevronForwardIcon from '@icons/chevron-forward.svg'
import AddCircleIcon from '@icons/add-circle.svg'
import ReloadCircleIcon from '@icons/reload-circle.svg'
import useUser from '@hooks/use-user'

const Product = ({ product }: any) => {
  const { user } = useUser()
  const queryClient = useQueryClient()

  const addToCart = useMutation({
    mutationKey: 'addToCart',
    mutationFn: (productId: string) => api.post(`${API_URL}/user/customer/cart`, { productId }),
    onSuccess: () => {
      toast.success('Added to cart')
      queryClient.invalidateQueries('cart')
    },
    onError: (e: any) => {
      const data = e.response.data
      toast.error(data.error ?? data.message)
    },
    retryDelay: 1000,
    retry: 0,
  })

  const handleAddToCart = (id: string) => {
    if (addToCart.isLoading) return
    if (user) {
      addToCart.mutate(id)
    } else {
      toast.error('Please login to add to cart')
    }
  }

  return (
    <div
      key={product.id}
      className="flex bg-gray-50 pl-4 pr-2 py-2 rounded-lg border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
    >
      <div className="flex flex-col gap-1 grow">
        <p className="capitalize flex gap-1 items-center text-xs text-gray-500">
          {product.category.toLowerCase()}
          <ChevronForwardIcon className="w-3 aspect-square fill-current" />
          {product.toolType?.replace('_', ' ').toLowerCase()}
        </p>
        <p>
          {product.name}
        </p>
        <p className="text-gray-600 text-sm font-medium">
          {product.price} EGP
        </p>
      </div>
      <button
        disabled={addToCart.isLoading}
        onClick={() => handleAddToCart(product.id)}
        className="w-7 hover:scale-110 aspect-square self-end justify-self-end transition-all duration-200 ease-in-out"
      >
        {!addToCart.isLoading && <AddCircleIcon key="add" className="fill-current" />}
        {addToCart.isLoading && <ReloadCircleIcon key="load" className="fill-current animate-spin" />}
      </button>
    </div>
  )
}

export default Product