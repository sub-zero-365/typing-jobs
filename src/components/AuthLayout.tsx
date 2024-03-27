import React from 'react'
import { Outlet, Link } from "react-router-dom"
const AuthLayout = () => {
    return (
        <div className='max-w-5xl w-full mx-auto flex flex-col justify-center items-center'>
            <h1
                className='text-xl  my-5'
            >Welcome Back !!!</h1>
            <div className='space-x-4 items-center '>
                <Link
                    to={"./"}
                >
                    Login
                </Link>
                <Link
                    replace
                    to={"register"}
                >
                    Register
                </Link>

            </div>

            <Outlet />
        </div>
    )
}

export default AuthLayout