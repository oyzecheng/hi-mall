import { procedure, router, t } from '../trpc'
import categoryRouter from '@/src/server/routers/category.routes'

const publicRouter = router({
  hello: procedure.query(() => {
    return 'hello'
  })
})

export const appRouter = t.mergeRouters(publicRouter, categoryRouter)

// export type definition of API
export type AppRouter = typeof appRouter
