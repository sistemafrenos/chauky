import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  Table as TableType,
  SortDirection,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { useState } from "react"
import { Input } from "./input"
import { Button } from "./button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  defaultColumnfilter?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const hasRowsSelected = Object.values(rowSelection).length > 0;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  const handlePrintSelection = () => {
    const selection = table.getFilteredRowModel().rows.map(row => row.original);
    console.log(selection);
  }
  return (
    <>
      <div className="flex items-center justify-end">
        {hasRowsSelected && <Button className="mr-2" variant={"outline"} onClick={() => handlePrintSelection()}>Imprimir seleccionados</Button>}
        <Input
          className="max-w-sm mt-4 mb-3"
          placeholder="Buscar..."
          onChange={(event) => {
            table.getColumn('codigo')?.setFilterValue(event.target.value);
          }}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Paginator table={table} data={data} />
    </>
  )
}

function Paginator<TData>({ table, data }: { table: TableType<TData>, data: TData[] }): JSX.Element {
  return (
    <div className="flex items-center gap-2 flex-wrap flex-row justify-center pt-2">
      <button
        className="border rounded p-1"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </button>
      <span className="flex items-center gap-1">
        <div>Pagina</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount().toLocaleString()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | ir a la pagina:
        <input
          type="number"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Por pagina: {pageSize}
          </option>
        ))}
      </select>
      <div className="text-center">
        {table.getRowModel().rows.length.toLocaleString()} de{' '}
        {data.length.toLocaleString()} resultados.
      </div>
    </div>
  );
}

export const SortedIcon = ({ isSorted }: { isSorted: false | SortDirection }) => {
  if (isSorted === "asc") {
    return <ChevronUpIcon className="h-4 w-4" />;
  }

  if (isSorted === "desc") {
    return <ChevronDownIcon className="h-4 w-4" />;
  }

  return null;
};