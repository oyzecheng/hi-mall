import PageHeader from '@/src/components/PageHeader'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function UserLayout({
  children
}: {
  children: React.ReactNode
}) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const manageRouteList = [
    { path: '/manage/users', name: '用户管理' },
    { path: '/manage/category', name: '分类管理' },
    { path: '/manage/products', name: '产品管理' }
  ]

  return (
    <>
      <PageHeader />
      <main className="max-w-content mx-auto flex gap-10 pt-8">
        <div className="border border-gray-200 rounded-2xl p-4 w-3/12 flex flex-col gap-4">
          {manageRouteList.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button variant="secondary" className="w-full">
                {item.name}
              </Button>
            </Link>
          ))}
          <Button
            variant="secondary"
            className="w-full text-red-500"
            onClick={handleSignOut}
          >
            退出登录
          </Button>
        </div>
        <div className="w-9/12">{children}</div>
      </main>
    </>
  )
}
