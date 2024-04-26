import { useSearchParams } from "react-router-dom"
import { useFilter } from "../hooks/CustomLinkFilterHook.js"
import { Button, ButtonProps } from "./ui/button.js"
// import { useFilter } from '../Hooks/FilterHooks'
// import UiButton from '.Button'
import React from "react"
import { cn } from "../lib/utils.js";
import { AnimatePresence, motion } from "framer-motion"


interface IFilterProps extends Omit<ButtonProps, "value"> {
    className?: string;
    filterType: string ;
    children?: React.ReactNode;
    label?: string;
    value?: string | null ;
    selectedClassName?: string;
    show?: boolean;
    animateClassName?: string;

};

const FilterButton = ({
    className, children, filterType, label, value, selectedClassName,
    show,
    animateClassName,
    ...props }: IFilterProps) => {
    const { handleFilterChange } = useFilter()
    const [querySearch] = useSearchParams()
    // const { value } = props
    const isSelected = value == querySearch.get(filterType || "")
    return (
        <Button
            {...props}
            onClick={() => handleFilterChange({ key: filterType, value }, true)}
            className={cn("flex-none relative", className, isSelected && "bg-red-500",
                isSelected && selectedClassName
            )}

        > {label || children}
            {show && <AnimatePresence>

                {isSelected && <motion.span

                    initial={{ opacity: 0 }}

                    animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                    }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                    }}
                    layoutId='somecodehere'
                    className="absolute left-0 right-0 bottom-0 h-[2px] w-full 
                     bg-blue-500/50 rounded-lg"
                ></motion.span>}
            </AnimatePresence>}
        </Button>

    )

}

export default FilterButton