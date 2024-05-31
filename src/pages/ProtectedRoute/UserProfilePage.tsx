import { ArrowLeft, Camera, Settings } from 'lucide-react'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import CustomNavLink from '../../components/CustomNavlink.js'
import Heading from '../../components/Heading.js'
import { Scrollable } from '../../components/Scrollable.js'
import { UserAvatar } from '../../components/UserAvatar.js'
import useGetLoginUser from '../../utils/getLogInUser.js'
import DisplayUserInformationCard from '../../components/DisplayUserInformationCard.js'

const UserProfilePage = () => {
    const user = useGetLoginUser();
    const navigate = useNavigate()
    return (
        <div className='flex-1 w-full -mt-2'>
            <div className='min-h-[12rem]  bg-orange-400'>
                <span className=" rounded-full sm:hidden text-white font-medium
                size-10 grid place-items-center"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={25} />
                </span>
            </div>
            <div className=' mx-2 lg:mx-8 -mt-14 min-h-24  '>
                <div className='flex flex-col lg:items-start gap-y-6 lg:flex-row gap-x-4 min-h-[25rem]'>
                    <DisplayUserInformationCard {...user} />
                    <div className='flex-1 py-3
                px-2  bg-white rounded-sm shadow-sm overflow-hidden'>
                        <Heading
                            className='px-5 leading-10 pb-3 font-semibold  border-b mb-6
                            '
                        >
                            Account Setup <span><Settings className="inline-block" size={15}></Settings></span>
                        </Heading>
                        <Scrollable
                            className='overflow-auto gap-x-2 w-full'
                            direction='row'
                        >
                            <CustomNavLink
                                replace
                                end
                                // CustomNavLink
                                to={"."}
                                show
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs relative z-20 bg-white lg:text-sm capitalize w-fit px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9 flex items-center   hover:bg-purple-600/20'


                            >Edit Profile</CustomNavLink>
                            <CustomNavLink
                                replace
                                end
                                to={"users1"}
                                show
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs relative z-20 bg-white lg:text-sm capitalize w-fit px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9 flex items-center   hover:bg-purple-600/20'


                            >Edit Sales</CustomNavLink>

                        </Scrollable>

                        <br />
                        <Outlet context={{ user }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage