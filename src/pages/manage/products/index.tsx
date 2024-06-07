import UserLayout from '@/src/layout/userLayout'
import { Input } from '@/components/ui/input'
import PageTable, {
  generateActionMenu,
  generateColumn,
  generateColumnFilter,
  PageTableColumn
} from '@/src/components/PageTable'
import { PageFormItem } from '@/src/components/PageForm'
import {
  ColumnFiltersState,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { getCoreRowModel } from '@tanstack/react-table'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import z from 'zod'
import PageFormSheet from '@/src/components/PageFormSheet'
import usePageFormSheet from '@/src/hooks/usePageFormSheet'
import usePageForm from '@/src/hooks/usePageForm'

const columns: PageTableColumn[] = [
  {
    key: 'poster',
    header: '产品图',
    cell: () => (
      <Image
        src="https://static.oouzc.com/avatar/avatar_1.png"
        alt="avatar"
        width={60}
        height={60}
      />
    )
  },
  {
    key: 'title',
    header: '名称'
  },
  {
    key: 'price',
    header: '价格'
  },
  {
    key: 'sales',
    header: '销售量'
  },
  {
    key: 'status',
    header: '状态'
  },
  {
    key: 'stock',
    header: '库存'
  },
  {
    key: 'category',
    header: '分类'
  },
  {
    key: 'recommend',
    header: '推荐'
  },
  {
    key: 'createdAt',
    header: '创建时间'
  },
  {
    key: 'action',
    enableHiding: false,
    header: () => <div className="text-right">操作</div>,
    cell: (ctx) => {
      return generateActionMenu(ctx, [
        { title: '编辑', click: 'onEdit' },
        { title: '删除', click: 'onDelete' }
      ])
    }
  }
]

const formSchema = z.object({
  image: z.string().max(1000).url('Invalid image url'),
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description is too long'),
  price: z.coerce
    .number()
    .min(0, 'Price must be greater than 0')
    .max(9999, 'Price must be less than 9999'),
  stork: z.coerce
    .number()
    .min(0, 'Stock must be greater than 0')
    .max(9999, 'Stock must be less than 9999'),
  category: z
    .string()
    .min(1, 'Category is required')
    .max(50, 'Category is too long')
})

const formConfigList: PageFormItem[] = [
  {
    name: 'title',
    label: '产品名称',
    control: (field) => <Input {...field} />
  },
  {
    name: 'description',
    label: '描述',
    control: (field) => <Textarea {...field} />
  },
  {
    name: 'price',
    label: '价格',
    control: (field) => <Input type="number" min={0} max={9999} {...field} />
  },
  {
    name: 'stork',
    label: '库存',
    control: (field) => <Input type="number" min={0} max={9999} {...field} />
  },
  {
    name: 'category',
    label: '分类',
    control: (field) => <Input {...field} />
  },
  {
    name: 'image',
    label: '海报图',
    control: (field) => <Textarea {...field} />
  }
]

const data = [
  { id: 1, title: 'Product 1', price: 12 },
  { id: 2, title: 'Product 2' }
]

export default function ProductManage() {
  const { open, onOpenChange, onOpenByOne, onOpenByTwo, sheetType } =
    usePageFormSheet()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns: generateColumn(columns, {
      onEdit: ({ row }) => {
        onOpenByTwo()
        form.reset(row.original)
      },
      onDelete: () => {}
    }),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters
    }
  })

  const form = usePageForm(formSchema)

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <UserLayout>
      <div>
        <div className="pb-4 flex">
          <div className="ml-auto space-x-4">
            <PageFormSheet
              open={open}
              onOpenChange={onOpenChange}
              form={form}
              onSubmit={onSubmit}
              configList={formConfigList}
              onButtonClick={onOpenByOne}
              sheetType={sheetType}
            />
            {generateColumnFilter(table)}
          </div>
        </div>
        <PageTable columns={columns} table={table}></PageTable>
      </div>
    </UserLayout>
  )
}
