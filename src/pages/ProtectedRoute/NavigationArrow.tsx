import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpFromDot } from 'lucide-react';
import React from 'react';
const NavigationArrow = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [400, 500], [0, 1])
    const right = useTransform(scrollY, [300, 500], [-100, 32])
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <motion.div
            onClick={scrollToTop}
            style={{ opacity, right }}

            className='fixed z-[100] ring bg-colorPrimary animate-bounce bottom-16 top-auto right-8 rounded-full size-10 lg:size-14 flex items-center justify-center shadow-sm overflow-hidden'
        > <ArrowUpFromDot size={20} color='white' /></motion.div>
    )
}

export default NavigationArrow