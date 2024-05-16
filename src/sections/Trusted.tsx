import React, { useState } from 'react'
import Heading, { VariantHeading } from '../components/Heading'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

import { animateHeadingVariants, animateHeadingVariants2 } from '../utils/framervariants'
import { AnimatedSlideText } from '../components/Animated/animated'
import { useMediaQuery } from 'react-responsive'
import { BlackKeyBoard, CartoonKeyBoard, ManTyping, WomanTyping } from '../assets/images'

export const contents = [
  {
    title: "We Provide 1",
    description:
      "By truck, rail or barge, we take your goods from farm to store doors.",
    Icon: CartoonKeyBoard

  },
  {
    title: "We Provide 2",
    description:
      "Reduce the cost of transporting your urgent or time critical cargo with our global Air Freight solutions. Learn more about FWD Air",
    Icon: WomanTyping
  },

  {
    title: "We Provide 3",
    description:
      "As one of the world's largest freight forwarders, we move over 1million containers every year and deliver to all corners of the globe",
    Icon: BlackKeyBoard
  },
  {
    title: "We Provide Int Servcices 4",
    description:
      "We offer top class international delivery services all over the globe and we also provide security for all packages.",
    Icon: ManTyping
  },

];
interface iService {
  hoveredIndex: number | null
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>,
  idx: number,
  content: typeof contents[number],
  setSelectedId: any

}
const ServiceCard = ({
  setHoveredIndex,
  hoveredIndex,
  idx, content,
  setSelectedId
}: iService) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

  const { Icon, description, title } = content
  return (<motion.div
    layoutId={title}
    onMouseEnter={() => setHoveredIndex(idx)}
    onMouseLeave={() => setHoveredIndex(null)}
    viewport={{ amount: 0.3, once: true }}
    // whileInView="animate"
    // variants={
    //   isDesktop ?
    //     animateHeadingVariants : animateHeadingVariants2(idx)}
    // initial="initial"
    initial={{
      //defines the initial animation
      opacity: 0.6,
      x: !isDesktop ? (idx % 2) ? -100 : 100 : 0,
      y: isDesktop ? 50 + idx * 40 : 0

    }}
    whileInView={{
      opacity: 1,
      x: 0,
      y: 0
    }}
    transition={{
      delay: isDesktop ? idx * 0.1 : 0,
      duration: 0.5
    }}
    className='flex flex-col   rounded-md shadow-lg w-full
        space-y-6 px-4 py-4 relative my-4b group mx-auto flex-none '>
    <AnimatePresence>
      {hoveredIndex === idx && (
        <motion.span
          className="absolute inset-0 rounded-md    bg-blue-600/10 "
          // layoutId="hoverBackgroundhh" // required for the background to follow
          initial={{ opacity: 0 }}
          // layoutId
          layoutId="hoverBackground222222"
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
    <div className=' relative  overflow-hidden h-56 sm:h-60 lg:h-64   rounded-xl'>

      <motion.img

        className='group-hover:scale-125 hidden lg:block transition-all duration-500 peer size-full object-fit rounded-xl'
        src={Icon}
      />
      <img
        className='group-hover:scale-125 lg:hidden transition-all duration-500 peer size-full object-fit rounded-xl'
        src={Icon}
      />
      <Button
        onClick={() => {
          setSelectedId(content)
        }}
        className='absolute bottom-2 bg-[#fb5711] shadow-sm top-auto right-2'>Details</Button>
    </div>
    <VariantHeading className='font-black text-blue-950 text-2xl'>
      {title}:
    </VariantHeading>
    <ol className='list-disc pl-6'>
      {Array.from({ length: 2}, (arr, idx) => <li
        className='text-sm'
        key={idx}>
        Lorem ipsum dolor sit amet consectetur.
      </li>)}
    </ol>

    <Button
      onClick={() => {
        setSelectedId(content)
      }}
      className='block mx-auto relative z-50 my-4 hover:bg-colorPrimary hover:text-white transition-colors duration-300 shadow rounded-none bg-transparent text-colorPrimary border w-[min(20rem,calc(100%-1rem))] border-colorPrimary'>Details</Button>


  </motion.div>)
}

const WhyChooseUs = () => {

  const [selectedId, setSelectedId] = useState<typeof contents[number] | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  React.useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"

    }
  }, [selectedId])
  return (
    <section className='bg-white- py-32 overflow-hidden'>
      <div className="max-w-7xl mx-auto px-4">
        <VariantHeading className='text-center gap-x-3 uppercase mb-6 flex items-center text-colorPrimary [font-family:var(--second-font)] font-black text-3xl lg:text-4xl max-w-fit mx-auto'>

          <span
            className='w-10  h-[1px] bg-colorPrimary/70 '
          />  <span>OUR SERVICES</span>
          <span
            className='w-10  h-[1px] bg-colorPrimary '
          />

        </VariantHeading>
        <AnimatedSlideText inView
          text="Your one Stop Printing solution - Explore our services"
          className='text-center text-blue-950 font-black mb-6 text-xl lg:text-2xl max-w-3xl mx-auto '>

        </AnimatedSlideText>
        {/* {JSON.stringify(selectedId)} */}
        <AnimatePresence>
          {selectedId && (
            <div
              onClick={() => setSelectedId(null)}
              className='fixed inset-0 z-[100] bg-slate-900/20 backdrop-blur flex justify-center items-center'>

              <motion.div
                onClick={(e) => {
                  e.stopPropagation()
                }}

                layoutId={selectedId.title}
                className=' overflow-hidden max-w-[30rem] scrollto w-[calc(100%-1rem)] rounded-lg text-white mt-16 bg-colorPrimary py-10 px-6 h-[min(30rem,calc(100vh-6rem))] overflow-y-auto'>

                <motion.div
                  className=''
                >

                  <div className=' relative  overflow-hidden h-56 sm:h-60 lg:h-64   rounded-xl'>

                    <img
                      className='group-hover:scale-125 hidden lg:block transition-all duration-500 peer size-full object-fit rounded-xl'
                      src={selectedId.Icon}
                    />
                    <img
                      className='group-hover:scale-125 lg:hidden transition-all duration-500 peer size-full object-fit rounded-xl'
                      src={selectedId.Icon}
                    />
                  </div>
                  <VariantHeading className='font-black text-blue-950 text-2xl'>
                    {selectedId.title}:
                  </VariantHeading>
                  <p>{selectedId.description}</p>
                  <ol className='list-disc pl-6'>
                    {Array.from({ length: 20 }, (arr, idx) => <li
                      className='text-sm'
                      key={idx}>
                      Lorem ipsum dolor sit amet consectetur.
                    </li>)}
                  </ol>



                </motion.div>
              </motion.div>
            </div>

          )}
        </AnimatePresence>
        <div className='grid grid-cols-1- items-start grid-cols-[repeat(auto-fit,minmax(min(18rem,calc(100%-60px)),_1fr))] justify-items-center justify-center  gap-x-2 gap-y-4 sm:grid-cols-2- lg:grid-cols-4- '>
          {contents.map((arr, idx) => <ServiceCard
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            key={idx}
            idx={idx}
            content={arr}
            setSelectedId={setSelectedId}


          />)}
        </div>
        <Button className='block mx-auto my-4 hover:bg-colorPrimary hover:text-white transition-colors duration-300 shadow rounded-none bg-transparent text-colorPrimary border w-[min(20rem,calc(100%-1rem))] border-colorPrimary'>Load More</Button>
      </div>
    </section>
  )
}

export default WhyChooseUs