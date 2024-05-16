import React from 'react'
import { Outlet, Link } from "react-router-dom"
import CustomNavLink from './CustomNavlink'
import Heading from './Heading'
const AuthLayout = () => {
    return (
        <div className='max-w-5xl w-full mx-auto flex py-10 flex-col justify-center items-center'>
            <Heading className='text-4xl font-black mb-4'>Welcome Back</Heading>
            <div className='grid px-4 text-center grid-cols-2 max-w-[28rem] mx-auto mb-5 w-full flex-row gap-4'>

                <CustomNavLink to='.'
                   
                    selectedClassName=''
                    animateClassName='inset-0 size-full bg-opacity-80 rounded-sm bg-purple-950'
                    className='bg-transparent text-black items-center flex justify-center hover:bg-slate-50'
                    show
                >
                    Login
                </CustomNavLink>
                <CustomNavLink to='./register'
                    animateClassName='inset-0 size-full bg-opacity-80 rounded-sm bg-purple-950'
                    selectedClassName=''
                    className='bg-transparent text-black items-center flex justify-center hover:bg-slate-50'
                    show

                >
                    Register
                </CustomNavLink>
            </div>

            <Outlet />
        </div>
    )
}

export default AuthLayout