import React from 'react'
import { useSubmitDocLayoutContext } from '../layout/SubmitDocLayout'
import { motion } from "framer-motion"
import Heading from '../Heading'
import { TrashIcon } from 'lucide-react'
import { Button } from '../ui/button'
const DisplaySinglePdfFile = ({ file, idx }: any) => {


    const { handleDeleteFile, setIsSelected } = useSubmitDocLayoutContext()

    return (
        <motion.div
            layoutId={idx}
            exit={{ opacity: 0, x: 100 }}

            className='flex border overflow-hidden relative items-center py-4 rounded-md shadow-sm shadow-colorPrimary px-4 justify-between'>
            <div
                className='w-2 top-0 h-full flex-none absolute left-0  bg-colorPrimary'
            />
            <div className='flex-1'>
                <Heading className='font-light mb-1'>{file?.path}</Heading>
                <Button

                    onClick={() => setIsSelected(idx)}
                    className='rounded-none h-8 bg-colorPrimary text-white' variant="outline">preview</Button>

            </div>
            <div className='flex flex-col items-center space-y-1'
                onClick={() => handleDeleteFile(idx)}
            >
                <TrashIcon />
                <small className='text-gray-400 font-bold'>size: {file?.size / 1000}mb</small>

            </div>

        </motion.div>)
}
export default DisplaySinglePdfFile