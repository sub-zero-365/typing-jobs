"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";
import { VariantHeading } from '../../components/Heading'

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    // "linear-gradient(to bottom right, var(--cyan-500,red), var(--emerald-500,blue))",
    // "linear-gradient(to bottom right, var(--pink-500,blue), var(--indigo-500,red))",
    // "linear-gradient(to bottom right, var(--orange-500,orange), var(--yellow-500,orange))",
  ];
  return (
    <motion.div
      className="py-10 sticky top-[4rem]
    "
      style={{ clipPath: "polygon(89% 2%, 100% 1%, 100% 100%, 3% 100%, 0 98%, 0 5%)" }}

      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
    >



      <VariantHeading className='text-center mt-10 gap-x-3 uppercase mb-6 flex items-center text-blue-950 [font-family:var(--second-font)] font-black text-3xl lg:text-4xl max-w-fit mx-auto'>

        <span
          className='w-10  h-[1px] bg-white '
        />  <div className='flex items-center text-white '>How It Works</div>
        <span
          className='w-10  h-[1px] bg-white '
        />

      </VariantHeading>


      <motion.div

        className="h-[min(40rem,calc(100vh-4rem))] overflow-y-auto flex justify-center relative space-x-10 rounded-md px-2 lg:p-10"
        ref={ref}
      >

        <div className="div relative flex items-start px-4">
          <div className="max-w-2xl">
            {content.map((item, index) => (
              <div key={item.title + index} className="my-20">
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-kg text-slate-300 max-w-sm mt-10"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
            <div className="h-40" />
          </div>
        </div>
        <motion.div
          animate={{
            background: linearGradients[activeCard % linearGradients.length],
          }}
          className={cn(
            "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
