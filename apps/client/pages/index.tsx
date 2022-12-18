import AppLayout from '@layouts/app'
import Home from '@components/home'
import SEO from 'ui/seo'
import api from '@lib/api'

const HomePage = ({ products }: any) => {
  return (
    <AppLayout currentPage="home">
      <SEO
        title="factory - Home"
      />
      <Home products={products} />
    </AppLayout>
  )
}

export const getStaticProps = async () => {
  const { data: products } = await api.get('/products')

  return {
    props: {
      products,
    },
  }
}

export default HomePage