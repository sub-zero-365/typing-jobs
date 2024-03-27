import React from 'react'
import StatsCard from '../../components/Cards/StatsCard.js'
import Heading from '../../components/Heading.js'
import { LucideIcon, PercentSquare } from 'lucide-react'
// import { Table } from '../../components/ui/table.js'
import Table, { columns, payments } from '../../components/Table.js'

export type dashBoardItemsProps = {
  name: string,
  to: string,
  Icon: LucideIcon
}
const DashBoardHome = () => {
  const dashBoardItems: readonly dashBoardItemsProps[] = [
    {
      name: "Logistics",
      to: "logistics",
      Icon: PercentSquare
    },
    {
      name: "Users",
      to: "users",
      Icon: PercentSquare
    },
    {
      name: "Logistics",
      to: "logisitics",
      Icon: PercentSquare
    },

  ]

  return (
    <div
      className="flex-1 w-full max-w-full"
    >
      <Heading className='font-bold text-2xl mb-4'>DashBoard OverView </Heading>
      <div className="grid 
      gap-x-4 
      grid-cols-[repeat(auto-fit,minmax(min(20rem,calc(100%-0.3rem)),1fr))]">
        {dashBoardItems.map((items, index) => {
          return (<StatsCard key={index}
            {...items}
          />)
        })}
      </div>

      <Table columns={columns} data={payments} />
    </div>
  )
}

export default DashBoardHome