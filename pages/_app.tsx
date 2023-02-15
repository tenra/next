import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CurrentUserWrapper } from 'lib/CurrentUserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from "components/layouts";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserWrapper>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </CurrentUserWrapper>
  )
}
