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
    filterType: string;
    children?: React.ReactNode;
    label?: string;
    value?: string | null;
    selectedClassName?: string;
    show?: boolean;
    animateClassName?: string;
    layoutId?: string
};

const FilterButton = ({
    className, children, filterType, label, value, selectedClassName,
    show,
    animateClassName,
    layoutId,
    ...props }: IFilterProps) => {
    const { handleFilterChange } = useFilter()
    const [querySearch] = useSearchParams()
    const isSelected = value == querySearch.get(filterType || "")
    return (
        <Button
            {...props}
            onClick={() => handleFilterChange({ key: filterType, value }, true)}
            className={cn(" !relative", className,
                isSelected && "bg-red-500",
                isSelected && selectedClassName
            )}

        > 
      

                {children}

                {<AnimatePresence>

                    {isSelected && show && <motion.span

                        initial={{ opacity: 0 }}

                        animate={{
                            opacity: 1,
                            transition: { duration: 0.15 },
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.15, delay: 0.2 },
                        }}
                        layoutId={layoutId || "hoverBackground"}
                        className={cn("absolute inset-0 size-full bg-blue-500 rounded-lg", animateClassName)}
                    ></motion.span>}
                </AnimatePresence>}
           
        </Button>

    )

}

export default FilterButton