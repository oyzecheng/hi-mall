import z, { TypeOf } from 'zod'
import { paramsId } from '@/src/server/schema/common.schema'

const password = z.string().min(1, '请输入密码')

export const createUserSchema = z.object({
  email: z.string().email('请输入正确的邮箱'),
  password
})

export const updateUserSchema = z.object({
  password,
  avatar: z.string(),
  state: z.enum(['enable', 'unable']),
  address: z.string(),
  name: z.string(),
  id: paramsId
})

export type CreateUserInput = TypeOf<typeof createUserSchema>
export type UpdateUserInput = TypeOf<typeof updateUserSchema>
