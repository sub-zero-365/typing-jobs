import React from 'react'
import Heading, { VariantHeading } from '../components/Heading'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
const OurProjectsExample = () => {
    const pagination = {
        clickable: true,
        el: '.custom-pagination', // Custom pagination element
        renderBullet: (index: number, className: string) => {
            return '<span class="' + className + '">' + '</span>';
        }
    };
    return (
        <div className='py-6'>
            <Heading className='text-center text-blue-800 font-black text-3xl max-w-fit mx-auto'>
                Get Inspired

            </Heading>
            <VariantHeading className='text-center font-black text-4xl text-blue-950 lg:text-5xl py-10 px-5 max-w-5xl mx-auto'>
                A Look at Our Design & Printing Projects
            </VariantHeading>
            <Separator className='max-w-6xl h-1 rounded-full mx-auto  bg-colorPrimary' />
            {/* swipers starts here  */}
            <div className='relative'>


                <Swiper

                    loop
                    speed={5000}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1.2}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 1500,
                        // pauseOnMouseEnter: true
                    }}
                    pagination={pagination}
                    navigation={{
                        nextEl: '.custom-button-next',
                        prevEl: '.custom-button-prev',
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                    className="!w-full !max-w-5xl mx-auto my-6"
                    breakpoints={{
                        640: {
                            slidesPerView: 1.5,
                        },
                        768: {
                            slidesPerView: 2.5,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                    </SwiperSlide>
                    <div className="custom-pagination mt-4 flex justify-center"></div>
                </Swiper>
                <div className="custom-button-prev custom-button absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer">Prev</div>
                <div className="custom-button-next custom-button absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer">Next</div>


            </div>
            {/* swipers ends here  */}

            <Button className='block mx-auto my-4 hover:bg-colorPrimary hover:text-white transition-colors duration-300 shadow rounded-none bg-transparent text-colorPrimary border w-[min(20rem,calc(100%-1rem))] border-colorPrimary'>Load More</Button>

        </div>
    )
}

export default OurProjectsExample
