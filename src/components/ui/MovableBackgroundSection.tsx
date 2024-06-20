import React, { useRef, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { motion } from "framer-motion"
import { VariantHeading } from '../Heading';
const ParallaxSection = ({ imageUrl, children }) => {
    const parallaxRef = useRef<any>(null);
    const { scrollY } = useScroll({ target: parallaxRef });

    useEffect(() => {
        const handleScroll = () => {
            const sectionHeight = parallaxRef.current.offsetHeight;
            const parallaxAmount = scrollY.get() / sectionHeight;

            // Animate background image based on scroll position (adjust as needed)
            parallaxRef.current.style.backgroundPositionX = `${parallaxAmount * 500}px`; // Change multiplier for parallax intensity
            // parallaxRef.current.style.backgroundSize = `${200}%`; // Change multiplier for parallax intensity
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollY]);

    return (
        <motion.section className="parallax-section relative" >
            <motion.div
                className="parallax-background absolute inset-0 size-full -z-[1] "
                ref={parallaxRef}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            {/* <VariantHeading>Staffss</VariantHeading> */}
            <div className='size-full bg-colorPrimary/70 bg-opacity-65 py-14'>
     <div className='w-[calc(100%-1rem)] max-w-5xl mx-auto'>
     <VariantHeading  className='text-center font-black text-4xl text-white lg:text-6xl pb-10 px-5 max-w-4xl mx-auto'>
               Our Top Management
                </VariantHeading>
                {children}

     </div>
            </div>
        </motion.section>
    );
};
export default ParallaxSection