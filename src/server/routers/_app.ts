import { procedure, router, t } from '../trpc'
import categoryRouter from '@/src/server/routers/category.routes'
import productRouter from '@/src/server/routers/product.routes'
import userRouter from '@/src/server/routers/user.routes'

const publicRouter = router({
  hello: procedure.query(() => {
    return 'hello'
  })
})

export const appRouter = t.mergeRouters(
  publicRouter,
  categoryRouter,
  productRouter,
  userRouter
)

// export type definition of API
export type AppRouter = typeof appRouter
