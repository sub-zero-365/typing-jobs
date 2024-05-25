import { Menu, Settings2 } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuthenticalUser from '../hooks/Authentication.js'
import { cn } from '../lib/utils.js'
import { useDashBoardContext } from '../pages/ProtectedRoute/Dashboard.js'
import Theme from './Theme.js'
import { Button } from './ui/button.js'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu.js"
// import { useAppContext } from './RootElement.js'

const MainDropDown = () => {
    const { setDirection } = useDashBoardContext()
    const { logOut } = useAuthenticalUser()

    // const { logOutUser } = useAppContext()
    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className='rounded-full block size-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'> <span className='rounded-full block size-14' /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setDirection(c => !c)}>
                    view
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/newtask">Create Task</Link>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                    New Team
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />


            <DropdownMenuItem >
                <Link to={"/home"}>View Site</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logOut()
            } className='text-rose-500'

            >
                Log out

            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}
const DashBoardHeader = () => {
    const { pathname } = useLocation()
    const currentLocation = pathname.split('/').reverse()[0].toString()
    const { setToggleSideBar, setShowFullContent, direction } = useDashBoardContext()
    return (
        <div className='flex-none h-14 !sticky !top-0 left-0 flex overflow-hidden  ring-0 z-[10]  w-full shadow-lg bg-white px-2   items-center'>
            <div className={cn('flex gap-x-4  justify-between items-center flex-1',
                direction && "flex-row-reverse"
            )}>
                <div className={cn('flex items-center cursor-pointer',
                    direction && "flex-row-reverse"

                )}>
                    <span
                        onClick={() => setToggleSideBar(true)}
                        className='md:hidden grid place-items-center size-10 bg-white'>
                        <Menu />
                    </span>
                    <span
                        onClick={() => setShowFullContent(c => !c)}
                        className='hidden md:grid place-items-center size-10 bg-white'>
                        <Menu />
                    </span>
                    <h1 className='uppercase'>
                        <Link to={"/"}
                            className='block  font-semibold mx-4  text-sm lg:text-lg'
                        >
                            {
                                currentLocation
                            }
                        </Link>  </h1>
                </div>
                {/* <div className='md:block hidden    flex-none
                w-[min(30rem,calc(100%-0.5rem))]
                '>

                </div> */}
                {/* mobile view only */}
                <div className='flex items-center gap-x-4 md:hidden'>
                <Link to="/upload">
                        <Button>Create Task</Button>
                    </Link>
                    <MainDropDown />

                </div>
                {/* desktop view  */}
                <div className='hidden md:flex gap-x-4 flex-none items-center'>
                    <Link to="/newtask">
                        <Button>Create Task</Button>
                    </Link>
                        <Theme 
                          className='size-4'
                          containerClassName='w-14'
                        />
                    <MainDropDown />
                </div>

            </div>
        </div >
    )
}

export default DashBoardHeader