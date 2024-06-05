import Layout from '@/src/layout/layout'
import ProductItem from '@/src/components/ProductItem'
import { Button } from '@/components/ui/button'
import { trpc } from '@/src/utils/trpc'

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'test' })
  console.log(hello)
  return (
    <Layout>
      <main className="max-w-content mx-auto">
        { hello?.data?.greeting }
        <div>
          <div className="border-b border-gray-200 flex justify-between items-center py-6 mb-6">
            <h2 className="font-bold text-3xl">Our Products</h2>
            <Button variant="outline" className="rounded-full" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-5 gap-5">
            { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <ProductItem key={ i }/>) }
          </div>
        </div>
      </main>
    </Layout>
  )
}
