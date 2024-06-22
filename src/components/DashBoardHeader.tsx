import { Menu, Plus } from 'lucide-react'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useLocation } from 'react-router-dom'
import { IUserState } from '../actions/userSlice.js'
import useAuthenticalUser from '../hooks/Authentication.js'
import { cn } from '../lib/utils.js'
import { useDashBoardContext } from '../pages/ProtectedRoute/Dashboard.js'
import useGetLoginUser from '../utils/getLogInUser.js'
import Heading from './Heading.js'
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

const MainDropDown = () => {
    const { setDirection } = useDashBoardContext()
    const { logOut } = useAuthenticalUser()
    type iType = Exclude<IUserState["user"], null>

    const user = useGetLoginUser();

    // const { logOutUser } = useAppContext()
    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className='rounded-full block size-12 bg-colorPrimary/50'> <span className='rounded-full block size-14' /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setDirection(c => !c)}>
                    view
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                {
                    user?.role !== "admin" && <>
                        <DropdownMenuItem>
                            <Link to="/newtask">Create Task</Link>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </>
                }

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
    const user = useGetLoginUser();
    const { pathname } = useLocation()
    const currentLocation = pathname.split('/').reverse()[0].toString()
    const { setToggleSideBar, setShowFullContent, direction } = useDashBoardContext()
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })
    
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
                    {/* <h1 className='uppercase'>
                        <Link to={"/"}
                            className='block  font-semibold mx-4  text-sm lg:text-lg'
                        >
                            {
                                currentLocation?.length>6&&!isDesktop?currentLocation?.slice(0,6)+" ..":currentLocation
                            }
                        </Link>  </h1> */}
                </div>
                <div className='   
                w-[min(30rem,calc(100%-0.5rem))]--
                '>
                    <Heading className='font-black text-colorPrimary lg:text-2xl f'
                    >EGS Dashboard</Heading>
                </div>
                {/* mobile view only */}
                <div className='flex items-center gap-x-4 md:hidden'>
                    {user?.role !== "admin" && <Link to="/upload" >

                        <Button className='bg-colorPrimary '><span>Create Task</span> <Plus className="ml-2" size={20} /></Button>
                    </Link>}

                    <MainDropDown />

                </div>
                {/* desktop view  */}
                <div className='hidden md:flex gap-x-4 flex-none items-center'>
                    {user?.role !== "admin" && <Link to="/upload" >
                        <Button className='bg-colorPrimary '><span>Create Task</span> <Plus className="ml-2" size={20} /></Button>
                    </Link>}
                    {/* {user?.role == "admin" && <Link to="/upload" >
                        <Button className='bg-colorPrimary '><span>Create Employee</span> <Plus className="ml-2" size={20} /></Button>
                    </Link>} */}

                    <MainDropDown />
                </div>

            </div>
        </div >
    )
}

export default DashBoardHeader