import React from "react"
import { cn } from "../../lib/utils"
const PopOver = ({ children, text, className }: {
    children: React.ReactNode, text: string,
    className?: string
}) => {
    return (
        <div
            className={cn('group popover flex-none hover:scale-125 transition-all  duration-300 hover:-translate-y-2  cursor-pointer min-h-10   relative flex items-center justify-center  rounded-full bg-gray-80', className)}
        >
            <div className='w-52 rounded  text-center group-[:hover]:visible invisible duration-300 transition-colors  px-5 py-1.5 bg-black absolute -top-[calc(100%+0rem)]'>
                <p
                    className='text-white text-xs  lg:text-sm leading-relaxed relative z-[2]'
                >{text}</p>
                <div className='w-4 h-4 -mt-1 z-[1]
                                bg-black
                                
                                rotate-45 absolute
                                left-1/2 -translate-x-1/2 '>

                </div>
            </div>
            {children}
        </div>
    )
}
export default PopOver