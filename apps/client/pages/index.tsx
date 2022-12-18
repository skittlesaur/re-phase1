import AppLayout from '@layouts/app'
import Home from '@components/home'
import SEO from 'ui/seo'
import api from '@lib/api'
import { useMutation, useQuery } from 'react-query'

const HomePage = ({ products }: any) => {
  const mutation = useMutation({
    mutationKey: 'search',
    mutationFn: (query: string) => api.post('/products/search', { query }).then((res) => res.data),
    retry: 0,
  })

  return (
    <AppLayout
      currentPage="home"
      search={(query: string) => mutation.mutate(query)}
      isSearching={mutation.isLoading}
    >
      <SEO
        title="factory - Home"
      />
      <Home
        products={products}
        searchResult={mutation.data}
      />
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