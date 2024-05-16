import React from 'react'
import { cn } from '../../lib/utils'
interface iStatus {
    className?: string,
    status?: "pending" | "paid" | "unpaid"
}
const Status = ({ className,
    status = "pending" }: iStatus) => {
    return (
        <span className={cn('rounded-full flex-none h-7 px-6 bg-red-500 grid place-items-center text-xs shadow-sm shadow-colorPrimary text-white',
            className,
            status == "paid" && "bg-green-800"

        )}>pending</span>

    )
}

export default Status