import '@/styles/globals.css'
import React, { useState, useEffect } from "react";
import type { AppProps } from 'next/app'
import { CurrentUserWrapper } from 'lib/CurrentUserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from "components/layouts";
import { RecoilRoot } from 'recoil';
import { Theme } from '@/lib/Theme';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <CurrentUserWrapper>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Theme>
            <Layout>
              <ToastContainer hideProgressBar theme="colored" transition={Slide} />
              <Component {...pageProps} />
            </Layout>
          </Theme>
        </RecoilRoot>
      </QueryClientProvider>
    </CurrentUserWrapper>
  )
}
