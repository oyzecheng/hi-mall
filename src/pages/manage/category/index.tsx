import UserLayout from '@/src/layout/userLayout'
import { generateColumn, generateColumnFilter, PageTableColumn } from '@/src/components/PageTable'
import { ColumnFiltersState, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import PageTable from '@/src/components/PageTable'
import PageFormSheet from '@/src/components/PageFormSheet'
import usePageFormSheet from '@/src/hooks/usePageFormSheet'
import { PageFormItem } from '@/src/components/PageForm'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const columns: PageTableColumn[] = [
  { key: 'title', header: '分类名称' },
  { key: 'createdAt', header: '创建时间'},
  { key: 'actions', header: () => <div className="text-right">操作</div> }
]

const formConfigList: PageFormItem[] = [
  { name: 'title', label: '分类名称', control: (field) => <Input {...field} /> }
]

const formSchema = z.object({
  title: z.string().max(20, '分类名称不能超过20个字符')
})

const tableData: any[] = []

export default function CategoryManage() {
  const { open, sheetType, onOpenChange , onOpenByOne} = usePageFormSheet()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data: tableData,
    columns: generateColumn(columns),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
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
            onButtonClick={onOpenByOne}
          />
          { generateColumnFilter(table) }
        </div>
      </div>
      <PageTable columns={columns} table={table} />
    </UserLayout>
  )
}