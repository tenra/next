import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CurrentUserWrapper } from 'lib/CurrentUserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from "components/layouts";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserWrapper>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ToastContainer hideProgressBar theme="colored" transition={Slide} />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </CurrentUserWrapper>
  )
}
