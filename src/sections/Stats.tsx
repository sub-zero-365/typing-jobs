import React from 'react'
import Heading, { VariantHeading } from '../components/Heading'
import { AnimatedNumber, AnimatedSlideText } from '../components/Animated/animated';
import { useInView, motion } from 'framer-motion';
import { animateHeadingVariants } from '../utils/framervariants';
import { Button } from '../components/ui/button';
import { Link } from 'lucide-react';

interface iStat {
    description: string,
    value: number,
    title: string,
    unit?: string

}
const stats: iStat[] = [
    {
        title: "Years of Experience",
        unit: "+",
        description:
            "A web app that allows users to practice for front-end and UI interviews.",
        value: 6

    },
    {
        title: "Satifaction rate",
        unit: "%",
        description:
            "A web app that allows users to practice for front-end and UI interviews.",
        value: 98
    },

    {
        title: "Divise Product",
        unit: "+",
        description:
            "A web app that allows users to practice for front-end and UI interviews.",
        value: 50
    },
    {
        title: "Printing Capacity",
        unit: "K",
        description:
            "A web app that allows users to practice for front-end and UI interviews.",
        value: 10
    },

];

function SingleStat({ title, value, unit }: iStat) {
    const ref = React.useRef<any>(null)
    const isInView = useInView(ref, {})
    const timer = React.useRef<any>(null)
    const [progress, setProgress] = React.useState(value)
    React.useEffect(() => {
        if (isInView) {
            timer.current = setTimeout(() => setProgress(value), 500)
        }
        return () => clearTimeout(timer.current)
    }, [isInView])
    return (<motion.div
        variants={animateHeadingVariants}
        initial="initial"
        whileInView="animate"
        className='flex flex-col gap-y-6 px-4 justify-center  items-center '>

        <div className='space-y-2'>
            <VariantHeading className='text-6xl font-medium text-center'>
                <AnimatedNumber className='font-black'
                    value={progress}
                />
                <span>{unit}</span>
                {/* <sup className='text-blue-400'>+</sup> */}
            </VariantHeading>
            <p className='font-pacifico  text-gray-600 text-lg font-black '>{title}</p>


        </div>

    </motion.div>)
}
const Stats = () => {
    return (
        <section
            className='py-24'
            style={{clipPath: "polygon(19% 0, 99% 0, 100% 68%, 89% 100%, 1% 99%, 0 20%)"}}
        >
            <div
                className='max-w-6xl mx-auto p-4'
            >
                <VariantHeading className='text-center gap-x-3 uppercase mb-6 flex items-center text-blue-950 [font-family:var(--second-font)] font-black text-3xl lg:text-4xl max-w-fit mx-auto'>

                    <span
                        className='w-10  h-[1px] bg-colorPrimary '
                    />  <div className='flex items-center'>OUR Stat<span className='md:hidden'>s</span><span className='hidden md:block'>istics</span></div>
                    <span
                        className='w-10  h-[1px] bg-colorPrimary '
                    />

                </VariantHeading>
                {/* <AnimatedSlideText inView
                    text="Your one Stop Printing solution - Explore our services"
                    className='text-center text-blue-950 font-black mb-6 text-xl lg:text-2xl max-w-3xl mx-auto '>

                </AnimatedSlideText> */}
                <div className="md:grid grid-cols-[auto,1fr] max-w-5xl mx-auto gap-x-6 mb-10">
                    <div>
                        <VariantHeading
                            className='text-4xl !text-bg-colorPrimary text-center- md:text-start mb-6 capitalize'
                        >
                            Printing in numbers
                        </VariantHeading>

                    </div>
                    <div>
                        <p className='mb-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi voluptatibus eos quidem eligendi odio molestias. Aliquid, maiores! Recusandae tempore deleniti aspernatur nisi enim esse corporis?</p>

                        <Button className='px-8 bg-[#fb5711] m shadow-sm top-auto right-2'>Learn More <Link size={15} className='ml-2' /></Button>

                    </div>
                </div>
                {/* stats */}
                <div className='mt-4 grid gap-y-6 grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl'>
                    {stats.map((arr, idx) => <SingleStat key={idx}
                        {...arr}
                    />)}
                </div>
            </div>
        </section>
    )
}

export default Stats