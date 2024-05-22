import { NavLink, NavLinkProps } from "react-router-dom";
import { Button, ButtonProps } from "./ui/button.js";
// import { useFilter } from '../Hooks/FilterHooks'
// import UiButton from '.Button'
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { cn } from "../lib/utils.js";


interface IFilterProps extends NavLinkProps {
    selectedClassName?: string;
    show?: boolean;
    animateClassName?: string;
    replace?: boolean;
    end?: boolean;
    layoutId?: string

};

const CustomNavLink = ({
    className, children, selectedClassName,
    show,
    animateClassName,
    layoutId,
    ...props }: IFilterProps) => {
    return (
        <NavLink {...props}
            className={({ isActive }) => (cn("flex-none block relative w-full h-8", className, isActive && "",
                isActive && selectedClassName
            ))}
        >
            {({ isActive }) => (
                <>
                    {children}

                    {<AnimatePresence>

                        {isActive && show && <motion.span

                            initial={{ opacity: 0 }}

                            animate={{
                                opacity: 1,
                                transition: { duration: 0.15 },
                            }}
                            exit={{
                                opacity: 0,
                                transition: { duration: 0.15, delay: 0.2 },
                            }}
                            // layoutId
                            layoutId={layoutId || "hoverBackground"}

                            className={cn("absolute left-0 right-0 bottom-0 h-[2px] w-full bg-blue-500 rounded-lg", animateClassName)}
                        ></motion.span>}
                    </AnimatePresence>}
                </>
            )}
        </NavLink>


    )

}

export default CustomNavLink