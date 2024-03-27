import React, { SetStateAction, useState, Dispatch } from 'react'
import { NavLink } from 'react-router-dom';
import { INavItemsLinks } from '../constants/NavItemsLinks.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useDashBoardContext } from '../pages/ProtectedRoute/Dashboard.js';
import { cn } from '../lib/utils.js';
// import { Dispatch } from '@reduxjs/toolkit';
interface ISidebarProps extends INavItemsLinks {
    index: number,
    showFullContent?: boolean,
    setHoverIndex: Dispatch<SetStateAction<number | null>>;
    hoverIndex: number | null

}
function SideBarItem({ index, link,
    name, icon: Icon, showFullContent,
    setHoverIndex,
    hoverIndex }: ISidebarProps) {
    const { setToggleSideBar } = useDashBoardContext()

    const defaultClassess = `text-sm hover:bg-orange-400/50 bg-slate-600 cursor-pointer block text-white relative rounded-lg shadow mx-2 p-1.5 select-none`

    return (
        <div className='text-start  px-2 '
            key={index}
        >
            <NavLink to={link}
                end
                onClick={() => {
                    setHoverIndex(index)
                    const timer = setTimeout(() => {
                        clearTimeout(timer)
                        setToggleSideBar(false)
                    }, 500);

                }}
                className={({ isActive }) => isActive ? cn(defaultClassess, "bg-red-900",
                    showFullContent && "pl-4 ",
                )
                    : `${defaultClassess}`}
            // className={`${defaultClassess}`}
            >
                {({ isActive }) => (
                    <>

                        <AnimatePresence initial={false}>
                            {hoverIndex === index && <motion.span
                                className='absolute inset-0 bg-slate-500/50 rounded-lg
    '
                                initial={{ opacity: 0 }}

                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                                layoutId
                            >
                            </motion.span>}
                        </AnimatePresence>

                        <div className='flex p-1  flex-start items-center space-x-2'>
                            <span>
                                <Icon size={20} color='black' className='' />
                            </span>
                            {showFullContent && <span className='block  capitalize  font-medium'>
                                {name}
                            </span>}
                        </div>
                    </>

                )}

            </NavLink>

        </div>
    )
}

export default SideBarItem