import React, {useMemo, useState} from 'react';
import {
  createColumnHelper, flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState, getSortedRowModel
} from "@tanstack/react-table";
import {Link} from "@tanstack/react-router";
import {FileText} from "lucide-react";
import TablePagination from "@/components/ui/TablePagination.tsx";
import type {Todo} from "@/types";

type TodoTableProps = {
  todos: Todo[]
}

const columnHelper = createColumnHelper<Todo>()

const TodoTable = ({todos}: TodoTableProps): React.ReactElement => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({row}) => (
        <Link to="/todos/$todoId" params={{todoId: String(row.original.id)}}>
          <FileText className="w-4 h-4"/>
          <span className="sr-only">View Details</span>
        </Link>
      ),
    }),
    columnHelper.accessor("title", {
      header: 'Title',
      enableSorting: true
    }),
    columnHelper.accessor("completed", {
      header: 'Completed',
      enableSorting: true
    }),
    columnHelper.accessor("userId", {
      header: 'UserId',
      enableSorting: true
    })
  ], [])

  const table = useReactTable({
    data: todos,
    columns,
    state: {
      globalFilter,
      pagination,
      sorting
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
  })

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-full max-w-sm px-4 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      />

      <div className="orverflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSorted === 'asc' ? ' 🔼' : isSorted === 'desc' ? ' 🔽' : ''}
                  </th>
                )
              })}
            </tr>
          ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-800  dark:odd:bg-gray-900">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <TablePagination table={table}/>
    </div>
  )
    ;
};

export default TodoTable;
