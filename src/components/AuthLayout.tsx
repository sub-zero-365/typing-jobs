import React from 'react'
import { Outlet, Link } from "react-router-dom"
import CustomNavLink from './CustomNavlink'
import Heading from './Heading'
const AuthLayout = () => {
    return (
        <div className='max-w-5xl w-full mx-auto flex flex-col justify-center items-center'>
            <Heading className='text-4xl font-black mb-4'>Welcome Back</Heading>
            <div className='grid px-4 grid-cols-2 max-w-[28rem] mx-auto mb-5 w-full flex-row gap-4'>

                <CustomNavLink to='./'
                    end={false}
                    selectedClassName=''
                    className='bg-transparent text-black hover:bg-slate-50'
                    show
                >
                    Login
                </CustomNavLink>
                <CustomNavLink to='./register'
                    end={false}
                    selectedClassName=''
                    className='bg-transparent text-black hover:bg-slate-50'
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