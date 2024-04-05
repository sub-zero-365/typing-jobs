import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import TrackingInput from "../components/TrackingInput.js";
import { TypewriterEffect } from "../components/TypeWriter.js";
import { cn } from "../lib/utils.js";
import Trusted from "../sections/Trusted.js";
// import { Spotlight } from "../ui/spotlight";
const words: {
    text: string,
    className?: string
}[] = [
        {
            text: "Build",
        },
        {
            text: "awesome",
        },
        {
            text: "apps",
            className: "text-blue-500 dark:text-blue-500",

        },
        {
            text: "with",
        },
        {
            text: "Aceternity.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
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
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
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
export default function Home() {
    const navigate = useNavigate()
    return (
        <div>
            <div className="h-[min(calc(100vh-4rem),40rem)] flex-col w-full rounded-none flex md:items-center md:justify-center  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                    <div>
                        <TypewriterEffect
                            className="text-4xl- text-white"
                            wordClassName="text-5xl lg:text-7xl xxl:text-8xl"
                            words={words} />
                    </div>
                    <div
                        className="mb-6"
                    ></div>
                    <TrackingInput
                        onSubmit={(e) => {
                            const formdata = new FormData(e.target);
                            const id = formdata.get("tracking_number");
                            // alert(id)
                            navigate(`tracking?tracking_numbers=${id}`)
                            e.preventDefault()
                        }}
                    />



                 

                    <motion.p
                        initial={{
                            y: 100
                        }}
                        whileInView={{
                            y: 0,
                        }}
                        transition={{
                            duration: 2
                        }}
                        className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                        Spotlight effect is a great way to draw attention to a specific part
                        of the page. Here, we are drawing the attention towards the text
                        section of the page. I don&apos;t know why but I&apos;m running out of
                        copy.
                    </motion.p>
                </div>
            </div>
            <Trusted />
        </div>
    );
}
