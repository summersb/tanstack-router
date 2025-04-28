import React, {useMemo, useState} from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender, type SortingState, getSortedRowModel,
} from '@tanstack/react-table'
import {Link} from '@tanstack/react-router'
import {FileText, Pencil} from "lucide-react";
import type {User} from "@/types";
import TablePagination from "@/components/ui/TablePagination.tsx";

type UserTableProps = {
  users: User[]
}

const columnHelper = createColumnHelper<User>()

const UserTable: React.FC<UserTableProps> = ({users}) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({row}) => (
          <span>
            <Link
              to="/users/$userId"
              params={{userId: String(row.original.id)}}
            >
              <FileText className="w-4 h-4"/>
              <span className="sr-only">View Details</span>
            </Link>
          <Link
            to="/users/$userId/edit"
            params={{userId: String(row.original.id)}}
          >
            <Pencil className="w-4 h-4"/>
            <span className="sr-only">Edit Details</span>
          </Link>
          </span>
        ),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        enableSorting: true
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        enableSorting: true
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        enableSorting: true,
        cell: (info) => (
          <a
            href={`mailto:${info.getValue()}`}
            className="underline text-blue-600 dark:text-blue-400"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        enableSorting: true
      }),
      columnHelper.accessor('website', {
        header: 'Website',
        enableSorting: true,
        cell: (info) => (
          <a
            href={`https://${info.getValue()}`}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor((row) => row.company.name, {
        id: 'company',
        header: 'Company',
        enableSorting: true
      }),
      columnHelper.accessor((row) => row.address.city, {
        id: 'city',
        header: 'City',
        enableSorting: true
      }),
    ],
    []
  )

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
      pagination,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {isSorted === 'asc' ? ' 🔼' : isSorted === 'desc' ? ' 🔽' : ''}
                  </th>
                )
              })}
            </tr>
          ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-800 dark:odd:bg-gray-900"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                >
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
}

export default UserTable
