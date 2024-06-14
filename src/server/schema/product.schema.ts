import z, { TypeOf } from 'zod'
import { paramsId } from '@/src/server/schema/common.schema'

const cover = z.string().array().min(1, '请上传产品图')
const name = z.string().min(1, '请输入名称').max(255, '名称不能大于255个字符')
const description = z
  .string()
  .min(1, '请输入描述')
  .max(1000, '描述不能大于1000个字符')
const price = z.coerce.number().min(0, '请输入价格')
const stock = z.coerce.number().min(0, '请输入库存')
const category = z.string().min(1, '请选择分类')
const recommend = z.coerce.boolean().default(false)

export const createProductSchema = z.object({
  // cover,
  name,
  // description,
  price,
  stock,
  category,
  recommend
})

export const updateProductSchema = z.object({
  id: paramsId,
  // cover,
  name,
  // description,
  price,
  stock,
  category,
  recommend
})

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
