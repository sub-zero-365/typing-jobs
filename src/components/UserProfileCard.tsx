// import { Heading } from 'lucide-react'
import React from 'react'
import Heading from './Heading.js'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "./ui/avatar.js"
import { Link } from 'react-router-dom'
const UserProfileCard = () => {
    return (
        <div className='bg-white shadow-sm rounded-sm mt-0 m-1.5 py-5'>
            <Link to={"/profile"} className='flex  flex-col items-center space-x-2'>
            <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
                <div>
                    <p className='text-sm font-medium italic'>Welcome Back</p>
                    <Heading 
                        className='text-sm'
                    >@RoseMary</Heading>
                </div>
            </Link>
        </div>
    )
}

export default UserProfileCard