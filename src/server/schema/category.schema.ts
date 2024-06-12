import { object, string, TypeOf } from 'zod'
import { paramsId } from '@/src/server/schema/common.schema'

const name = string({ required_error: 'Name is required' })

export const createCategory = object({
  name
})

export const updateCategory = object({
  id: paramsId,
  name
})

export type CreateCategoryInput = TypeOf<typeof createCategory>
export type UpdateCategoryInput = TypeOf<typeof updateCategory>
