import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { IUserState } from '../../actions/userSlice.js'
import { Scrollable } from '../../components/Scrollable.js'
import Heading from '../Heading'
import { Button } from '../ui/button'
import Status from '../buttons/Status.js'

const Task = () => {

    const { user } = useOutletContext<Exclude<IUserState, null>>();

    return (
        <div className=' shadow-lg shadow-colorPrimary/50 py-8 flex-col px-4  rounded-2xl max-w-[calc(100%-0.5rem)] mx-auto group min-h-20 bg-red-50 flex items-center justify-center'>


            {/* <div className='flex justify-between w-full mb-2 '>
                <span className='rounded-full px-4 ring-[1px] ring-colorPrimary text-black grid place-items-center text-xs shadow '>status: unpaid</span>
            </div> */}
            <div className='flex w-full  justify-between mb-6'>
                <Heading
                    className='text-2xl uppercase'

                >colors hair</Heading>
                <span className='rounded-full h-fit py-1 px-4 ring-[1px] ring-colorPrimary text-black grid place-items-center text-xs shadow '>status: unpaid</span>
                
                {/* <Status status='paid' /> */}
            </div>
            <div className='w-full mb-6 text-sm italic'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum, aliquid.
            </div>
            <Heading className='w-full font-medium text-sm mb-1'>
                Document(s) details
            </Heading>
            <Scrollable className='w-full mb-4 gap-x-2 scrollto [--light-color:hsl(var(--color-primary))] [--scroll-to-height:7px]'>
                {Array.from({ length: 5 }, (arr, idx) => {
                    return <p
                    className=' rounded-full text-xs border-[1px] p-2 mb-1 px-2 bg-colorPrimary/95 text-white'
                    >N_0:10pages </p>
                })}
            </Scrollable>
            <div className='w-full flex gap-x-4 justify-end'>
                <Link to="/task/3567653">
                    <Button className='rounded-full px-10' variant="default">Detail</Button>
                </Link>
                {/* <Button
                    variant="link"
                >Download</Button> */}
            </div>
        </div>
    )
}

export default Task