import UserLayout from '@/src/layout/userLayout'
import { Input } from '@/components/ui/input'
import PageTable, {
  generateActionMenu,
  generateColumn,
  generateColumnFilter,
  PageTableColumn
} from '@/src/components/PageTable'
import usePageTable from '@/src/hooks/usePageTable'

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com'
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com'
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com'
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com'
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com'
  }
]

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const columns: PageTableColumn<Payment>[] = [
  {
    key: 'email',
    header: '邮箱'
  },
  {
    key: 'status',
    header: '状态',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    )
  },
  {
    key: 'createdAt',
    header: '创建时间'
  },
  {
    key: 'actions',
    enableHiding: false,
    header: () => <div className="text-right">操作</div>,
    cell: (ctx) =>
      generateActionMenu(ctx, [
        { title: '启用', click: 'onEnable' },
        { title: '禁用', click: 'onDisable' }
      ])
  }
]

export default function UserManage() {
  const table = usePageTable({
    data,
    columns: generateColumn(columns)
  })

  return (
    <UserLayout>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {generateColumnFilter(table)}
        </div>
        <PageTable table={table} columns={columns} />
      </div>
    </UserLayout>
  )
}
