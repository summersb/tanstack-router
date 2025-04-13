import React from 'react'
import type { Table } from '@tanstack/react-table'

type TablePaginationProps<T> = {
  table: Table<T>
}

const TablePagination = <T,>({ table }: TablePaginationProps<T>): React.ReactElement => {
  const { pageIndex, pageSize } = table.getState().pagination

  return (
    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 mt-4">
      <div>
        Page {pageIndex + 1} of {table.getPageCount()}
      </div>

      <div className="flex items-center gap-2">
        <label>Rows per page:</label>
        <select
          value={pageSize}
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
  )
}

export default TablePagination
