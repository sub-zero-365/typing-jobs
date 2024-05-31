import { Car, LucideIcon, PersonStanding, User } from 'lucide-react';
import React from 'react'
import StatsCard from './Cards/StatsCard';
import { iStat } from '../utils/types';
// import { dashBoardItemsProps } from '../pages/ProtectedRoute/DashBoardHome.js'

interface iStats {
    stats: iStat[],
    nHits?: number
}
export const stats = [
    {
        title: 'Total Users',
        count: 4 || 0,
        icon: User,
        className: 'bg-green-900 shadow-lg shadow-colorPrimary rounded-xl text-white',
    },
    {
        title: 'Admins',
        count: 37 || 0,
        icon: User,
        className: 'bg-blue-200 shadow-lg shadow-colorPrimary rounded-xl',
    },
    {
        title: 'Employees',
        count: 33 || 0,
        icon: PersonStanding,
        className: 'bg-orange-200 shadow-lg shadow-colorPrimary rounded-xl',
    },
    {
        title: 'Normal Users',
        count: 37 || 0,
        icon: Car,
        className: 'bg-green-200 shadow-lg shadow-colorPrimary rounded-xl',
    },
];
const Stats = ({ nHits, stats }: iStats) => {
    const [hoverIndex, setHoveredIndex] = React.useState<number | null>(0)


    return (
        <div
            className="grid
            gap-x-2
      lg:gap-x-6
      grid-cols-[repeat(auto-fit,minmax(min(8rem,calc(100%-0.3rem)),1fr))] sm:grid-cols-[repeat(auto-fit,minmax(min(10rem,calc(100%-0.3rem)),1fr))] md:grid-cols-[repeat(auto-fit,minmax(min(12rem,calc(100%-0.3rem)),1fr))] mb-6"
        >
            {
                stats.map((item, index) => {
                    const { icon: Icon, ...props } = item
                    return (<StatsCard
                        to={''}
                        icon={Icon}
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