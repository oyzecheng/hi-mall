import { Prisma } from '@prisma/client'
import { prisma } from '@/src/server/utils/prisma'
import { PageQueryInput } from '@/src/server/schema/common.schema'

export const createUser = (input: Prisma.UserCreateInput) => {
  return prisma.user.create({
    data: input
  })
}

export const findUserById = (id: string) => {
  return prisma.user.findFirst({ where: { id } })
}

export const findUserList = (input: PageQueryInput) => {
  const { pageSize, pageIndex } = input
  return prisma.user.findMany({
    skip: pageIndex * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const updateUser = (id: string, input: Prisma.UserUpdateInput) => {
  const { id: userId, ...data } = input
  return prisma.user.update({
    where: { id },
    data
  })
}

export const getUserCount = () => {
  return prisma.user.count()
}
