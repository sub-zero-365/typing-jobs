import React from 'react'
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton.js"

interface iLoaderProps {
    childrenClassName?: string
    className?: string;
}
export const Loader = ({
    className,
    childrenClassName

}: iLoaderProps) => {
    return (
        <div className={cn('flex space-x-2 justify-center items-center bg-white- h-16 dark:invert',

            className)}>
            <span className='sr-only'>Loading...</span>
            <div className={cn('h-8 w-8 bg-[var(--primary-color,blue)] rounded-full animate-bounce [animation-delay:-0.3s]', childrenClassName)}></div>
            <div className={cn('h-8 w-8 bg-[var(--primary-color,blue)] rounded-full animate-bounce [animation-delay:-0.15s]', childrenClassName)}></div>
            <div className={cn('h-8 w-8 bg-[var(--primary-color,blue)] rounded-full animate-bounce [animation-delay:-0.10s]', childrenClassName)}></div>
            
            </div>
    )
}

export function SkeletonCard() {
    return (
        <div className="grid grid-cols-12 gap-x-4">

            <div className="col-span-12 sm:col-span-8 space-y-2">
                <Skeleton className="h-[40px] w-full " />
                <div className=" gap-4
            grid grid-cols-[repeat(auto-fit,minmax(min(15rem,calc(100%-0.4rem)),1fr))]">
                    {Array.from({ length: 4 }, (_, idx) => (
                        <div key={idx} className='space-y-2'>
                            <Skeleton className="h-40 max-w-sm w-full" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    ))}
                </div>
            </div>

            <div className='col-span-12 sm:col-span-4 '>
                <Skeleton className="h-[40px] w-full mb-4 " />
                <Skeleton className="h-44 max-w-sm w-full" />
            </div>

        </div>
    )
}


// export default Loader