import React, { useState } from 'react'
import StatsCard from '../../components/Cards/StatsCard.js'
import Heading from '../../components/Heading.js'
import { LucideIcon, PercentSquare } from 'lucide-react'
// import { Table } from '../../components/ui/table.js'
import Table, { columns, payments } from '../../components/Table.js'
import { Bar_Chart } from '../../components/charts/recharts.js'

export type dashBoardItemsProps = {
  title: string,
  to: string,
  Icon: LucideIcon,
  className?: string
}
const DashBoardHome = () => {
  const dashBoardItems: readonly dashBoardItemsProps[] = [
    {
      title: "Logistics",
      to: "logistics",
      Icon: PercentSquare,
      className: 'bg-green-500',

    },
    {
      title: "Users",
      to: "users",
      Icon: PercentSquare,
      className: 'bg-blue-200',

    },
    {
      title: "Logistics",
      to: "logisitics",
      Icon: PercentSquare,
      className: 'bg-orange-200',

    },

  ]
  const [hoverIndex, setHoveredIndex] = useState<number | null>(0)
  return (
    <div
      className="flex-1 w-full max-w-full"
    >
      <Heading className='font-bold text-2xl mb-4'>DashBoard OverView </Heading>
      <div className="grid 
      gap-x-4 
      grid-cols-[repeat(auto-fit,minmax(min(20rem,calc(100%-0.3rem)),1fr))]">
        {dashBoardItems.map((items, index) => {
          return (<StatsCard

            asLink
            hoverIndex={hoverIndex}
            setHoverIndex={setHoveredIndex}
            key={index}
            index={index}
            {...items}
          />)
        })}
      </div>
      <Bar_Chart />
      <Table columns={columns} data={payments} />
    </div>
  )
}

export default DashBoardHome