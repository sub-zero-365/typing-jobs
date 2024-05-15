import React from 'react'
import Heading from '../components/Heading'
import { Button } from '../components/ui/button'

const RequestService = () => {
    return (
        <section className='bg-colorPrimary  py-32'
            style={{ clipPath: "polygon(0 0, 100% 0, 99% 90%, 0% 100%)" }}
        >
            <div
                className='max-w-5xl mx-auto'
            >
                <Heading className='text-white mb-6 text-center text-3xl font-medium capitalize px-2 tracking-tighter leading-tight'>
                    Request Your Free Printing Sample
                </Heading>
                <p className='text-center text-gray-400 tracking-wide px-6'>See, Touch, and Feel the Excellence of Printshop.</p>
                <Button className='block mx-auto my-4 hover:bg-colorPrimary hover:text-white transition-colors duration-300 shadow-sm bg-[#fb5711] text-white  rounded-sm w-[min(20rem,calc(100%-1rem))] border-white'>Request Now</Button>

            </div>
        </section>
    )
}

export default RequestService