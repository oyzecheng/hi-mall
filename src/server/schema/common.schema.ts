import { number, object, string, TypeOf } from 'zod'

export const paramsId = string({ required_error: 'Id is required' })

export const params = object({
  id: paramsId
})

export const pageQuery = object({
  pageIndex: number().default(0),
  pageSize: number().default(10)
})

export type ParamsInput = TypeOf<typeof params>
export type PageQueryInput = TypeOf<typeof pageQuery>
