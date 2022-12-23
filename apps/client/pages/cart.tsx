import AppLayout from '@layouts/app'
import SEO from 'ui/seo'
import Cart from '@components/cart'

const CartPage = () => {
  return (
    <AppLayout>
      <SEO title="Cart" />
      <Cart />
    </AppLayout>
  )
}

export default CartPage