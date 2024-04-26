import {
  ColumnDef
} from "@tanstack/react-table"
import dayjs from "dayjs"
import { ArrowUpDown } from "lucide-react"
import React from "react"
import { Button } from "../components/ui/button.js"
import { demoUsersType } from "../constants/demoData"

export const demousercolumns: ColumnDef<demoUsersType>[] = [
  {
    id: 'number',
    header: "number",
    cell({ row }) {
      const index = row.index+1
      return (<span>{index}</span>)
    },
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "registration_date",
    header: 'Registration Date',
    cell({ row }) {
      const date = row.original.registration_date;
      return <span>
        {dayjs(date).format('DD/MM/YYYY')}
      </span>

    },
  },


]