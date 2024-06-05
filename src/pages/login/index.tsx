import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  const handleSignIn = () => {
    signIn('credentials', {
      username: 'admin',
      password: 'admin',
      redirect: false
    }).then(res => {
      if (res?.status === 200) {
        router.push('/')
      }
    })
  }

  return (
    <div>
      <Input placeholder="email"></Input>
      <Input placeholder="password" type="password"></Input>
      <Button onClick={handleSignIn}>Sign in</Button>
    </div>
  )
}