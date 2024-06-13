import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowUpFromDot } from 'lucide-react';
import React, { useState } from 'react';
import { CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const NavigationArrow = () => {
    const { scrollY, scrollYProgress } = useScroll();
    const opacity = useTransform(scrollY, [400, 500], [0, 1])
    const right = useTransform(scrollY, [300, 500], [-100, 32])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    const [percent, setPercent] = useState(0)
    console.log("this is scroll y", percent)
    useMotionValueEvent(scrollYProgress, "change", current => {
        console.log(current, typeof current)
        const n = Number((current * 100)?.toFixed(0))
        if (typeof current == "number") setPercent(n)

    })
    return (
        <motion.div
            onClick={scrollToTop}
            style={{ opacity, right }}

            className='fixed z-[100]  bg-colorPrimary animate-bounce bottom-16 top-auto right-8 rounded-full size-10 lg:size-14 flex items-center justify-center shadow-sm overflow-hidden'
        ><CircularProgressbarWithChildren  value={percent}>
            <ArrowUpFromDot size={20} color="white"/>
            </CircularProgressbarWithChildren ></motion.div>
    )
}

export default NavigationArrow