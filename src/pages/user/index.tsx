import UserLayout from '@/src/layout/userLayout'
import { useSession } from 'next-auth/react'

export default function User() {
  const { data } = useSession()
  const { user } = data || {}

  return (
    <UserLayout>
      <div>user</div>
      <div>{ user?.name }</div>
    </UserLayout>
  )
}