import React, { useMemo, useState } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import type { User } from '@/routes/users/index'

type UserTableProps = {
  users: User[]
}

const columnHelper = createColumnHelper<User>()

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      columnHelper.accessor('username', {
        header: 'Username',
      }),
      columnHelper.accessor('email', {
        header: 'Email',
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
      }),
      columnHelper.accessor('website', {
        header: 'Website',
        cell: (info) => (
          <a
            href={`http://${info.getValue()}`}
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
      }),
      columnHelper.accessor((row) => row.address.city, {
        id: 'city',
        header: 'City',
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Link
            to="/users/$userId"
            params={{ userId: String(row.original.id) }}
          >
            <button className="text-sm px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition">
              View Details
            </button>
          </Link>
        ),
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
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
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

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Rows per page:
          </label>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100"
          >
            {[5, 10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTable
