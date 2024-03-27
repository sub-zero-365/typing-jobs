import { Ship } from 'lucide-react'
import React from 'react'
import { cn } from '../../lib/utils.js'
import { dashBoardItemsProps } from '../../pages/ProtectedRoute/DashBoardHome.js'
import { Link } from 'react-router-dom'
interface IStatsCard extends dashBoardItemsProps {
    className?: string
}
function StatsCard({ className, Icon, name, to }: IStatsCard) {
    return (
        <Link to={to} className={cn(
            ' flex-none p-2 border py-4 mb-4 block rounded-md shadow-lg hover:ring-2 transition-all duration-300 bg-white', className)}>
            <div>
                <figure className='flex mx-auto mb-2 w-full px-2
                
                justify-between -max-w-32 gap-x-2  items-center'>
                    <span
                        className='size-10 font-medium text-white flex items-center justify-center shadow-sm bg-blue-300 rounded-sm'
                    ><Icon size={30} /></span>
                    <h4
                        className='text-start flex-1 text-sm font-semibold capitalize '
                    >total {name}</h4>
                    
                </figure>
                <div className='px-4 mb-2'>
                    <h1 className='font-bold text-xl '>
                        676.73
                    </h1>
                </div>
            </div>
        </Link>
    )
}

export default StatsCard