import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CurrentUserWrapper } from 'lib/CurrentUserContext'
import Layout from "components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CurrentUserWrapper>
  )
}
