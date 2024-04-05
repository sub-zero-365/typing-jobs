import React from 'react'
import { Outlet, Link } from "react-router-dom"
const AuthLayout = () => {
    return (
        <div className='max-w-5xl w-full mx-auto flex flex-col justify-center items-center'>
            <h1
                className='text-xl  my-5'
            >Welcome Back !!!</h1>
            <Outlet />
        </div>
    )
}

export default AuthLayout