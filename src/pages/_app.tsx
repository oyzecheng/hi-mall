import type { AppType } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '@/src/styles/globals.css'
import { trpc } from '../utils/trpc'

const MyApp: AppType<any> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default trpc.withTRPC(MyApp)