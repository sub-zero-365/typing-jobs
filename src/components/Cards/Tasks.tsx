import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { IUserState } from '../../actions/userSlice.js'
import { Scrollable } from '../../components/Scrollable.js'
import Heading from '../Heading'
import { Button } from '../ui/button'

const Task = () => {
    // const {user} = useDashBoardContext()

    const { user } = useOutletContext<Exclude<IUserState, null>>();

    return (
        <div className='border shadow-lg flex-col px-4 py-5 rounded-s group min-h-20 bg-red-50 flex items-center justify-center'>


            <div className='flex justify-between w-full mb-2 '>
                <span className='rounded-full px-4 ring text-black grid place-items-center text-xs shadow '>status: unpaid</span>

                <p className='text-xs mb-2 font-black'>id {466468898}</p>
            </div>
            role {user?.email}
            <div className='flex w-full  justify-between mb-6'>
                <Heading
                    className='text-2xl uppercase'

                >colors hair</Heading>
                <span className='rounded-full px-6 bg-red-500 grid place-items-center text-xs shadow text-white'>pending</span>
            </div>
            <div className='w-full mb-6 text-sm italic'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis modi nobis voluptatum itaque voluptatibus minima quibusdam earum veniam deleniti, eius saepe? Autem quasi accusantium quos cumque veritatis vel magnam!
            </div>
            <Heading className='w-full font-black'>
                Docs details
            </Heading>
            <Scrollable className='w-full mb-4 divide-x-2'>
                {Array.from({ length: 5 }, (arr, idx) => {
                    return <p>N_0:10pages </p>
                })}
            </Scrollable>
            <div className='w-full flex gap-x-4 justify-end'>
                <Link to="/task/3567653">
                    <Button>Details</Button>
                </Link>
                <Button
                    variant="link"
                >Download</Button>
            </div>
        </div>
    )
}

export default Task