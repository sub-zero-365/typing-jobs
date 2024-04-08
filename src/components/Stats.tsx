import { Car, PersonStanding, User } from 'lucide-react';
import React from 'react'
import StatsCard from './Cards/StatsCard';
// import { dashBoardItemsProps } from '../pages/ProtectedRoute/DashBoardHome.js'

const Stats = ({ defaultStats, nHits }: any) => {
    const [hoverIndex, setHoveredIndex] = React.useState<number | null>(0)

    const stats = [
        {
            title: 'pending applications',
            count: nHits || 0,
            icon: User,
            className: 'bg-green-500 hover:scale-[0.95]',
        },
        {
            title: 'pending applications',
            count: defaultStats?.pending || 0,
            icon: User,
            className: 'bg-red-200 hover:scale-[0.95]',
        },
        {
            title: 'interviews scheduled',
            count: defaultStats?.recieved || 0,
            icon: PersonStanding,
            className: 'bg-blue-200 hover:scale-[0.95]',
        },
        {
            title: 'jobs declined',
            count: defaultStats?.declined || 0,
            icon: Car,
            className: 'bg-green-200 hover:scale-[0.95]',
        },
    ];
    return (
        <div
            className="grid
      gap-x-4 
      grid-cols-[repeat(auto-fit,minmax(min(15rem,calc(100%-0.3rem)),1fr))]"
        >
            {
                stats.map((item, index) => {
                    const { icon: Icon, ...props } = item
                    return (<StatsCard
                        to={''}
                        Icon={Icon}
                        hoverIndex={hoverIndex}
                        setHoverIndex={setHoveredIndex}
                        key={index}
                        index={index}
                        {...props} />)
                })}

        </div>
    )
}

export default Stats