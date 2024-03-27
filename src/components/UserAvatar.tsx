import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { cn } from '../lib/utils.js';
interface IUserAvatarProps {
    className?: string,
}
export const UserAvatar = ({ className }:IUserAvatarProps) => {
    return (
        <Avatar className=''>
            <AvatarImage className={cn('rounded-full size-24 mx-auto', className)} src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
