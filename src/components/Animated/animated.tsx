import React from 'react'
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
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
                text-6xl`, className)}>
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
            cn(`mb-1    flex max-w-sm mx-auto
        items-center
        justify-between
        text-xs font-medium
        md:text-sm
        text-orange-600`,
                className)}>
            <motion.h1
                animate={{
                    opacity: error ? 1 : 0,
                    x: error ? [-50, 50, 0, -50, 50, 0] : undefined

                }}
                transition={{ duration: duration || 0.3 }}
                className="w-fit flex-none mx-auto tracking-[0.2rem]  mt-0.5  text-center ">  {errorMessage}</motion.h1>
        </div>

    )
}
const _singleword = {
    initial: {
        // y: 50,
        x: 40,
        opacity: 0.1,
        scale: 0.1
    },
    animate: {
        // y: 0,
        opacity: 1, x: 0, scale: 1
        , transition: {
            duration: 0.8,
        }
    }
}
const SplitSlideText = ({ text }: { text: string }) => {
    return text?.split(" ").map((word) => word).map((singleword_) => {
        const _word = singleword_.split("").map((word, index) => (
            <motion.span
                variants={_singleword}
                className='inline-block break-normal'
                key={index + word}
            >{word}</motion.span>))

        return <div className='inline-block'>{_word}&nbsp;</div>

    })
}
export const AnimatedSlideText = ({
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
                inline-block w-full text-dark font-black  capitalize [font-family:var(--second-font)]
                text-6xl`, className)}>
                <SplitSlideText text={text} />
            </motion.h1>


        </div>
    )
}
export const AnimatedNumber = ({ value, className }: {
    value: number,
    className?: string
}) => {
    const ref = React.useRef<any>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        duration: 3000,
    })
    const isInView = useInView(ref, {
        once: false,
        amount: 0.8

    });
    React.useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])
    React.useEffect(() => {
        springValue.on('change', (latest) => {
            if (ref.current && latest.toFixed(0) <= value) {
                ref.current.textContent = latest.toFixed(0)
            }
        })

    }, [springValue, value])

    return (
        <motion.span ref={ref}
            className={cn('',// define baseclasses here

                className)}
        >
        </motion.span>
    )
}
type SpotlightProps = {
    className?: string;
    fill?: string;
};

export const Spotlight = ({ className, fill }: SpotlightProps) => {
    return (
        <svg
            className={cn(
                "animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] lg:w-[84%] opacity-0",
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
        >
            <g filter="url(#filter)">
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill || "white"}
                    fillOpacity="0.21"
                ></ellipse>
            </g>
            <defs>
                <filter
                    id="filter"
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundimgFix"></feFlood>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundimgFix"
                        result="shape"
                    ></feBlend>
                    <feGaussianBlur
                        stdDeviation="151"
                        result="effect1_foregroundBlur_1065_8"
                    ></feGaussianBlur>
                </filter>
            </defs>
        </svg>
    );
};
// export default AnimatedText