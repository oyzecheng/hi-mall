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

const columns: PageTableColumn[] = [
  { key: 'title', header: '分类名称' },
  { key: 'createdAt', header: '创建时间' },
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

const tableData: any[] = [{ id: 1, title: '水果', createdAt: '2022-01-01' }]

export default function CategoryManage() {
  const { open, sheetType, onOpenChange, onOpenByOne, onOpenByTwo } =
    usePageFormSheet()
  const table = usePageTable({
    data: tableData,
    columns: generateColumn(columns, {
      onEdit: ({ row }) => {
        onOpenByTwo()
        form.reset(row.original)
      },
      onDelete: () => {}
    })
  })

  const form = usePageForm(formSchema)

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const handleCloseSheet = () => {
    onOpenChange(false)
    form.reset()
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
            onCancel={handleCloseSheet}
          />
          {generateColumnFilter(table)}
        </div>
      </div>
      <PageTable columns={columns} table={table} />
    </UserLayout>
  )
}
