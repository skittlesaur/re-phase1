import useUser from '@hooks/use-user'
import Loader from '@components/loader'
import { useRouter } from 'next/router'

const Seller = () => {
  const router = useRouter()
  const { user, isLoading } = useUser()

  if (isLoading) return <Loader />

  if (!user || user.role !== 'PRODUCTS_SELLER') {
    router.push('/')
    return <></>
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">
        My Products
      </h1>

    </div>
  )
}

export default Seller