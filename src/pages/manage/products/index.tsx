import UserLayout from '@/src/layout/userLayout'
import { Input } from '@/components/ui/input'
import PageTable, {
  generateActionMenu,
  generateColumn,
  generateColumnFilter,
  PageTableColumn
} from '@/src/components/PageTable'
import { PageFormItem } from '@/src/components/PageForm'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import z from 'zod'
import PageFormSheet from '@/src/components/PageFormSheet'
import usePageFormSheet from '@/src/hooks/usePageFormSheet'
import usePageForm from '@/src/hooks/usePageForm'
import { createProductSchema } from '@/src/server/schema/product.schema'
import { trpc } from '@/src/utils/trpc'
import usePageTable from '@/src/hooks/usePageTable'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Category, Product } from '@prisma/client'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { formatDateToTimezone } from '@/src/utils/format'

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
    key: 'name',
    header: '名称'
  },
  {
    key: 'price',
    header: '价格'
  },
  {
    key: 'sale',
    header: '销售量'
  },
  {
    key: 'state',
    header: '状态'
  },
  {
    key: 'stock',
    header: '库存'
  },
  {
    key: 'category',
    header: '分类',
    cell: ({ row }) => row.original.category?.name
  },
  {
    key: 'recommend',
    header: '推荐',
    cell: ({ row }) => (row.original.recommend ? '是' : '否')
  },
  {
    key: 'createdAt',
    header: '创建时间',
    cell: ({ row }) => formatDateToTimezone(row.original.createdAt)
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

const formConfigList: PageFormItem[] = [
  {
    name: 'name',
    label: '产品名称',
    control: (field) => <Input {...field} />
  },
  // {
  //   name: 'description',
  //   label: '描述',
  //   control: (field) => <Textarea {...field} />
  // },
  {
    name: 'price',
    label: '价格',
    control: (field) => <Input type="number" min={0} max={9999} {...field} />
  },
  {
    name: 'stock',
    label: '库存',
    control: (field) => <Input type="number" min={0} max={9999} {...field} />
  },
  {
    name: 'category',
    label: '分类',
    control: (field) => {
      const { data } = trpc.getCategoryAll.useQuery()
      const list = data?.data || []
      return (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="请选择分类" />
          </SelectTrigger>
          <SelectContent>
            {list.map((item: Category) => (
              <SelectItem value={item.id} key={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }
  },
  {
    name: 'recommend',
    label: '推荐',
    control: (field) => (
      <RadioGroup onValueChange={field.onChange} value={field.value.toString()}>
        <FormItem className="flex items-center space-x-2 space-y-0">
          <FormControl>
            <RadioGroupItem value="true" />
          </FormControl>
          <FormLabel>是</FormLabel>
        </FormItem>
        <FormItem className="flex items-center space-x-2 space-y-0">
          <FormControl>
            <RadioGroupItem value="false" />
          </FormControl>
          <FormLabel>否</FormLabel>
        </FormItem>
      </RadioGroup>
    )
  }
  // {
  //   name: 'cover',
  //   label: '海报图',
  //   control: (field) => <Textarea {...field} />
  // }
]

export default function ProductManage() {
  const { open, onOpenChange, onOpenByOne, onOpenByTwo, sheetType, record } =
    usePageFormSheet()
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const { data, refetch } = trpc.getProductList.useQuery(pagination)

  const { mutate: createProduct } = trpc.createProduct.useMutation({
    onSuccess() {
      refetch()
    }
  })
  const { mutate: getProduct } = trpc.getProduct.useMutation({
    onSuccess(data) {
      formReset({ ...data.data, category: data.data.categoryId })
    }
  })
  const { mutate: updateProduct } = trpc.updateProduct.useMutation({
    onSuccess() {
      refetch()
    }
  })
  const { mutate: deleteProduct } = trpc.deleteProduct.useMutation({
    onSuccess() {
      refetch()
    }
  })

  const table = usePageTable<Product>({
    data: data?.data.list || [],
    rowCount: data?.data.count || 0,
    manualPagination: true,
    columns: generateColumn<Product>(columns, {
      onEdit: ({ row }) => {
        onOpenByTwo(row.original)
        getProduct({ id: row.original.id })
      },
      onDelete: ({ row }) => {
        deleteProduct({ id: row.original.id })
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

  const { form, formReset } = usePageForm(createProductSchema)

  const onSubmit = (data: z.infer<typeof createProductSchema>) => {
    if (sheetType === 1) {
      createProduct({ ...data, recommend: Boolean(data.recommend) })
    } else if (sheetType === 2) {
      updateProduct({
        ...data,
        id: record.id,
        recommend: Boolean(data.recommend)
      })
    }
    onOpenChange(false)
  }

  const handleOpenSheet = () => {
    formReset()
    onOpenByOne()
  }

  return (
    <UserLayout>
      <div>
        <div className="pb-4 flex">
          <div className="ml-auto space-x-4">
            <PageFormSheet
              open={open}
              sheetType={sheetType}
              onOpenChange={onOpenChange}
              configList={formConfigList}
              form={form}
              onSubmit={onSubmit}
              onButtonClick={handleOpenSheet}
            />
            {generateColumnFilter(table)}
          </div>
        </div>
        <PageTable columns={columns} table={table}></PageTable>
      </div>
    </UserLayout>
  )
}
