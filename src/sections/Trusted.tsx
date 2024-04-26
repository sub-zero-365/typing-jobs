import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { pageAnimationVariants } from "../utils/framervariants";
import { AnimatedText } from "../components/Animated/animated";
import {  User } from "lucide-react";
import Heading from "../components/Heading";

export const projects = [
  {
    title: "Typing handwritten documents",
    description:
      "A web app that allows users to practice for front-end and UI interviews.",
    link: "https://algochurn.com",
  },
  {
    title: "Scanned document typing",
    description:
      "Transforming scanned documents (like PDFs or images with text) into editable digital text formats.",
    link: "https://algochurn.com",
  },

  {
    title: "Proofreading and editing",
    description:
      "Ensuring your transcribed documents are free of typos, grammatical errors, and formatting issues.",
    link: "https://algochurn.com",
  },
  // ...rest of the projects
];

const HoverEffect = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-8 ">
      <div
        className="relative w-full mt-6
        "
      >
        <h1 className="text-4xl text-center 
              -z-1
              w-full 
              font-black text-gray-500 lg:text-5xl
               uppercase opacity-30">
          services
        </h1>

        <AnimatedText
          className="text-2xl italic dark:text-white  text-black top-[calc(50%-0.6rem)]  lg:text-4xl !absolute  !m-0 -translate-y-1/2  z-1"
          text={'our services'}
        />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center  lg:grid-cols-3  py-10">
        {projects.map((project, idx) => (
          <motion.div
            transition={{
              delay: idx * 0.05,
              ease: 'easeInOut'
            }}
            variants={pageAnimationVariants}
            initial='initial'
            whileInView='animate'
            key={project?.link}
            className="relative group  shadow-xl rounded-2xl  block p-2 h-full w-full "
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block  rounded-3xl"
                  // layoutId="hoverBackgroundhh" // required for the background to follow
                  initial={{ opacity: 0 }}
                  // layoutId
                  layoutId="hoverBackground"
                  // layout
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <div className=" rounded-2xl h-full w-full  overflow-hidden bg-gradient-to-br  border border-transparent group-hover:border-slate-700 relative z-50">
              <div className="flex flex-col py-3 justify-center items-center">
                <User color="white" size={80} className="mx-auto block" />
                <Heading className="text-zinc-100  font-bold tracking-wide mt-4">
                  {project.title}
                </Heading>
              </div>
              <svg id="wave"
                width={'100%'}
                style={{
                  transform: "rotate(0deg)",
                  transition: "0.3s"
                }} viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(243, 106, 62, 1)" offset="0%"></stop><stop stop-color="rgba(255, 179, 11, 1)" offset="100%"></stop></linearGradient></defs><path style={{
                  transform: "translate(0, 0px)", opacity: 1
                }}
                  className="fill-orange-500 "

                  d="M0,441L48,367.5C96,294,192,147,288,98C384,49,480,98,576,155.2C672,212,768,278,864,253.2C960,229,1056,114,1152,130.7C1248,147,1344,294,1440,359.3C1536,425,1632,408,1728,359.3C1824,310,1920,229,2016,220.5C2112,212,2208,278,2304,269.5C2400,261,2496,180,2592,179.7C2688,180,2784,261,2880,294C2976,327,3072,310,3168,269.5C3264,229,3360,163,3456,155.2C3552,147,3648,196,3744,204.2C3840,212,3936,180,4032,147C4128,114,4224,82,4320,57.2C4416,33,4512,16,4608,81.7C4704,147,4800,294,4896,367.5C4992,441,5088,441,5184,424.7C5280,408,5376,376,5472,359.3C5568,343,5664,343,5760,294C5856,245,5952,147,6048,114.3C6144,82,6240,114,6336,130.7C6432,147,6528,147,6624,179.7C6720,212,6816,278,6864,310.3L6912,343L6912,490L6864,490C6816,490,6720,490,6624,490C6528,490,6432,490,6336,490C6240,490,6144,490,6048,490C5952,490,5856,490,5760,490C5664,490,5568,490,5472,490C5376,490,5280,490,5184,490C5088,490,4992,490,4896,490C4800,490,4704,490,4608,490C4512,490,4416,490,4320,490C4224,490,4128,490,4032,490C3936,490,3840,490,3744,490C3648,490,3552,490,3456,490C3360,490,3264,490,3168,490C3072,490,2976,490,2880,490C2784,490,2688,490,2592,490C2496,490,2400,490,2304,490C2208,490,2112,490,2016,490C1920,490,1824,490,1728,490C1632,490,1536,490,1440,490C1344,490,1248,490,1152,490C1056,490,960,490,864,490C768,490,672,490,576,490C480,490,384,490,288,490C192,490,96,490,48,490L0,490Z"></path><defs><linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(243, 106, 62, 1)" offset="0%"></stop><stop stop-color="rgba(255, 179, 11, 1)" offset="100%"></stop></linearGradient></defs><path
                    className="fill-orange-400"
                    style={{
                      transform: "rotate(0deg)",
                      transition: "0.3s"
                    }} fill="" d="M0,343L48,318.5C96,294,192,245,288,212.3C384,180,480,163,576,171.5C672,180,768,212,864,187.8C960,163,1056,82,1152,114.3C1248,147,1344,294,1440,302.2C1536,310,1632,180,1728,179.7C1824,180,1920,310,2016,367.5C2112,425,2208,408,2304,367.5C2400,327,2496,261,2592,204.2C2688,147,2784,98,2880,81.7C2976,65,3072,82,3168,147C3264,212,3360,327,3456,351.2C3552,376,3648,310,3744,236.8C3840,163,3936,82,4032,98C4128,114,4224,229,4320,277.7C4416,327,4512,310,4608,261.3C4704,212,4800,131,4896,122.5C4992,114,5088,180,5184,236.8C5280,294,5376,343,5472,375.7C5568,408,5664,425,5760,400.2C5856,376,5952,310,6048,269.5C6144,229,6240,212,6336,245C6432,278,6528,359,6624,351.2C6720,343,6816,245,6864,196L6912,147L6912,490L6864,490C6816,490,6720,490,6624,490C6528,490,6432,490,6336,490C6240,490,6144,490,6048,490C5952,490,5856,490,5760,490C5664,490,5568,490,5472,490C5376,490,5280,490,5184,490C5088,490,4992,490,4896,490C4800,490,4704,490,4608,490C4512,490,4416,490,4320,490C4224,490,4128,490,4032,490C3936,490,3840,490,3744,490C3648,490,3552,490,3456,490C3360,490,3264,490,3168,490C3072,490,2976,490,2880,490C2784,490,2688,490,2592,490C2496,490,2400,490,2304,490C2208,490,2112,490,2016,490C1920,490,1824,490,1728,490C1632,490,1536,490,1440,490C1344,490,1248,490,1152,490C1056,490,960,490,864,490C768,490,672,490,576,490C480,490,384,490,288,490C192,490,96,490,48,490L0,490Z"></path></svg>
              <div className="relative z-50 bg-orange-400">
                <div className="p-4">

                  <p className="mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default HoverEffect

