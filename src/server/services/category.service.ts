import { prisma } from '@/src/server/utils/prisma'
import { Prisma } from '@prisma/client'

export const createCategory = (name: Prisma.CategoryCreateInput['name']) => {
  return prisma.category.create({ data: { name } })
}

export const findCategoryById = (id: string) => {
  return prisma.category.findFirst({ where: { id } })
}

export const findCategoryList = (pageIndex = 0, pageSize = 10) => {
  return prisma.category.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
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

export const getCategoryAll = () => {
  return prisma.category.findMany({
    orderBy: { createdAt: 'desc' }
  })
}
