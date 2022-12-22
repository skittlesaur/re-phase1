import Product from '@components/home/product'
import useProducts from '@hooks/use-products'
import Loader from '@components/loader'

const Home = ({ searchResult }: any) => {
  const { products, isLoading } = useProducts()

  if (isLoading) return <Loader />

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">
        Products
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {!searchResult && products?.map((product: any) => (
          <Product product={product} key={product.id} />
        ))}
        {searchResult && searchResult.map((product: any) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default Home