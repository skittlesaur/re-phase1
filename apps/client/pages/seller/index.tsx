import AppLayout from '@layouts/app'
import SEO from 'ui/seo'
import Seller from '@components/seller'

const SellerPage = () => {
  return (
    <AppLayout>
      <SEO title="Product Seller" />
      <Seller />
    </AppLayout>
  )
}

export default SellerPage