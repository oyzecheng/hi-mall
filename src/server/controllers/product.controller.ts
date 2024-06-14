import {
  CreateProductInput,
  UpdateProductInput
} from '@/src/server/schema/product.schema'
import {
  createProduct,
  deleteProduct,
  findProductById,
  findProductList,
  getProductCount,
  updateProduct
} from '@/src/server/services/product.service'
import { handleSuccess } from '@/src/server/utils/controller'
import { ParamsInput } from '@/src/server/schema/common.schema'
import { TRPCError } from '@trpc/server'

const validate = (data: any) => {
  if (!data) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Product with that id not found'
    })
  }
}

export const createProductHandler = async (input: CreateProductInput) => {
  const { name, category, price, stock } = input
  try {
    const product = await createProduct({
      name,
      category: { connect: { id: category } },
      price,
      stock,
      sale: 0
    })
    return handleSuccess(product)
  } catch (err) {
    throw err
  }
}

export const getProductHandler = async (paramsInput: ParamsInput) => {
  try {
    const product = await findProductById(paramsInput.id)
    validate(product)
    return handleSuccess(product)
  } catch (err) {
    throw err
  }
}

export const getProductListHandler = async (
  queryInput = { pageSize: 10, pageIndex: 0 }
) => {
  try {
    const list = await findProductList(queryInput)
    handleSuccess({
      list,
      count: await getProductCount(),
      pageIndex: queryInput.pageIndex,
      pageSize: queryInput.pageSize
    })
  } catch (err) {
    throw err
  }
}

export const updateProductHandler = async (input: UpdateProductInput) => {
  try {
    const { id, name, price, category, stock } = input
    const product = await updateProduct(id, {
      name,
      price,
      category: { connect: { id: category } },
      stock
    })
    validate(product)
    handleSuccess(product)
  } catch (err) {
    throw err
  }
}

export const deleteProductHandler = async (paramsInput: ParamsInput) => {
  try {
    const product = await deleteProduct(paramsInput.id)
    validate(product)
    handleSuccess(product)
  } catch (err) {
    throw err
  }
}
