import { prisma } from '@/src/server/utils/prisma'
import { Prisma } from '@prisma/client'
import { PageQueryInput } from '@/src/server/schema/common.schema'

export const createProduct = (input: Prisma.ProductCreateInput) => {
  return prisma.product.create({
    data: input
  })
}

export const findProductById = (id: string) => {
  return prisma.product.findFirst({ where: { id } })
}

export const findProductList = (input: PageQueryInput) => {
  const { pageSize, pageIndex } = input
  return prisma.product.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const updateProduct = (id: string, input: Prisma.ProductUpdateInput) => {
  return prisma.product.update({ where: { id }, data: input })
}

export const deleteProduct = (id: string) => {
  return prisma.product.delete({ where: { id } })
}

export const getProductCount = () => {
  return prisma.category.count()
}
