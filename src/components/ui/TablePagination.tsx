import React from 'react'
import type {Table} from '@tanstack/react-table'
import Button from "@/components/ui/Button.tsx";
import Select from "@/components/ui/Select.tsx";

type TablePaginationProps<T> = {
  table: Table<T>
}

const TablePagination = <T, >({table}: TablePaginationProps<T>): React.ReactElement => {
  const {pageIndex} = table.getState().pagination

  return (
    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 mt-4">
      <div>
        Page {pageIndex + 1} of {table.getPageCount()}
      </div>

      <div className="flex items-center gap-2">
        <Select label="Rows per page" value={table.getState().pagination.pageSize}
                onChange={(val) => table.setPageSize(Number(val))}
                options={[5, 10, 20, 50, 100].map((v) => ({value: v}))}/>
      </div>

      <div className="space-x-2">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Prev
        </Button>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default TablePagination
