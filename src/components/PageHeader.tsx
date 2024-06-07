import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function PageHeader() {
  const { data: session } = useSession()
  const { user } = session || {}

  return (
    <div>
      <div className="fixed w-full bg-white z-50">
        <div className="h-16 max-w-content mx-auto flex justify-between items-center border-b border-gray-200">
          <Link href="/">
            <div className="text-2xl font-bold text-gray-800">
              FR<span className="text-primary">U</span>IT
            </div>
          </Link>
          <div className="grid grid-flow-col gap-4">
            <Input className="rounded-full" placeholder="Search..." />
            <Button
              size="icon"
              variant="outline"
              className="rounded-full text-lg"
            >
              <Icon icon="streamline:shopping-cart-basket-3-shopping-basket" />
            </Button>
            {user ? (
              <Link href="/user">
                <Avatar className="w-9 h-9">
                  <AvatarImage src="https://static.oouzc.com/avatar/avatar_18.png"></AvatarImage>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="rounded-full">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="pt-16"></div>
    </div>
  )
}
