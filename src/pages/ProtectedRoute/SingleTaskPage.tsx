import React from 'react'
import { TimeLine, TimeLineContainer } from '../../components/ui/TimeLine'
import Heading from '../../components/Heading'
import { AnimatedText } from '../../components/Animated/animated'
import CustomNavLink from '../../components/CustomNavlink'
import { Outlet } from 'react-router-dom'
export const loader = () => {
    return null
}
const SingleTaskPage = () => {
    return (
        <div>
            <AnimatedText text='Task' />
            <div className='grid grid-cols-[1fr,auto] '>
                <div>
                    <Heading>Document Detail</Heading>

                </div>
                <div className='max-w-sm'>

                    <Heading className='mb-6'>Edited History</Heading>
                    <div className='grid px-4 grid-cols-2 max-w-[28rem] mx-auto mb-5 w-full flex-row gap-4'>

                        <CustomNavLink to='./'

                            selectedClassName=''
                            className='bg-transparent text-black hover:bg-slate-50'
                            show
                        >
                            later
                        </CustomNavLink>
                        <CustomNavLink to='./later'

                            selectedClassName=''
                            className='bg-transparent text-black hover:bg-slate-50'
                            show

                        >
                            add
                        </CustomNavLink>
                    </div>
                    <Outlet />
                </div>
                </div>
        </div>
    )
}

export default SingleTaskPage