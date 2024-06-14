import UserLayout from '@/src/layout/userLayout'
import {
  generateActionMenu,
  generateColumn,
  generateColumnFilter,
  PageTableColumn
} from '@/src/components/PageTable'
import PageTable from '@/src/components/PageTable'
import PageFormSheet from '@/src/components/PageFormSheet'
import usePageFormSheet from '@/src/hooks/usePageFormSheet'
import { PageFormItem } from '@/src/components/PageForm'
import { Input } from '@/components/ui/input'
import z from 'zod'
import usePageTable from '@/src/hooks/usePageTable'
import usePageForm from '@/src/hooks/usePageForm'
import { trpc } from '@/src/utils/trpc'
import { useState } from 'react'
import { formatDateToTimezone } from '@/src/utils/format'

const columns: PageTableColumn[] = [
  { key: 'name', header: '分类名称' },
  {
    key: 'createdAt',
    header: '创建时间',
    cell: ({ row }) => formatDateToTimezone(row.original.createdAt)
  },
  {
    key: 'actions',
    header: () => <div className="text-right">操作</div>,
    cell: (ctx) => {
      return generateActionMenu(ctx, [
        { title: '编辑', click: 'onEdit' },
        { title: '删除', click: 'onDelete' }
      ])
    }
  }
]

const formConfigList: PageFormItem[] = [
  { name: 'title', label: '分类名称', control: (field) => <Input {...field} /> }
]

const formSchema = z.object({
  title: z
    .string()
    .max(20, '分类名称不能超过20个字符')
    .min(2, '分类名称不能少于2个字符')
    .default('')
})

export default function CategoryManage() {
  const { open, sheetType, onOpenChange, onOpenByOne, onOpenByTwo, record } =
    usePageFormSheet()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const { data, refetch } = trpc.getCategoryList.useQuery(pagination)
  const { mutate: deleteCategory } = trpc.deleteCategory.useMutation({
    onSuccess: () => refetch()
  })
  const { mutate: updateCategory } = trpc.updateCategory.useMutation({
    onSuccess: () => refetch()
  })
  const { mutate: getCategory } = trpc.getCategory.useMutation({
    onSuccess: (data) => form.reset({ title: data?.data.name })
  })
  const table = usePageTable({
    data: data?.data.list || [],
    rowCount: data?.data.count || 0,
    manualPagination: true,
    columns: generateColumn(columns, {
      onEdit: ({ row }) => {
        onOpenByTwo(row.original)
        getCategory({ id: row.original.id })
      },
      onDelete: ({ row }) => {
        const { id } = row.original
        deleteCategory({ id })
      }
    }),
    onPaginationChange(updater) {
      setPagination((old) => {
        const newPagination =
          updater instanceof Function ? updater(old) : updater
        refetch()
        return newPagination
      })
    },
    state: {
      pagination
    }
  })
  const mutation = trpc.createCategory.useMutation({
    onSuccess(data) {
      refetch()
    }
  })

  const { form, formReset } = usePageForm(formSchema)

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (sheetType === 1) {
      mutation.mutate({ name: data.title })
    } else if (sheetType === 2) {
      updateCategory({ id: record.id, name: data.title })
    }
    onOpenChange(false)
  }

  const handleConfirmClick = () => {
    formReset()
    onOpenByOne()
  }

  return (
    <UserLayout>
      <div className="flex pb-4">
        <div className="space-x-4 ml-auto">
          <PageFormSheet
            open={open}
            sheetType={sheetType}
            onOpenChange={onOpenChange}
            configList={formConfigList}
            form={form}
            onSubmit={onSubmit}
            onButtonClick={handleConfirmClick}
          />
          {generateColumnFilter(table)}
        </div>
      </div>
      <PageTable columns={columns} table={table} />
    </UserLayout>
  )
}
