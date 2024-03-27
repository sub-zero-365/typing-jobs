import React from 'react'
import { cn } from '../lib/utils.js'
interface IScrollableProps {
    children: React.ReactNode,
    className?: string,
    direction?: "row" | "column"
}
export const Scrollable = ({ children, className, direction }: IScrollableProps) => {
    return (
        <div
            className={cn("flex flex-nowrap overflow-x-auto  gap-x-4 md:gap-x-2",
                className,
                direction == "row" && "flex-nowrap",
                direction == "column" && "flex-wrap "

            )}
        >{children}</div>
    )
}
