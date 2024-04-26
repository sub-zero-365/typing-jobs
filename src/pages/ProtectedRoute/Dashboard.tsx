import { QueryKey, useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, redirect, useNavigation } from 'react-router-dom'
import { type IUserState, setUser } from '../../actions/userSlice.js'
import DashBoardHeader from '../../components/DashBoardHeader.js'
import { GlobalLoader } from '../../components/GlobalLoader.js'
import Sidebar from '../../components/Sidebar.js'
import { cn } from '../../lib/utils.js'
import customFetch from '../../utils/customFetch.js'
import { Notification } from '../../components/Notification/Notification.js'
interface IUser {
    queryKey: QueryKey,
    queryFn: () => Promise<Exclude<IUserState, null>>,
}
const userQuery: IUser = {
    queryKey: ["user"],
    queryFn: async () => {
        const { data } = await customFetch.get("/users/current-user");
        // console.log(data)
        return data

    }
}
export const loader = (queryClient) => async () => {
    try {
        return await queryClient.ensureQueryData(userQuery)
    } catch (error) {

        return redirect("/home?message=" + error?.response?.data?.msg)
    }
}
export interface ISideBar {
    toggleSideBar: boolean,
    setToggleSideBar: (props: any) => void
    showFullContent: boolean,
    setShowFullContent: (props: any) => void
    direction: boolean,
    setDirection: (props: any) => void,
    user?: IUserState['user']
}

const DashBoardContext = createContext<ISideBar | any>(null)

const Dashboard = () => {
    const navigation = useNavigation()
    const isPageLoading = navigation.state === "loading"
    const user = useQuery(userQuery).data?.user
    const dispatch = useDispatch()
    const setUserData = (payload) => {
        return dispatch(setUser(payload))
    }

    setUserData(user)
    const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
    const [showFullContent, setShowFullContent] = useState<boolean>(true);
    const [direction, setDirection] = useState<boolean>(false);
    // const [toggle, setToggle] = useState<boolean>(false)
    return (
        <>
            <Notification />
            <DashBoardContext.Provider value={{
                toggleSideBar,
                setToggleSideBar, setShowFullContent
                , showFullContent,
                setDirection,
                direction,
                user
            }}>


                <div className='h-screen max-w-7xl  overflow-y-auto  rounded-md mx-auto '>


                    <div className={cn("flex flex-row",
                        direction && "flex-row-reverse"
                    )}>
                        <div className='flex-none h-screen z-[10001] sticky left-0 top-0 bottom-0'>
                            <Sidebar></Sidebar>
                        </div>
                        <div
                            className='flex-1 w-[calc(100%-25rem)]  overflow-y-auto--  flex flex-col  '
                        >
                            <DashBoardHeader />
                            <div className='flex-1 p-2 overflow-x-hidden
                        h-[calc(100vh-3.5rem)] overflow-y-auto-'>
                                <Outlet context={{ user }} />
                            </div>
                        </div>
                    </div>
                    {isPageLoading && <GlobalLoader />}
                </div>
            </DashBoardContext.Provider>
        </>
    )
}
export const useDashBoardContext = () => useContext(DashBoardContext)

export default Dashboard