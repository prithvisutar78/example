import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Product } from "@/data/mockData";
import { ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

interface InventoryTableProps {
  data: Product[];
}

export function InventoryTable({ data }: InventoryTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div>
              <Link
                to={`/inventory/${row.original.id}`}
                className="text-sm font-semibold text-slate-800 hover:text-brand-teal dark:text-white"
              >
                {row.original.name}
              </Link>
              <p className="text-xs text-slate-500">{row.original.sku}</p>
            </div>
          </div>
        )
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => (
          <span className="text-xs text-slate-600 dark:text-slate-300">
            {getValue<string>()}
          </span>
        )
      },
      {
        accessorKey: "stock",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 text-xs uppercase tracking-widest text-slate-400"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock <ArrowUpDown className="h-3 w-3" />
          </button>
        ),
        cell: ({ getValue }) => (
          <span className="font-mono text-xs text-slate-700 dark:text-slate-200">
            {getValue<number>()}
          </span>
        )
      },
      {
        accessorKey: "location",
        header: "Warehouse",
        cell: ({ getValue }) => (
          <span className="text-xs text-slate-600 dark:text-slate-300">
            {getValue<string>()}
          </span>
        )
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<Product["status"]>();
          const variant =
            value === "healthy" ? "success" : value === "low" ? "warning" : "danger";
          return (
            <Badge variant={variant}>
              {value === "healthy" ? "Healthy" : value === "low" ? "Low" : "Out"}
            </Badge>
          );
        }
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ getValue }) => (
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            ${getValue<number>().toFixed(2)}
          </span>
        )
      }
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Input
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search products, SKU, supplier..."
            className="w-64"
          />
          <Button variant="secondary">Filters</Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Bulk actions:</span>
          <Button variant="ghost">Edit</Button>
          <Button variant="ghost">Delete</Button>
          <Button variant="ghost">Export</Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-xs uppercase tracking-widest text-slate-400"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
