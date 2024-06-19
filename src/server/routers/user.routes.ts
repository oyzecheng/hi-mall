import { procedure, router } from '../trpc'
import {
  createUserSchema,
  updateUserSchema
} from '@/src/server/schema/user.schema'
import {
  createUserHandler,
  getUserHandler,
  getUserListHandler,
  updateUserHandler
} from '@/src/server/controllers/user.controller'
import { pageQuery, params } from '@/src/server/schema/common.schema'

const userRouter = router({
  createUser: procedure
    .input(createUserSchema)
    .mutation(({ input }) => createUserHandler(input)),
  getUser: procedure.input(params).query(({ input }) => getUserHandler(input)),
  getUserList: procedure
    .input(pageQuery)
    .query(({ input }) => getUserListHandler(input)),
  updateUser: procedure
    .input(updateUserSchema)
    .mutation(({ input }) => updateUserHandler(input))
})

export default userRouter
