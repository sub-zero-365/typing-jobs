import { LucideIcon, LucideProps } from 'lucide-react';
import React from 'react'
import { cn } from '../../lib/utils.js';
import { IconCircleArrowLeft, IconCircleArrowRight } from '@tabler/icons-react';
interface Props extends LucideProps {
    onClick?: () => void;
    Icon?: LucideIcon;
    name?: string,
    className?: string

}
export const NextButton = ({
    name,
    Icon,
    onClick = () => 0,
    className,
    ...props
}: Props) => {
    return (
        <div
            onClick={onClick}
            className={cn("size-16- hover:ring-[1rem] transition-all duration-300 rounded-full bg-slate-800/15-  flex justify-center items-center",
                className
            )}
        >
            <span className='sr-only'>{name}</span>
            {Icon ? <Icon {...props} /> : <IconCircleArrowRight {...props} />}
        </div>
    )
}
export const PreButton = ({
    name,
    Icon,
    onClick = () => 0,
    className,
    ...props
}: Props) => {
    return (
        <div
            onClick={onClick}
            className={cn("size-16- hover:ring-[1rem] transition-all duration-300 rounded-full bg-slate-800/15-  flex justify-center items-center",
                className
            )}
        >
            <span className='sr-only'>{name}</span>
            {Icon ? <Icon {...props} /> : <IconCircleArrowLeft {...props} />}
        </div>
    )
}

