import RefreshIcon from '@icons/reload-circle.svg'
import AddIcon from '@icons/add-circle.svg'
import RemoveIcon from '@icons/remove-circle.svg'
import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import toast from 'react-hot-toast'

const Product = ({ item }: any) => {
  const queryClient = useQueryClient()

  const addToCart = useMutation({
    mutationKey: 'addToCart',
    mutationFn: ({ productId }: { productId: string }) => api.post(`/user/customer/cart`, { productId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries('cart')
      toast.success('Added to cart')
    },
  })

  const deleteFromCart = useMutation({
    mutationKey: 'deleteFromCart',
    mutationFn: ({ productId }: { productId: string }) => api.delete(`/user/customer/cart/${productId}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries('cart')
      toast.success('Removed from cart')
    },
  })

  return (
    <div
      key={item.id}
      className="flex flex-col gap-1 p-4 border border-gray-200 rounded-md"
    >
      <h1 className="text-lg font-medium">
        {item.product.name}
      </h1>
      <p className="text-sm text-gray-500">
        {item.quantity} x ${item.product.price}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 mt-4">
          <button
            disabled={addToCart.isLoading}
            onClick={() => addToCart.mutate({ productId: item.product.id })}
            className="flex items-center gap-1 text-sm text-gray-500 hover:opacity-60 transition-all duration-200 ease-in-out"
          >
            {addToCart.isLoading ? (
              <RefreshIcon className="w-4 h-4 animate-spin" />
            ) : (
              <AddIcon className="w-4 h-4" />
            )}
            Add more
          </button>
          <button
            disabled={deleteFromCart.isLoading}
            onClick={() => deleteFromCart.mutate({ productId: item.product.id })}
            className="flex items-center gap-1 text-sm text-gray-500 hover:opacity-60 transition-all duration-200 ease-in-out"
          >
            {deleteFromCart.isLoading ? (
              <RefreshIcon className="w-4 h-4 animate-spin" />
            ) : (
              <RemoveIcon className="w-4 h-4" />
            )}
            Remove
          </button>
        </div>
        <p className="text-lg font-medium">
          ${item.product.price * item.quantity}
        </p>
      </div>
    </div>
  )
}

export default Product