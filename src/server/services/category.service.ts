import { prisma } from '@/src/server/utils/prisma'
import { Prisma } from '@prisma/client'

export const createCategory = (name: Prisma.CategoryCreateInput['name']) => {
  return prisma.category.create({ data: { name } })
}

export const findCategoryById = (id: string) => {
  return prisma.category.findFirst({ where: { id } })
}

export const findCategoryList = (page: number, pageSize = 10) => {
  return prisma.category.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize
  })
}

export const updateCategoryById = (id: string, name: string) => {
  return prisma.category.update({ where: { id }, data: { name } })
}

export const deleteCategoryById = (id: string) => {
  return prisma.category.delete({ where: { id } })
}

export const getCategoryCount = () => {
  return prisma.category.count()
}