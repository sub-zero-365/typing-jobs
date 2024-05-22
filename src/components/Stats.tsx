import { Car, PersonStanding, User } from 'lucide-react';
import React from 'react'
import StatsCard from './Cards/StatsCard';
// import { dashBoardItemsProps } from '../pages/ProtectedRoute/DashBoardHome.js'

const Stats = ({ defaultStats, nHits }: any) => {
    const [hoverIndex, setHoveredIndex] = React.useState<number | null>(0)

    const stats = [
        {
            title: 'Applications',
            count: nHits || 0,
            icon: User,
            className: 'bg-green-200 shadow-lg shadow-colorPrimary rounded-xl',
        },
        {
            title: 'pending applications',
            count: defaultStats?.pending || 0,
            icon: User,
            className: 'bg-blue-200 shadow-lg shadow-colorPrimary rounded-xl',
        },
        {
            title: 'interviews scheduled',
            count: defaultStats?.recieved || 0,
            icon: PersonStanding,
            className: 'bg-orange-200 shadow-lg shadow-colorPrimary rounded-xl',
        },
        {
            title: 'jobs declined',
            count: defaultStats?.declined || 0,
            icon: Car,
            className: 'bg-green-200 shadow-lg shadow-colorPrimary rounded-xl',
        },
    ];
    return (
        <div
            className="grid
      gap-x-6
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