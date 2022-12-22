import CloseIcon from '@icons/close-circle.svg'
import CheckmarkIcon from '@icons/checkmark-circle.svg'
import EditIcon from '@icons/create.svg'
import StarIcon from '@icons/star.svg'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import api from '@lib/api'

const Add = ({ close }: any) => {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('10')
  const [stock, setStock] = useState('10')
  const [category, setCategory] = useState('OUTFITS')
  const [type, setType] = useState('WINTER_OUTFITS')

  useEffect(() => {
    if (category === 'OUTFITS') {
      setType('WINTER_OUTFITS')
    }

    if (category === 'GROCERIES') {
      setType('BEVERAGE')
    }

    if (category === 'TOOLS') {
      setType('HAND_TOOL')
    }
  }, [category])
  const addMutation = useMutation({
    mutationFn: () => api.post('/user/seller/products', { name, price, stock, category, type }),
    onSuccess: async () => {
      await queryClient.invalidateQueries('products-seller')
      close()
      toast.success('Product added')
    },
  })

  const handleAdd = () => {
    if (!name) return toast.error('Product name is required')
    if (!price) return toast.error('Product price is required')
    if (!stock) return toast.error('Product stock is required')
    if (!category) return toast.error('Product category is required')
    if (!type) return toast.error('Product type is required')

    if (isNaN(Number(price))) return toast.error('Product price must be a number')
    if (isNaN(Number(stock))) return toast.error('Product stock must be a number')

    addMutation.mutate()
  }

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-md">
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          className="w-full border border-gray-200 rounded-md p-2 text-lg font-medium"
          placeholder="Product name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="flex items-center gap-1">
          <button
            disabled={addMutation.isLoading}
            onClick={close}
            className="w-6 aspect-square hover:opacity-60 transition-all duration-200 ease-in-out"
          >
            <CloseIcon className="fill-current" />
          </button>
          <button
            disabled={addMutation.isLoading}
            onClick={handleAdd}
            className="w-6 aspect-square hover:opacity-60 transition-all duration-200 ease-in-out"
          >
            <CheckmarkIcon className="fill-current" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-200 rounded-md p-2 text-sm"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border border-gray-200 rounded-md p-2 text-sm"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />
        <select
          className="border border-gray-200 rounded-md p-2 text-sm"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="OUTFITS">Outfits</option>
          <option value="GROCERIES">Groceries</option>
          <option value="TOOLS">Tools</option>
        </select>
        <select
          className="border border-gray-200 rounded-md p-2 text-sm"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          {category === 'OUTFITS' && (
            <>
              <option value="WINTER_OUTFITS">Winter Outfits</option>
              <option value="SUMMER_OUTFITS">Summer Outfits</option>
            </>
          )}
          {category === 'GROCERIES' && (
            <>
              <option value="BEVERAGE">Beverage</option>
              <option value="BAKED_GOOD">Baked Good</option>
              <option value="CANNED_GOOD">Canned Good</option>
              <option value="DAIRY">Dairy</option>
              <option value="BAKING_GOOD">Baking Good</option>
              <option value="FROZEN_GOOD">Frozen Good</option>
              <option value="MEAT">Meat</option>
            </>
          )}
          {category === 'TOOLS' && (
            <>
              <option value="HAND_TOOL">Hand Tool</option>
              <option value="POWER_TOOL">Power Tool</option>
            </>
          )}
        </select>
      </div>
    </div>
  )
}

export default Add