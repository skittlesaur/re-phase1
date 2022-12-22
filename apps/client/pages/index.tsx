import AppLayout from '@layouts/app'
import Home from '@components/home'
import SEO from 'ui/seo'
import api from '@lib/api'
import { useMutation } from 'react-query'

const HomePage = () => {
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
        searchResult={mutation.data}
      />
    </AppLayout>
  )
}

export default HomePage