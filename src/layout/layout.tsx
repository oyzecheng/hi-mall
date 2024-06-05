import PageHeader from '@/src/components/PageHeader'
import PageFooter from '@/src/components/PageFooter'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
    <PageHeader />
    <main className={`${inter.className} pt-8`}>{ children }</main>
    <PageFooter />
  </>
}