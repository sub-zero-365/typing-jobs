import React from 'react'
import { motion } from "framer-motion"
import { cn } from '../../lib/utils.js'
const qoute = {
    initial: {
        opacity: 1
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 0.08
        }

    }
}

const singleword = {
    initial: {
        y: 50,
        x: -10,
        opacity: 0
    },
    animate: {
        y: 0, opacity: 1, x: 0
        , transition: {
            duration: 1
        }
    }
}

export const SplitText = ({ text }: { text: string }) => {
    return text?.split(" ").map((word, index) => (
        <motion.span

            variants={singleword}
            className='inline-block'
            key={index + word}
        >{word}&nbsp;</motion.span>
    ))
}
interface iAnimatedProps {
    className?: string,
    inView?: boolean;
    amount?: number;
    text: string
}
export const AnimatedText = ({
    text,
    className = "",
    inView,
    amount }: iAnimatedProps) => {
    return (
        <div
            className={cn(` w-full  mx-auto  py-2 flex items-center justify-center text-center 
            overflow-hidden`,)}
        >
            <motion.h1
                variants={qoute}
                initial="initial"
                animate={inView ? false : "animate"}
                whileInView={inView ? "animate" : ""}
                viewport={{ once: true, amount: amount ? amount : 0.2 }}
                className={cn(`break-words
                inline-block w-full text-dark font-black  capitalize
                text-6xl`,className)}>
                <SplitText text={text} />
            </motion.h1>


        </div>
    )
}
interface iAnimateError {
    error: any,
    errorMessage: string,
    className?: string;
    duration?: number
}
export function AnimateError({
    error,
    errorMessage,
    className, duration }: iAnimateError) {
    return (
       
        <div className={
            cn(`mb-6 flex max-w-sm mx-auto
        items-center
        justify-between
        text-xs font-medium
        md:text-sm
        text-orange-600`,
                className)}>
            <motion.h1
                animate={{
                    opacity: error ? 1 : 0,
                    x: error ? [-50, 50, 0, -50, 50, 0] :undefined

                }}
                transition={{ duration: duration || 0.3 }}
                className="w-fit flex-none mx-auto tracking-[0.2rem]  mt-0.5  text-center ">  {errorMessage}</motion.h1>
        </div>

    )
}
// export default AnimatedText