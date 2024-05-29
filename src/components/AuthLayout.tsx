import React from 'react'
import { Outlet, Link } from "react-router-dom"
import CustomNavLink from './CustomNavlink'
import Heading from './Heading'
const AuthLayout = () => {
    return (
        <div className='max-w-xl bg-white w-[calc(100%-1rem)] mt-6 px-4 rounded-md  mx-auto flex py-10 flex-col justify-center items-center'>
            <Heading className='text-3xl lg:text-4xl font-medium mb-4 flex items-center justify-center text-colorPrimary font-pacifico'>Welcome Back <span className='text-xl ml-2'>🥰</span></Heading>
            <div className='grid  text-center gap-x-2 grid-cols-2 max-w-[28rem] mx-auto mb-5 w-full flex-row gap-4'>

                <CustomNavLink to='.'
                    end
                    layoutId='somerandomlayoutid'
                    selectedClassName='text-green-800   text-white bg-colorPrimary'
                    animateClassName="inset-0  size-full shadow-md  right-0  bg-colorPrimary/60  rounded-sm "
                    className='bg-transparent text-sm justify-center relative z-20 bg-white lg:tex hover:bg-colorPrimary/55 t-sm capitalize w-full px-4 shadow text-medium rounded-sm  shadow-colorPrimary mb-0.5 h-9 flex items-center  '
                show
                >
                    Login
                </CustomNavLink>
                <CustomNavLink to='./register'
                    layoutId='somerandomlayoutid'
                    selectedClassName='text-green-800   text-white bg-colorPrimary'
                    animateClassName="inset-0  size-full shadow-md  right-0  bg-colorPrimary/60  rounded-sm "
                    className='bg-transparent text-xs relative z-20 bg-white lg:text-sm capitalize hover:bg-colorPrimary/55  w-full px-4 shadow text-medium rounded-sm justify-center  shadow-colorPrimary mb-0.5 h-9 flex items-center   text-center'
                 show

                    end
                >
                    Register
                </CustomNavLink>
            </div>

            <Outlet />
        </div>
    )
}

export default AuthLayout