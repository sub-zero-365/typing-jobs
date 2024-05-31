import React from 'react'
import { UserAvatar } from './UserAvatar'
import { Camera } from 'lucide-react'
import { IUserState } from '../actions/userSlice'
import { cn } from '../lib/utils'
type iType = Partial<Exclude<IUserState["user"], null>> & {
    className?: string
}

const DisplayUserInformationCard = ({ _id, email, fullname, phoneNumber, userId, className }: iType) => {
    return (
        <div className={cn('flex-none overflow-hidden lg:w-[20rem] bg-white pt-5 rounded-sm shadow-sm',
            className)}>
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
                <h2 className='text-center font-medium mt-4 text-sm text-gray-600  leading-tight -mb-0.5 italic'>{userId ?? "11122"}</h2>
                <h2 className='text-center font-medium text-lg text-gray-600  leading-tight -mb-0.5 italic'>{fullname ?? "RoseMary"}</h2>
                <h2 className='text-center font-medium text-lg text-gray-800  italic'>{email}</h2>

            </div>
            <div
                className='flex flex-col space-y-2 divide-y-[1px] border-t border-b '
            >

                {
                    Array.from({ length: 4 }, (arr, idx) => {
                        return (<div key={idx} className='flex p-2 px-4 justify-between items-center w-full max-w-md mx-auto'>
                            <h2 className='text-lg font-[400]'>Models</h2>
                            <span className='font-medium '>6</span>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default DisplayUserInformationCard