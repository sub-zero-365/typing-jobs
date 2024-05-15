import React from 'react'
import Heading from './Heading'
import { Mail, PhoneIcon } from 'lucide-react'

const TopHeader = () => {
    return (
        <div
            className='h-12 flex items-center justify-center  bg-colorPrimary'
        >
            <div
                className='flex w-full px-4 justify-between items-center max-w-5xl mx-auto'
            >
                {/* right side here */}
                <div>
                    <Heading className='flex gap-x-2 text-sm items-center  text-[#716c7d]'>
                        <Mail size={15} />
                        example@gmail.com
                    </Heading>
                </div>
                {/* left side here */}
                <div>
                    <Heading className='flex gap-x-2 text-sm items-center  text-[#716c7d]'>
                        <PhoneIcon size={15} />
                        +23767222783
                    </Heading>
                </div>
            </div>
        </div>
    )
}

export default TopHeader