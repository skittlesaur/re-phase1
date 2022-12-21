import Product from '@components/home/product'

const Home = ({ products, searchResult }: any) => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">
        Products
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {!searchResult && products.map((product: any) => (
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