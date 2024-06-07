import { useState } from 'react'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  TableOptions,
  useReactTable
} from '@tanstack/react-table'

const tableData: any[] = []

export default function usePageTable<T>(options: Partial<TableOptions<T>>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const tableOptions: TableOptions<T> = {
    data: tableData,
    columns: [],
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    ...options,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
      ...options.state
    }
  }
  return useReactTable<T>(tableOptions)
}
