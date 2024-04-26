import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TypewriterEffect } from "../components/TypeWriter.js";
import { Button } from "../components/ui/button.js";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";
import { cn } from "../lib/utils.js";
import Trusted from "../sections/Trusted.js";
// Import Swiper React components
import { Swiper, SwiperSlide, } from 'swiper/react';
import useGetLoginUser from '../utils/getLogInUser.js';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
// import './styles.css';

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";

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
const content = [
    {
        title: "Collaborative Editing",
        description:
            "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                Collaborative Editing
            </div>
        ),
    },
    {
        title: "Real time changes",
        description:
            "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/linear.webp"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Version control",
        description:
            "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                Version control
            </div>
        ),
    },
    {
        title: "Running out of content",
        description:
            "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
            <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                Running out of content
            </div>
        ),
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
export default function Home() {
    const buttonRef = React.useRef<any>(null);

    const user = useGetLoginUser()
    useEffect(() => {
        const timer = setTimeout(() => {
            // setIsOpen(true)
            buttonRef.current?.click()
            clearTimeout(timer)
        }, 5000);
        return () => {
            clearTimeout(timer)
        }
    }, [])
    return (
        <Dialog >
            <DialogTrigger ref={buttonRef} className="hidden" />
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
            <div className="h-[min(calc(100vh-4rem),40rem)]  flex-col w-full rounded-none flex md:items-center md:justify-center  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}

                    autoplay={{ delay: 2000, }}
                    modules={[EffectFade, Navigation, Pagination, Autoplay]}
                    className="!size-full !absolute "
                >
                    <SwiperSlide className="!size-full  bg-slate-600">

                        <img
                            className="size-full object-fill"
                            src="data:image/jpeg;base64,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"
                        />


                    </SwiperSlide>
                    <SwiperSlide className="size-full  bg-slate-600">

                        <img
                            className="size-full object-fill"
                            src="https://swiperjs.com/demos/images/nature-2.jpg" />


                    </SwiperSlide>


                </Swiper>




                <div className="bg-slate-600/60 w-full flex items-center justify-center relative h-full">
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
                        <div className="flex justify-center flex-wrap gap-x-4 gap-y-6 items-center py-5">
                            {/* check if the user is logged in  */}
                            <Button

                                className="
                        px-10 py-6 text-xl "
                            >
                                <Link to={
                                    user ? "/" : "/home/auth"}

                                    className="w-full  "
                                >
                                    get started
                                </Link>

                            </Button>
                            <Button
                                className="
                        px-10 py-6 text-xl "
                            >learn more</Button>

                        </div>
                        <div
                            className="mb-6"
                        ></div>





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
            </div>
            <Trusted />
            <div className="px-2 lg:px-10">
                <StickyScroll content={content} />
            </div>
        </Dialog>
    );
}
