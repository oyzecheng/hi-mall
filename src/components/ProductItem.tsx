import Image from 'next/image'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ProductItem() {
  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      <Link href="/product/1">
        <div className="relative">
        <span className="absolute bg-gray-800 text-white rounded-full px-2 leading-relaxed text-xs font-light z-10">
          vegetable
        </span>
          <div className="w-full h-48">
            <Image
              className="object-contain"
              alt="product"
              src="https://static.oouzc.com/avatar/avatar_1.png"
              fill={ true }
            />
          </div>
        </div>
        <p className="py-2 truncate font-semibold">Product Name</p>
      </Link>
      <div className="flex justify-between items-center border-t border-gray-200 pt-2">
        <div>
          <span className="text-sm text-gray-500 line-through">$12</span>
          <span className="font-semibold text-lg pl-2">$23</span>
        </div>
        <Button className="rounded-full text-lg" size="icon">
          <Icon icon="streamline:shopping-cart-basket-3-shopping-basket"/>
        </Button>
      </div>
    </div>
  )
}