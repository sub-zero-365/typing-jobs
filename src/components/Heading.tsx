import React from 'react'
import { cn } from '../lib/utils.js'

interface IHeadingProps  {
    className?: string
    children: React.ReactNode
}
const Heading = ({ children, className, ...props }: IHeadingProps) => {
    return (
        <div
            {...props}
            className={cn("text-lg font-medium ", className)}
        >{children}</div>
    )
}

export default Heading