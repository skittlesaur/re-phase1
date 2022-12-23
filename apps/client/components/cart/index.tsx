import useCart from '@hooks/use-cart'
import Loader from '@components/loader'
import Product from '@components/cart/product'
import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

const Cart = () => {
  const router = useRouter()
  const { cart, isLoading, isError } = useCart()

  const checkout = useMutation({
    mutationKey: 'checkout',
    mutationFn: () => api.post(`/user/customer/purchase`),
    onSuccess: async () => {
      toast.success('Checkout successful')
      router.push('/orders')
    },
    onError: (e: any) => {
      const data = e.response.data
      toast.error(data.error ?? data.message)
      router.reload()
    },
  })

  if (isLoading) return <Loader />

  const calculateTotal = () => {
    return cart.cartItems.reduce((acc: any, item: any) => acc + item.product.price * item.quantity, 0)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">
          Cart
        </h1>
        {cart?.cartItems?.length > 0 && (
          <button
            disabled={checkout.isLoading}
            onClick={() => checkout.mutate()}
            className="w-32 h-10 flex items-center justify-center border border-gray-300 hover:border-black px-4 py-2 rounded-md hover:bg-black hover:text-white hover:shadow-md transition-all duration-200 ease-in-out"
          >
            {checkout.isLoading ? (
              <Loader full={false} />
            ) : (
              'Checkout'
            )}
          </button>
        )}
      </div>
      {(isError || !cart || cart?.cartItems.length === 0) && (
        <p className="text-gray-500 w-full text-center">
          Your cart is empty
        </p>
      )}
      {cart && cart?.cartItems.length > 0 && (
        <>
          <div className="flex flex-col gap-4">
            {cart.cartItems.map((item: any) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-end px-4">
            <p className="text-lg font-medium">
              Total: ${calculateTotal()}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart