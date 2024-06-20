import React from 'react';
import { Link } from 'react-router-dom';
import { MainLogo } from '../assets/logo/index.js';
import Heading from './Heading';
import SocialLinks from './SocialLinks.js';



const Footer = ({ className }: { className?: string }) => {
    return (

        <div className='mt-6 py-10 bg-colorPrimary text-white 
        px-3
        '

        >
            <SocialLinks />
            <div className="
        sm:max-w-6xl  mx-auto
            ">

                <div className='lg:grid grid-cols-12 lg:flex-row '>
                    <div className=' col-span-4'>
                        <Link to={"/home"}>    <img src={MainLogo} alt="applogo" className='w-32 h-12' /></Link>

                    </div>

                    {/* <Heading className='flex-none text-3xl font-black mb-6  col-span-4'>
                        {import.meta.env.VITE_APP_NAME}
                    </Heading> */}
                    <div className='flex-1 grid col-span-8 gap-y-6
                    grid-cols-[repeat(auto-fit,minmax(min(10rem,calc(100%-60px)),_1fr))]'>

                        <ul>
                            <li>
                                <Heading className=' mb-4 text-2xl text-blue-500'>News</Heading>
                                <ul>
                                    {Array.from({ length: 2 }, () => {
                                        return <li>
                                            <Link to={'#'}>Fireworks</Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Heading className=' mb-4 text-2xl text-blue-500'>Social Media</Heading>
                                <ul>
                                    {Array.from({ length: 3 }, () => {
                                        return <li>
                                            <Link to={'#'}>Fireworks</Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Heading className=' mb-4 text-2xl text-blue-500'>Whatsapp</Heading>
                                <ul className='flex flex-col space-y-2'>
                                    {Array.from({ length: 3 }, () => {
                                        return <li>
                                            <Link to={'#'}>+237670000009</Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>

        </div>

    )
}

export default Footer