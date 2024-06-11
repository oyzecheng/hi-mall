import Layout from '@/src/layout/layout'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import ProductQuantityControl from '@/src/components/ProductQuantityControl'

export default function Product() {
  const [count, setCount] = useState(1)

  return (
    <Layout>
      <div className="max-w-content mx-auto flex">
        <div className="w-5/12">
          <div className="w-full h-96 rounded-3xl bg-gray-100"></div>
          <div className="mt-6 flex gap-6">
            <div className="bg-gray-100 w-28 h-28 rounded-xl"></div>
            <div className="bg-gray-100 w-28 h-28 rounded-xl"></div>
            <div className="bg-gray-100 w-28 h-28 rounded-xl"></div>
          </div>
        </div>
        <div className="w-7/12 px-16">
          <div className="border-b border-gray-100 border-solid pb-5">
            <h1 className="text-gray-800 text-4xl font-bold">Title</h1>
            <p className="text-gray-600 mt-2">description</p>
          </div>
          <div className="border-b border-gray-100 border-solid py-5">
            <span className="font-bold text-gray-800 text-2xl">$1999.99</span>
            <span className="font-bold text-gray-400 text-2xl ml-6 line-through">
              $1999.99
            </span>
          </div>
          <div className="border-b border-gray-100 border-solid py-5">
            <div className="pb-6 inline-block">
              <ProductQuantityControl value={count} onChange={setCount} />
            </div>
            <div className="space-x-6">
              <Button className="rounded-full py-6 px-12 text-base">
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="rounded-full py-6 px-12 text-base"
              >
                <Icon
                  className="mr-3"
                  icon="streamline:shopping-cart-basket-3-shopping-basket"
                />
                Add to Bag
              </Button>
            </div>
          </div>
          <div className="border-b border-gray-100 border-solid py-5 space-x-6">
            <span className="bg-gray-100 py-2 px-6 rounded-lg">Label</span>
            <span className="bg-gray-100 py-2 px-6 rounded-lg">Label</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}
