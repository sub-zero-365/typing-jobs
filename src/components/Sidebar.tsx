import React, { useState } from 'react'
import { DashboardNavLinks } from '../constants/NavItemsLinks.js'
import { useDashBoardContext } from '../pages/ProtectedRoute/Dashboard.js'
import CustomNavLink from './CustomNavlink.js'
import UserProfileCard from './UserProfileCard.js'
import useGetLoginUser from '../utils/getLogInUser.js'
const Sidebar = ({ className }: { className?: string }) => {
    const { toggleSideBar, setToggleSideBar, showFullContent, direction } = useDashBoardContext()
    const user = useGetLoginUser()
    return (
        <div
            onClick={() => setToggleSideBar(false)}
            className={`
            h-screen
            z-[1000]
            w-full sm:fit bg-green-400/15
    fixed
    transition-all duration-500
    sm:opacity-100 
    sm:visible
   ${toggleSideBar ? " opacity-100 visible" : " opacity-0 invisible "}
            sm:static
            `}
        >
            <div className={` delay-200--
            transition-[width] duration-700
sm:!translate-x-0
   ${toggleSideBar ? direction ? "translate-x-full" : "translate-x-0" : " -translate-x-full "}
   ${showFullContent ? "w-[min(200px,calc(100vw-0.5rem))]" : "w-fit p-1"}
   border bg-slate-100 min-h-screen 
    
    `} onClick={(e: any) => e.stopPropagation()}>
                {
                    showFullContent && <UserProfileCard />
                }
                {/* <Button onClick={() => setShowFullContent(c => !c)}>toggle</Button> */}
                <div className='flex flex-col space-y-3 mt-4 px-2'>

                    {DashboardNavLinks.map((arr, index) => {
                        const { icon: Icon, name, link } = arr
                        if (user?.role != "admin" && name.toLocaleLowerCase() == "users") return
                        if (user?.role != "user" && name.toLocaleLowerCase() == "new task") return
                        return (
                            <CustomNavLink
                                show
                                layoutId='sidebarlayoutidv1.0.0'
                                selectedClassName=''
                                animateClassName="inset-0 size-full bg-purple-600/20"
                                className='bg-white  text-black hover:bg-purple-600/20 rounded-lg h-10 flex justify-center items-center px-2 '
                                to={link}
                            >  <div className='flex p-0.5  flex-start  items-center space-x-2  w-full'>
                                    <span>
                                        <Icon size={20} color='black' className='' />
                                    </span>
                                    {showFullContent && <span className='block  capitalize  font-medium'>
                                        {name}
                                    </span>}
                                </div>

                            </CustomNavLink>
                        )
                    })}
                </div>

            </div>
        </div>

    )
}

export default Sidebar