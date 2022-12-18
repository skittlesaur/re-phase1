import AppLayout from '@layouts/app'
import Home from '@components/home'
import SEO from 'ui/seo'

const HomePage = () => {
  return (
    <AppLayout currentPage="home">
      <SEO
        title="baraa.app"
      />
      <Home />
    </AppLayout>
  )
}

export default HomePage