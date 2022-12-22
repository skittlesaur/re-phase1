import useUser from '@hooks/use-user'
import Loader from '@components/loader'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import api from '@lib/api'
import { useEffect, useState } from 'react'
import Product from '@components/seller/product'
import AddIcon from '@icons/add-circle.svg'
import Add from '@components/seller/add'

const Seller = () => {
  const router = useRouter()
  const { user, isLoading: userLoading } = useUser()
  const [isAddProduct, setIsAddProduct] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'PRODUCTS_SELLER') {
      router.push('/')
    }
  }, [user])

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: 'products-seller',
    queryFn: () => api.get('/user/seller/products').then(res => res.data),
    enabled: !!user,
  })

  if (userLoading || productsLoading) return <Loader />

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl">
          My Products
        </h1>
        <button
          onClick={() => setIsAddProduct(true)}
          className="w-7 aspect-square hover:opacity-60 transition-all duration-200 ease-in-out"
        >
          <AddIcon />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {isAddProduct && (
          <Add close={() => setIsAddProduct(false)} />
        )}
        {products.map((product: any) => <Product key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export default Seller