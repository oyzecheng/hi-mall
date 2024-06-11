import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import ProductQuantityControl from '@/src/components/ProductQuantityControl'

export default function ShoppingCar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full text-lg">
          <Icon icon="streamline:shopping-cart-basket-3-shopping-basket" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>购物车</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded overflow-hidden">
              <Image
                className="object-contain"
                alt="product"
                src="https://static.oouzc.com/avatar/avatar_1.png"
                width={80}
                height={80}
              />
            </div>
            <div className="ml-4">
              <p className="truncate text-gray-800">title</p>
              <div className="mt-1">
                <ProductQuantityControl value={1} size="small" />
              </div>
            </div>
            <Icon
              className="ml-auto text-xl text-gray-400 cursor-pointer transition hover:text-red-500"
              icon="hugeicons:delete-02"
            />
          </div>
        </div>
        <div className="absolute bottom-0 py-4 px-6 left-0 right-0">
          <Button className="w-full">To Pay</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
