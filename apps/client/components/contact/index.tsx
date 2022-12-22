import useUser from '@hooks/use-user'
import AllChats from '@components/contact/all-chats'
import Loader from '@components/loader'

const Contact = () => {
  const { user } = useUser()

  if (!user) return <Loader />

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">
        Contact
      </h1>
      <div>
        <AllChats user={user} />
      </div>
    </div>
  )
}

export default Contact