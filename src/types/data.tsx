
import React, { useState } from "react"
import {
  ColumnDef, getPaginationRowModel, SortingState, getSortedRowModel,
  ColumnFiltersState, getFilteredRowModel, VisibilityState,
} from "@tanstack/react-table"
// import { MoreHorizontal } from "lucide-react"
import { Input } from "../components/ui/input.js"
import { ArrowUpDown, ChevronDown, MoreHorizontal, PencilLine, Trash2 } from "lucide-react"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip.js"

import { Link, useSearchParams } from "react-router-dom"
import { user } from "../utils/types.js"
import { cn } from "../lib/utils.js"
import { useFilter } from "../hooks/CustomLinkFilterHook.js"
import { statusOptions } from "../constants/options.js"
import { StatusButtom } from "../components/buttons/button.js"

type Payment = {
  id: string
  amount: number
  status: "pending" | "recieved" | "sent" | "failed"
  email: string
}
interface iLogistic {
  price: number;
  name: string;
  tracking_number: string;
  status: "pending" | "recieved" | "sent" | "failed"
  descriptions?: ({
    name?: string,
    avatarPublicId?: string,
    imgUrl?: string
  })[],
  total: number
}

export const columns: ColumnDef<iLogistic>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() /*&& "indeterminate"*/)
  //       }
  //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //     aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   )

  //   ,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    // accessorKey: "status",
    header: "#",
    id: "n_0",
    cell: (row) => {
      return <div>{row.row.index + 1}</div>;
    },

    // accessorKey: (_row: any, i : number) => i + 1 
  },
  {
    accessorKey: "descriptions",
    header: "image",
    id: "n_0",
    cell: (row) => {
      const desc = row.row.original.descriptions
      let f_image: any = ''
      if (desc && desc?.length > 0) {
        f_image = desc[0]?.imgUrl
      }
      if (!f_image) return
      return <div>
        <img className="size-6"
          src={f_image}
        />
      </div>;
    },

    // accessorKey: (_row: any, i : number) => i + 1 
  },
  {
    accessorKey: "status",
    // header: "Status",
    header(props) {
      return (
        <div className="flex  items-center">
          Status <Status />
        </div>
      )
    },
    cell({ row }) {
      const status = row.original.status
      const statuses: ({
        name: typeof status,
        className?: string
      })[] = [
          {
            name: "pending",
            className: "bg-rose-300 shadow-xl "
          },
          {
            name: "recieved",
            className: "bg-blue-300"
          },
          {
            name: "sent",
            className: ""
          },
        ]


      const activeStatus = statuses.find((s) => s.name == status)
      return (
        <StatusButtom
          {...activeStatus}
        />
      )
    },
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

  // {
  //   header: "View",
  //   id: "view",
  //   cell: ({ row }) => {
  //     const log = row.original
  //     //the row value
  //     const tracking_number = log.tracking_number || 10;

  //     return <Link to={`/dashboard/logistic/${tracking_number}`}
  //       state={{
  //         rd_from: window.location.href
  //       }}
  //     >
  //       <Button
  //         variant="link"
  //       >view  </Button>
  //     </Link>
  //   }
  // },
  {
    header: "Action",
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
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
            // onClick={() => navigator.clipboard.writeText(log.tracking_number)}
            >
              <Link to={`/dashboard/logistic/${log.tracking_number}`}
              // onClick={e => e.defaultPrevented(true)}
              ><PencilLine size={10} className="mr-2 inline-block" />Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem

            >
              <Trash2 size={10} className="mr-2 inline-block" />  delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]

const Status = () => {
  // const [state, setState] = useState<"all" | "pending" | "recieved">("all")
  const [qs] = useSearchParams()
  const displayName = qs.get("status") || "all"
  const { handleFilterChange } = useFilter()
  const colors = [
    "text-green-600",
    "text-rose-600",
    "text-blue-600"
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="ghost" className="h-8 w-8 p-0 ml-2"> */}
        <ChevronDown size={15} className="ml-2 cursor-pointer" />
        {/* <span className="sr-only- text-xs text-rose-600">{displayName}</span> */}
        {/* <MoreHorizontal className="h-4 w-4" /> */}
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
        <DropdownMenuItem
          className={cn("",

            displayName == "all" && "bg-orange-400"
          )}
          onClick={() => {
            handleFilterChange({
              key: "status",
              value: "all"
            })
          }}
        >
          all
          <DropdownMenuSeparator />
        </DropdownMenuItem>

        {
          statusOptions.map((status, idx) => {
            const isFocus = status.label.toLocaleLowerCase() == displayName
            const color = colors[idx]
            return (
              <DropdownMenuItem
                className={cn("",

                  isFocus && "bg-orange-400",
                  color
                )}
                key={status.value}
                // onClick={() => navigator.clipboard.writeText(log.tracking_number)}
                onClick={() => {
                  handleFilterChange({
                    key: "status",
                    value: status.value
                  })
                }}
              >
                {status.label}
                <DropdownMenuSeparator />

              </DropdownMenuItem>
            )
          })
        }

        <DropdownMenuItem>
          {/* <Button variant="destructive">
    delete
  </Button> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export const allUsersColumns: ColumnDef<user>[] = [

  {
    header: "#",
    id: "n_0_",
    cell: (row) => {
      return <div>{row.row.index + 1}</div>;
    },

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
    accessorKey: "role",
    header: () => <div className="">ROLE</div>,
    cell: ({ row }) => {
      const role = row.original.role;
      // role==""

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger> <span className={cn("rounded-sm text-sm  w-fit p-1 bg-red-600  ",
              role == "admin" && "bg-orange-400"
            )}>{role}</span></TooltipTrigger>
            <TooltipContent>
              {role}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
  {

    header: "Total",
    accessorKey: "total"

  }
  ,
  {

    header: "Percent",
    accessorKey: "percent",
    cell({ row }) {
      const percent = row.original.percent
      return <span className="text-xs rounded-lg bg-">
        {percent.toFixed(1)} %
      </span>
    },

  }
  ,
  {
    accessorKey: "email",
    header: () => <div className="text-right">Emai Address</div>,
    cell: ({ row }) => {
      const email = row.original.email
      // const amount = parseFloat(row.getValue("price"))
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount)

      return <div className="text-right font-medium">{email}</div>
    },
  },

  {
    header: "View",
    id: "view",
    cell: ({ row }) => {
      const userId = row.original.userId
      //the row value


      return <Link to={`/dashboard/user/${userId}`}
        state={{
          rd_from: window.location.href
        }}
      >
        <Button
          variant="link"
        >view  </Button>
      </Link>
    }
  },
  {
    header: "Action",
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
              onClick={() => navigator.clipboard.writeText(`${log.userId}`)}
            >
              Copy  ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem

            >
              <Link to={`/dashboard/logistic/${log.userId}`}
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

