import { ArrowLeft, Camera, Settings } from 'lucide-react'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import CustomNavLink from '../../components/CustomNavlink.js'
import Heading from '../../components/Heading.js'
import { Scrollable } from '../../components/Scrollable.js'
import { UserAvatar } from '../../components/UserAvatar.js'
import useGetLoginUser from '../../utils/getLogInUser.js'

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
                    <div className='flex-none overflow-hidden lg:w-[20rem] bg-white pt-5 rounded-sm shadow-sm'>
                        <div className='relative w-fit  mx-auto'>
                            <UserAvatar
                                className='size-[9rem]'
                            />
                            <span
                                className=' absolute bottom-0 right-2 ring-0 size-10
                                flex items-center justify-center
                                bg-slate-600 rounded-full'
                            >
                                <Camera size={15} color='white' />
                            </span>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-center font-medium mt-4 text-sm text-gray-600  leading-tight -mb-0.5 italic'>{user.userId ?? "11122"}</h2>
                            <h2 className='text-center font-medium text-lg text-gray-600  leading-tight -mb-0.5 italic'>{user.fullname ?? "RoseMary"}</h2>
                            <h2 className='text-center font-medium text-lg text-gray-800  italic'>{user.email}</h2>

                        </div>
                        <div
                            className='flex flex-col space-y-2 divide-y-[1px] border-t border-b '
                        >

                            {
                                Array.from({ length: 4 }, (arr, idx) => {
                                    return (<div className='flex p-2 px-4 justify-between items-center w-full max-w-md mx-auto'>
                                        <h2 className='text-lg font-[400]'>Models</h2>
                                        <span className='font-medium '>6</span>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    <div className='flex-1 py-3
                px-2  bg-white rounded-sm shadow-sm overflow-hidden'>
                        <Heading
                            className='px-5 leading-10 pb-3 font-semibold  border-b mb-6
                            '
                        >
                            Account Setup <span><Settings className="inline-block" size={15}></Settings></span>
                        </Heading>
                        <Scrollable
                            className='overflow-auto gap-x-0 w-full'
                            direction='column'
                        >
                            <CustomNavLink
                                replace
                                end
                                // CustomNavLink
                                to={"."}
                                show
                                className='bg-transparent rounded-none hover:bg-black/15  text-black flex-none block'
                                selectedClassName='bg-white/80 text-black'

                            >Edit Profile</CustomNavLink>
                            <CustomNavLink
                                replace
                                end
                                to={"users1"}
                                show
                                className='bg-transparent rounded-none hover:bg-black/15  text-black flex-none block'
                                selectedClassName='bg-white/80 text-black'

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