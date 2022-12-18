import Product from '@components/home/product'

const Home = ({ products }: any) => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">
        Products
      </h1>
      {products && (
        <div className="grid grid-cols-5 gap-4">
          {products.map((product: any) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home