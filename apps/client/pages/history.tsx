import AppLayout from '@layouts/app'
import SEO from 'ui/seo'
import EnsureLoggedIn from '@components/ensure-logged-in'
import History from '@components/history'

const HistoryPage = () => {
  return (
    <AppLayout>
      <SEO title="Order History" />
      <EnsureLoggedIn />
      <History />
    </AppLayout>
  )
}

export default HistoryPage