import React, { Children } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils.js';
interface AnimatedLinksProps {
    text?: string;
    className?: string,
    to: string,
    children?: React.ReactNode,
    secondTextClassName?: string
}
const AnimatedLinks = ({ text, className, to, children, secondTextClassName }: AnimatedLinksProps) => {
    return (
        <h1 className={cn('text-2xl  z--10 cursor-pointer  font-bold relative group overflow-hidden',
            className)}>
            <Link to={to}
                className='absolute block left-0 right-0
      group-hover:bottom-0 
      transition-all duration-500
    -bottom-[calc(100%)] size-full text-orange-600- '
            >
                {children ?? text}
            </Link>

            <Link to={to}
                className={cn(`block group-hover:-translate-y-10
                delay-100
                transition-all duration-500
             w-full`, secondTextClassName)}
            >
                {children ?? text}

            </Link>
        </h1>
    )
}

export default AnimatedLinks