import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import { API_URL } from '@lib/constants'
import toast from 'react-hot-toast'
import ChevronForwardIcon from '@icons/chevron-forward.svg'
import AddCircleIcon from '@icons/add-circle.svg'
import ReloadCircleIcon from '@icons/reload-circle.svg'
import useUser from '@hooks/use-user'
import StarIcon from '@icons/star.svg'
import { useState } from 'react'

const Product = ({ product }: any) => {
  const { user } = useUser()
  const queryClient = useQueryClient()
  const [hoveredStar, setHoveredStar] = useState(-1)

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

  const ratingMutation = useMutation({
      mutationKey: 'rating',
      mutationFn: (rating: any) => api.post(`${API_URL}/user/customer/review`, rating),
      onSuccess: async () => {
        await queryClient.invalidateQueries('products')
        toast.success('Rating added successfully')
      },
      onError: (e: any) => {
        const data = e.response.data
        toast.error(data.error ?? data.message)
      },
    },
  )

  const handleRating = (rating: number) => {
    if (ratingMutation.isLoading) return toast.error('Please wait, rating is being added', {
      icon: '⏳',
    })
    if (user) {
      ratingMutation.mutate({ productId: product.id, rating })
    } else {
      toast.error('Please login to rate')
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
        <div className="flex gap-3">
          <div className="flex gap-1" onMouseLeave={() => setHoveredStar(-1)}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                onClick={() => handleRating(i + 1)}
                key={i}
                onMouseEnter={() => setHoveredStar(i)}
                className={`cursor-pointer w-4 aspect-square ${ratingMutation.isLoading ? 'animate-pulse' : ''} transition-all duration-300 ease-in-out ${hoveredStar !== -1 && hoveredStar < i ? 'opacity-50' : 'opacity-100'} ${i + 1 <= Math.round(product.rating?.average) ? `${product.rating?.ids?.includes(user?.id ?? '') ? 'fill-yellow-600' : 'fill-yellow-500'}` : 'fill-gray-600/50'}`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-xs">
            {product.rating?.count ? `${parseFloat(product.rating?.average ?? 0).toFixed(2)} - ${product.rating.count} Rating${`${product.rating.count > 1 ? 's' : ''}`}` : 'No ratings'}
          </span>
        </div>
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