import { PageQueryInput, ParamsInput } from '@/src/server/schema/common.schema'
import {
  createCategory,
  deleteCategoryById,
  findCategoryById,
  findCategoryList,
  getCategoryCount,
  updateCategoryById,
  getCategoryAll
} from '@/src/server/services/category.service'
import { TRPCError } from '@trpc/server'
import { handleSuccess } from '@/src/server/utils/controller'
import {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/src/server/schema/category.schema'

const validate = (data: any) => {
  if (!data) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Category with that id not found'
    })
  }
}

export const createCategoryHandler = async (input: CreateCategoryInput) => {
  try {
    const category = await createCategory(input.name)
    return handleSuccess(category)
  } catch (err) {
    throw err
  }
}

export const getCategoryHandler = async (paramsInput: ParamsInput) => {
  try {
    const category = await findCategoryById(paramsInput.id)
    validate(category)
    return handleSuccess(category)
  } catch (err) {
    throw err
  }
}

export const getCategoryListHandler = async (queryInput?: PageQueryInput) => {
  try {
    const { pageIndex, pageSize } = queryInput || {}
    const list = await findCategoryList(pageIndex, pageSize)
    return handleSuccess({
      pageIndex,
      pageSize: pageSize,
      list,
      count: await getCategoryCount()
    })
  } catch (err) {
    throw err
  }
}

export const updateCategoryHandler = async (input: UpdateCategoryInput) => {
  try {
    const category = await updateCategoryById(input.id, input.name)
    validate(category)
    return handleSuccess(category)
  } catch (err) {
    throw err
  }
}

export const deleteCategoryHandler = async (paramsInput: ParamsInput) => {
  try {
    const category = await deleteCategoryById(paramsInput.id)

    validate(category)

    return handleSuccess(category)
  } catch (err: any) {
    throw err
  }
}

export const getCategoryAllHandler = async () => {
  try {
    const list = await getCategoryAll()
    return handleSuccess(list)
  } catch (err) {
    throw err
  }
}
