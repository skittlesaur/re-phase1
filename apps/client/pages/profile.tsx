import AppLayout from '@layouts/app'
import SEO from 'ui/seo'
import Profile from '@components/profile'

const ProfilePage = () => {
  return (
    <AppLayout>
      <SEO title="Profile" />
      <Profile />
    </AppLayout>
  )
}

export default ProfilePage