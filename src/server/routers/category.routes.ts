import { procedure, router } from '../trpc'
import {
  createCategory,
  updateCategory
} from '@/src/server/schema/category.schema'
import {
  createCategoryHandler,
  getCategoryHandler,
  getCategoryListHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategoryAllHandler
} from '@/src/server/controllers/category.controller'
import { pageQuery, params } from '@/src/server/schema/common.schema'

const categoryRouter = router({
  createCategory: procedure
    .input(createCategory)
    .mutation(({ input }) => createCategoryHandler(input)),
  updateCategory: procedure
    .input(updateCategory)
    .mutation(({ input }) => updateCategoryHandler(input)),
  getCategory: procedure
    .input(params)
    .mutation(({ input }) => getCategoryHandler(input)),
  getCategoryList: procedure
    .input(pageQuery)
    .query(({ input }) => getCategoryListHandler(input)),
  deleteCategory: procedure
    .input(params)
    .mutation(({ input }) => deleteCategoryHandler(input)),
  getCategoryAll: procedure.query(() => getCategoryAllHandler())
})

export default categoryRouter
