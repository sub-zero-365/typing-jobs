import React from 'react'
import Heading from '../components/Heading'
import { Button } from '../components/ui/button'

const DownLoadInvoice = () => {
    return (
        <div>
            <Heading className='text-center text-3xl font-semibold uppercase mb-6'>Download your reciept here</Heading>

            <Button
                className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-2xl flex gap-x-2 sticky bottom-2 top-auto h-16"
            >Download</Button>
        </div>
    )
}

export default DownLoadInvoice