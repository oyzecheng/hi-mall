import { procedure, router } from '../trpc'
import {
  createProductSchema,
  updateProductSchema
} from '@/src/server/schema/product.schema'
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductListHandler,
  updateProductHandler
} from '@/src/server/controllers/product.controller'
import { pageQuery, params } from '@/src/server/schema/common.schema'

const productRouter = router({
  createProduct: procedure
    .input(createProductSchema)
    .mutation(({ input }) => createProductHandler(input)),
  updateProduct: procedure
    .input(updateProductSchema)
    .mutation(({ input }) => updateProductHandler(input)),
  getProduct: procedure
    .input(params)
    .mutation(({ input }) => getProductHandler(input)),
  getProductList: procedure
    .input(pageQuery)
    .query(({ input }) => getProductListHandler(input)),
  deleteProduct: procedure
    .input(params)
    .mutation(({ input }) => deleteProductHandler(input))
})

export default productRouter
