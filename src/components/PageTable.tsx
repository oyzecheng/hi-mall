import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CellContext, ColumnDef, flexRender, useReactTable } from '@tanstack/react-table'
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'

export type PageTableColumn<T = any> = {
  key: string
  header?: ColumnDef<T>['header']
  cell?: ColumnDef<T>['cell']
} & Partial<ColumnDef<T>>

export interface PageTableActionMenu {
  title: string
  click?: string | (() => void)
}
const actionKeys: string[] = []

type Actions = {
  [Key in typeof actionKeys[number]]: (ctx: CellContext<any, any>) => void;
}

let actions: Actions = {}

export function generateColumn<T>(columns: PageTableColumn<T>[], actionList?: typeof actions): ColumnDef<T>[] {
  actions = actionList || {}
  return columns.map(item => ({
    ...item,
    accessorKey: item.key,
    header: item.header || item.key,
    cell: item.cell || function ({ row}) { return row.getValue(item.key) }
  }))
}

export function generateActionMenu(ctx: CellContext<any, any>, menus: PageTableActionMenu[], label = 'Actions') {
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{ label }</DropdownMenuLabel>
          {
            menus.map(menu => {
              if (typeof menu.click === 'string') {
                actionKeys.push(menu.click)
              }
              return (
                <DropdownMenuItem
                  key={menu.title}
                  onClick={() => typeof menu.click === 'string' ? actions[menu.click](ctx) : menu.click?.() }
                >
                  { menu.title}
                </DropdownMenuItem>
              )
            })
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function generateColumnFilter(table: PageTableProps['table']) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDownIcon className="ml-2 h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        { table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={ column.id }
                className="capitalize"
                checked={ column.getIsVisible() }
                onCheckedChange={ (value) => column.toggleVisibility(!!value)
                }
              >
                { column.id }
              </DropdownMenuCheckboxItem>
            )
          }) }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface PageTableProps {
  columns: PageTableColumn[]
  table: ReturnType<typeof useReactTable<any>>
}

export default function PageTable({ columns, table }: PageTableProps) {
  return (
    <div>
      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            { table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={ headerGroup.id }>
                { headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={ header.id } className="text-gray-800">
                      { header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) }
                    </TableHead>
                  )
                }) }
              </TableRow>
            )) }
          </TableHeader>
          <TableBody className="text-gray-700">
            { table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={ row.id }
                  data-state={ row.getIsSelected() && 'selected' }
                >
                  { row.getVisibleCells().map((cell) => (
                    <TableCell key={ cell.id }>
                      { flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      ) }
                    </TableCell>
                  )) }
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={ columns.length }
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.previousPage() }
            disabled={ !table.getCanPreviousPage() }
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.nextPage() }
            disabled={ !table.getCanNextPage() }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}