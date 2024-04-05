// import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Heading from './Heading.js';
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog.js"
import ModalComponents from './Modal.js';
import { NextButton, PreButton } from './Navigations/navigation.js';
// import "./style.css"
interface iLogistic {
    price: number;
    name: string;
    status: boolean;
    descriptions?: ({
        name?: string,
        avatarPublicId?: string,
        imgUrl?: string
    })[],
    className?: string
}
const SingleLogistic = (
    { name, descriptions, price, status, className }: iLogistic

) => {
    const [swiperRef, setSwiperRef] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const slideTo = (index) => {
        swiperRef?.slideTo(index);
    };
    return (
        <div className='px-6'

        >

            <ModalComponents
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                className=" "
                className2="!w-fit !relative !h-[min(var(--h),calc(100%-10rem))] !p-0 !bg-transparent"
            >
                <PreButton
                    className='absolute top-1/2 z-[20] left-2 translate-y-1/2'
                    size={40} color='blue'
                    onClick={() => swiperRef?.slidePrev()}
                />
                <NextButton
                    className='absolute top-1/2 z-[20] right-2 translate-y-1/2'
                    size={40} color='blue'
                    onClick={() => swiperRef?.slideNext()}
                />


                <Swiper
                    onSwiper={setSwiperRef}
                    effect={'cube'}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    pagination={true}
                    navigation={true}
                    modules={[EffectCube, Pagination]}
                    className="mySwiper- relative  h-full 
                            
                            "
                >  {
                        descriptions.map(({ avatarPublicId, imgUrl, name }, index) => (
                            <SwiperSlide
                                key={imgUrl}
                                className='h-full'
                            >
                                <div
                                    className='shadow  p-2 py-4 rounded-md h-full flex flex-col'
                                >
                                    <img
                                        className="w-full h-[90%]  object-cover   flex-1 "
                                        alt={name}
                                        // effect="blur"
                                        src={imgUrl} />
                                    {/* <Heading
                                        className='text-xl leading-loose text-gray-500 flex-none'
                                    >{name}</Heading> */}
                                </div>
                            </SwiperSlide>
                        )
                        )
                    }

                </Swiper>
                {/* </div> */}
            </ModalComponents>


            <div className='sm:flex lg:space-x-4 items-center flex-wrap gap-y-4 my-6'>
                <div className='flex  items-center flex-none '>
                    <Heading className='mr-2'>Name :</Heading>
                    <p className="text-lg text-gray-700 ">{name}</p>
                </div>
                <div className='flex  items-center flex-none '>
                    <Heading className='mr-2'>Price :</Heading>
                    <p className="text-lg text-gray-700 ">{price}</p>
                </div>
                <div className='flex  items-center flex-none '>
                    <Heading className='mr-2'>Status :</Heading>
                    <p className="text-lg text-gray-700 ">{status}</p>
                </div>
            </div>

            <div

                className='
            gap-4
            grid grid-cols-[repeat(auto-fit,minmax(min(15rem,calc(100%-0.4rem)),1fr))]'
            >
                {
                    descriptions.map(({ avatarPublicId, imgUrl, name }, index) => (<div>
                        <div
                            onClick={() => {
                                slideTo(index)
                                setTimeout(() => {
                                    setIsOpen(true)
                                }, 200);

                            }}
                        >
                            {/* <Button variant="outline">Edit Profile</Button> */}
                            <div
                                className='shadow p-2 py-4 rounded-md  flex flex-col'
                            >
                                <div className='flex-1'>
                                    <LazyLoadImage
                                        className="size-full h-64  flex-1 aspect-square"
                                        alt={name}
                                        effect="blur"
                                        src={imgUrl} />
                                </div>
                                <Heading
                                    className='text-xl leading-loose text-gray-500 flex-none'
                                >{name}</Heading>
                            </div>
                        </div>


                    </div>)
                    )
                }
            </div>

        </div>
    )
}

export default SingleLogistic