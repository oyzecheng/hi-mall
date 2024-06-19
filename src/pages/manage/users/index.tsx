import UserLayout from '@/src/layout/userLayout'
import { Input } from '@/components/ui/input'
import PageTable, {
  generateActionMenu,
  generateColumn,
  generateColumnFilter,
  PageTableColumn
} from '@/src/components/PageTable'
import usePageTable from '@/src/hooks/usePageTable'
import { trpc } from '@/src/utils/trpc'
import { useState } from 'react'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const columns: PageTableColumn<Payment>[] = [
  {
    key: 'name',
    header: '用户名'
  },
  {
    key: 'email',
    header: '邮箱'
  },
  {
    key: 'state',
    header: '状态',
    cell: ({ row }) => <div className="capitalize">{row.getValue('state')}</div>
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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const { data, refetch } = trpc.getUserList.useQuery(pagination)

  const table = usePageTable({
    data: data?.data.list || [],
    rowCount: data?.data.count || 0,
    manualPagination: true,
    columns: generateColumn(columns),
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
