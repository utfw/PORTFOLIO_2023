import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { Montserrat, Noto_Sans_KR } from 'next/font/google'

export const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight:["100","300","400","500","700","900"], 
});
export const notoSansKR = Noto_Sans_KR({ 
  weight:["100","300","400","500","700","900"],
  preload:false, 
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </Provider>
    )
}
