
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "@radix-ui/react-tooltip"
import React from "react"
// import { Tooltip } from "recharts"
import { cn } from "../../lib/utils"
export function StatusButtom({
    className,
    name
}: any) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger> <span className={cn("rounded-xl outline-1 font-medium text-[0.7rem] text-gray-800  w-fit px-2 py-1 shadow-lg  ",
                    className
                )}>{name}</span></TooltipTrigger>
                <TooltipContent className="mb-1">
                    {name}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}