import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App