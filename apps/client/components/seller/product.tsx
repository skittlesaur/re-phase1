import { useState } from 'react'
import EditIcon from '@icons/create.svg'
import StarIcon from '@icons/star.svg'
import CheckmarkIcon from '@icons/checkmark-circle.svg'
import CloseIcon from '@icons/close-circle.svg'
import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'
import toast from 'react-hot-toast'
import TrashIcon from '@icons/trash.svg'

const Product = ({ product }: any) => {
  const queryClient = useQueryClient()
  const ratingsSum = product.Review.reduce((acc: any, review: any) => acc + review.rating, 0)
  const ratingsCount = product.Review.length
  const averageRating = isNaN(ratingsSum / ratingsCount) ? -1 : (ratingsSum / ratingsCount)
  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [stock, setStock] = useState(product.stock)

  const editMutation = useMutation({
    mutationFn: () => api.put(`/user/seller/products`, { id: product.id, name, price, stock }),
    onSuccess: async () => {
      await queryClient.invalidateQueries('products-seller')
      setIsEditing(false)
      toast.success('Product updated')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/user/seller/products/${product.id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries('products-seller')
      toast.success('Product deleted')
    },
  })

  const handleEdit = () => {
    const isChanged = name !== product.name || price !== product.price || stock !== product.stock
    if (isChanged) {
      editMutation.mutate()
    } else {
      toast.error('No changes made')
    }
  }

  return (
    <div
      key={product.id}
      className="flex flex-col gap-1 p-4 border border-gray-200 rounded-md"
    >
      <div className="flex items-center justify-between gap-4">
        {isEditing ? (
          <input
            type="text"
            className="w-full border border-gray-200 rounded-md p-2 text-lg font-medium"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        ) : (
          <h1 className="text-lg font-medium">
            {product.name}
          </h1>
        )}
        {isEditing && (
          <div className="flex items-center gap-1">
            <button
              disabled={editMutation.isLoading}
              onClick={() => {
                setIsEditing(false)
                setName(product.name)
                setPrice(product.price)
                setStock(product.stock)
              }}
              className="w-6 aspect-square hover:opacity-60 transition-all duration-200 ease-in-out"
            >
              <CloseIcon className="fill-current" />
            </button>
            <button
              disabled={editMutation.isLoading}
              onClick={handleEdit}
              className="w-6 aspect-square hover:opacity-60 transition-all duration-200 ease-in-out"
            >
              <CheckmarkIcon className="fill-current" />
            </button>
          </div>
        )}
        {!isEditing && (
          <div className="flex items-center gap-1">
            <button
              disabled={deleteMutation.isLoading}
              onClick={() => deleteMutation.mutate()}
              className="w-6 aspect-square hover:opacity-60 transition-all duration-200 ease-in-out"
            >
              <TrashIcon className="fill-current" />
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="w-6 aspect-square hover:opacity-60 transition-all duration-200 ease-in-out"
            >
              <EditIcon className="fill-current" />
            </button>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">
        ${isEditing ? (
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-200 rounded-md p-2 text-sm"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      ) : (
        product.price
      )} - {isEditing ? (
        <input
          type="number"
          placeholder="Stock"
          className="border border-gray-200 rounded-md p-2 text-sm"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />
      ) : (
        product.stock
      )} in stock
      </p>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`w-4 aspect-square ${averageRating === -1 ? 'fill-gray-500' : 'fill-yellow-500'} ${Math.round(averageRating) > i ? '' : 'invisible'}`}
            />
          ))}
        </div>
        <p>
          {averageRating === -1 ? 'No Ratings' : (
            <>
              {averageRating.toFixed(2)}({ratingsCount})
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default Product