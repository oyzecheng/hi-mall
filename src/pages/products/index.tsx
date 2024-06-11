import Layout from '@/src/layout/layout'
import ProductItem from '@/src/components/ProductItem'

export default function Products() {
  return (
    <Layout>
      <div className="max-w-content mx-auto grid grid-cols-5 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <ProductItem key={item}></ProductItem>
        ))}
      </div>
    </Layout>
  )
}
