import AppLayout from '@layouts/app'
import Contact from '@components/contact'
import EnsureLoggedIn from '@components/ensure-logged-in'
import SEO from 'ui/seo'

const ContactPage = () => {
  return (
    <AppLayout currentPage="contact">
      <SEO title="Contact" />
      <EnsureLoggedIn />
      <Contact />
    </AppLayout>
  )
}

export default ContactPage