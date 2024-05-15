import React from 'react'
import { cn } from '../lib/utils.js'
import { animateHeadingVariants, pageAnimationVariantsTransiton } from '../utils/framervariants.js'
import { motion } from "framer-motion"
interface IHeadingProps {
    className?: string
    children: React.ReactNode
}
const Heading = ({ children, className, ...props }: IHeadingProps) => {
    return (
        <div
            {...props}
            className={cn("text-lg font-medium ", className)}
        >{children}</div>
    )
}
export const VariantHeading = ({ children, className, ...props }: IHeadingProps) => {
    return (
        <motion.div
            variants={animateHeadingVariants}
            initial="initial"
            whileInView="animate"
            transition={pageAnimationVariantsTransiton}
            {...props}
            viewport={{ once: false, amount: 0.8, margin: "10px" }}
            className={cn("text-lg font-medium [font-family:var(--second-font)]", className)}
        >{children}</motion.div>
    )
}

export default Heading