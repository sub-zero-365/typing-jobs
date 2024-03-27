
import React from "react"
import {
  ColumnDef, getPaginationRowModel, SortingState, getSortedRowModel,
  ColumnFiltersState, getFilteredRowModel, VisibilityState,
} from "@tanstack/react-table"
// import { MoreHorizontal } from "lucide-react"
import { Input } from "../components/ui/input.js"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../components/ui/button.js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,

} from "../components/ui/dropdown-menu.js"
import { Checkbox } from "../components/ui/checkbox.js"
import { Link } from "react-router-dom"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
export interface iLogistic {
  price: number;
  name: string;
  tracking_number: string;
  status: boolean;
  descriptions?: ({
    name?: string,
    avatarPublicId?: string,
    imgUrl?: string
  })[]
}

export const columns: ColumnDef<iLogistic>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() /*&& "indeterminate"*/)
        }
        // onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        // aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )

    ,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    // header: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "price",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const log = row.original

      return (
        <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(log.tracking_number)}
      >
        Copy  ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem

      >
        <Link to={`/dashboard/logistic/${log.tracking_number}`}
        // onClick={e => e.defaultPrevented(true)}
        >View Logistic</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        {/* <Button variant="destructive">
          delete
        </Button> */}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
      )
    },
  },
]

