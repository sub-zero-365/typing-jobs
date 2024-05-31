// import { Ship } from 'lucide-react'
import React from 'react'
import { cn } from '../../lib/utils.js'
import { dashBoardItemsProps } from '../../pages/ProtectedRoute/DashBoardHome.js'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
interface IStatsCard extends dashBoardItemsProps {
    className?: string;
    hoverIndex?: number | null;
    setHoverIndex?: any;
    index?: number,
    asLink?: boolean,

}
function StatsCard({ className,
    icon: Icon,
    title,
    to,
    hoverIndex,
    setHoverIndex,
    index,
    asLink,
    count,
}: IStatsCard) {
    const isActive = hoverIndex == index
    if (!asLink) {
        return (
            <div
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className={cn(
                    ' flex-none relative p-2  py-4 mb-4 block rounded-md shadow-xl shadow-colorPrimary  transition-all duration-300 bg-white', className

                )}>
                <AnimatePresence>
                    {
                        isActive && <motion.div
                            layoutId="hoverBackgroundee"
                            animate={{
                                opacity: 1,
                                transition: { duration: 0.15 },
                            }}
                            exit={{
                                opacity: 0,
                                transition: { duration: 0.15, delay: 0.2 },
                            }}
                            className='absolute size-full  inset-0 rounded-xl bg-colorPrimary/20'
                        />
                    }


                </AnimatePresence>


                <div>
                    <figure className='flex mx-auto mb-2 w-full px-2
                    
                    justify-between -max-w-32 gap-x-2  items-end'>
                        <span
                            className='size-10 font-medium text-white flex items-center justify-center shadow-sm bg-colorPrimary rounded-[0.1rem]'
                        ><Icon size={20} /></span>
                        <h4
                            className='text-start text-sm  flex-1 text-colorPrimary font-semibold capitalize '
                        >{title}</h4>

                    </figure>
                    <div className='px-4 mb-2'>
                        <h1 className='font-bold text-xl '>
                            {count}
                        </h1>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link to={to}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className={cn(
                ' flex-none relative p-2 border py-4 mb-4 block rounded-md shadow-lg  transition-all duration-300 bg-white', className)}>
            <AnimatePresence>
                {
                    isActive && <motion.div
                        layoutId="hoverBackgroundee"
                        // layout
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.15 },
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.15, delay: 0.2 },
                        }}
                        className='absolute size-full ring-2 inset-0 rounded-sm'
                    />
                }


            </AnimatePresence>


            <div>
                <figure className='flex mx-auto mb-2 w-full px-2
                
                justify-between -max-w-32 gap-x-2  items-center'>
                    <span
                        className='size-10 font-medium text-white flex items-center justify-center shadow-sm bg-blue-300 rounded-sm'
                    ><Icon size={30} /></span>
                    <h4
                        className='text-start flex-1 text-sm font-semibold capitalize '
                    >{title}</h4>

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