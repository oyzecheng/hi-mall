import UserLayout from '@/src/layout/userLayout'
import { Input } from '@/components/ui/input'
import PageTable, {
  generateActionMenu,
  generateColumn,
  generateColumnFilter,
  PageTableColumn
} from '@/src/components/PageTable'
import PageForm, { PageFormItem } from '@/src/components/PageForm'
import {
  ColumnFiltersState, getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { getCoreRowModel } from '@tanstack/react-table'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const columns: PageTableColumn[] = [
  {
    key: 'poster',
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
    key: 'title'
  },
  {
    key: 'price'
  },
  {
    key: 'sales'
  },
  {
    key: 'status'
  },
  {
    key: 'stock'
  },
  {
    key: 'category'
  },
  {
    key: 'recommend'
  },
  {
    key: 'createdAt'
  },
  {
    key: 'action',
    enableHiding: false,
    header: () => <div className="text-right">Action</div>,
    cell: (ctx) => {
      return generateActionMenu(ctx, [{ title: 'Edit', click: 'onEdit' }, { title: 'Delete', click: 'onDelete' }])
    }
  }
]

const formSchema = z.object({
  image: z
    .string()
    .max(1000)
    .url('Invalid image url'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title is too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description is too long'),
  price: z
    .coerce
    .number()
    .min(0, 'Price must be greater than 0')
    .max(9999, 'Price must be less than 9999'),
  stork: z
    .coerce
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
    name: 'image',
    label: 'Poster',
    control: (field) => <Textarea {...field} />
  },
  {
    name: 'title',
    label: 'Title',
    control: (field) => <Input {...field} />
  },
  {
    name: 'description',
    label: 'description',
    control: (field) => <Textarea {...field} />
  },
  {
    name: 'price',
    label: 'price',
    control: (field) => <Input type="number" min={0} max={9999} {...field} />
  },
  {
    name: 'stork',
    label: 'stork',
    control: (field) => <Input type="number" min={0} max={9999} {...field} />
  },
  {
    name: 'category',
    label: 'category',
    control: (field) => <Input {...field} />
  }
]

const data = [{ id: 1, title: 'Product 1', price: 12 }, { id: 2, title: 'Product 2' }]

export default function ProductManage() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetType, setSheetType] = useState<1 | 2>(1)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns: generateColumn(columns, {
      onEdit: ({ row }) => {
        handleOpenSheet(2)
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      stork: 0,
      category: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const handleOpenSheet = (type:  1 | 2) => {
    form.reset()
    setSheetType(type)
    setSheetOpen(true)
  }

  return (
    <UserLayout>
      <div>
        <div className="pb-4 flex">
          <div className="ml-auto space-x-4">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button onClick={() => handleOpenSheet(1)}>Add</Button>
              </SheetTrigger>
              <SheetContent className="w-[500px] sm:max-w-[500px]">
                <SheetHeader>
                  <SheetTitle>{ sheetType === 1 ? 'Add Product' : 'Edit Product' }</SheetTitle>
                </SheetHeader>
                <div>
                  <PageForm
                    onSubmit={onSubmit}
                    form={form}
                    configList={formConfigList}
                    onCancel={() => setSheetOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
            { generateColumnFilter(table) }
          </div>
        </div>
        <PageTable columns={columns} table={table}></PageTable>
      </div>
    </UserLayout>
  )
}