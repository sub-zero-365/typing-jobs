import React, { useState } from 'react'
import { cn } from '../lib/utils.js'
import { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedLinks from './Links/AnimatedLinks.js';

type NavItemsProps = {
  className?: string,
  index?: number,
  name: string;
  link?: string;
  icon: LucideIcon

}
type Point = {
  x: number | null
}



const NavItem = ({
  className,
  index,
  icon: Icon,
  name,
  link,


}: NavItemsProps) => {
  const [hoverIndex, setIsMouseOver] = useState<null | number>(null)
  return (
    <div
      key={index}
      onMouseEnter={() => setIsMouseOver(index)}
      onMouseLeave={() => setIsMouseOver(null)}
      className={cn("border  p-2 relative overflow-hidden  rounded-xl ", className)}
    >

      <AnimatePresence>
        {hoverIndex === index && (
          <motion.span
            layoutId="bghover"
            className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block  rounded-3xl"
            initial={{ opacity: 0 }}

            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          >

          </motion.span>
        )

        }
      </AnimatePresence>
      <div className='flex  space-x-4'>
        <Icon></Icon>
        <AnimatedLinks
          className='text-sm'
          to={link}
        >{name}</AnimatedLinks>
      </div>
    </div>
  )
}

export default NavItem