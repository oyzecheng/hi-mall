import {
  CreateUserInput,
  UpdateUserInput
} from '@/src/server/schema/user.schema'
import {
  createUser,
  findUserById,
  findUserList,
  getUserCount,
  updateUser
} from '@/src/server/services/user.service'
import { handleSuccess } from '@/src/server/utils/controller'
import { PageQueryInput, ParamsInput } from '@/src/server/schema/common.schema'
import { TRPCError } from '@trpc/server'

const validate = (data: any) => {
  if (!data) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User with that id not found'
    })
  }
}

export const createUserHandler = async (input: CreateUserInput) => {
  try {
    const data = await createUser({ ...input, name: input.email })
    return handleSuccess(data)
  } catch (err) {
    throw err
  }
}

export const getUserHandler = async (input: ParamsInput) => {
  try {
    const data = await findUserById(input.id)
    validate(data)
    return handleSuccess(data)
  } catch (err) {
    throw err
  }
}

export const getUserListHandler = async (input: PageQueryInput) => {
  try {
    const list = await findUserList(input)
    return handleSuccess({
      list,
      count: await getUserCount(),
      pageIndex: input.pageIndex,
      pageSize: input.pageSize
    })
  } catch (err) {
    throw err
  }
}

export const updateUserHandler = async (input: UpdateUserInput) => {
  try {
    const { id, ...params } = input
    const data = await updateUser(id, params)
    validate(data)
    return handleSuccess(data)
  } catch (err) {
    throw err
  }
}
