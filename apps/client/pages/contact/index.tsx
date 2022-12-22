import AppLayout from '@layouts/app'
import Contact from '@components/contact'
import EnsureLoggedIn from '@components/ensure-logged-in'

const ContactPage = () => {
  return (
    <AppLayout currentPage="contact">
      <EnsureLoggedIn />
      <Contact />
    </AppLayout>
  )
}

export default ContactPage