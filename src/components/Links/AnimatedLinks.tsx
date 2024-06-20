import React from 'react'
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom'
import { cn } from '../../lib/utils.js';
interface AnimatedLinksProps extends NavLinkProps {
    text?: string;
    className?: string,
    children?: React.ReactNode,
    secondTextClassName?: string
}
const AnimatedLinks = ({ text, className, children, secondTextClassName, ...props }: AnimatedLinksProps) => {
    return (
        <h1 className={cn('text-2xl  z--10 cursor-pointer  font-bold relative group overflow-hidden',
            className)}>
            <NavLink {...props}
                className={({ isActive }) => (cn(`absolute block left-0 right-0
      group-hover:bottom-0 
      transition-all duration-500
    -bottom-[calc(100%)] size-full text-orange-600- `,
                    isActive && "text-blue-600"

                ))}>
                {children ?? text}
            </NavLink>

            <NavLink
                end
                {...props}
                className={({ isActive }) => (cn(`block group-hover:-translate-y-10
            delay-100
            transition-all duration-500
                 w-full`, secondTextClassName,
                    isActive && "text-blue-600"
                ))}
            >
                {children ?? text}

            </NavLink>
        </h1 >
    )
}

export default AnimatedLinks