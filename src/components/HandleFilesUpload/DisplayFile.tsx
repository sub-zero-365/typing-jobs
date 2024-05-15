import React from 'react'
import { useSubmitDocLayoutContext } from '../layout/SubmitDocLayout'
import Heading from '../Heading'
import { Forward, TrashIcon } from "lucide-react"
import { Button } from '../ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const DisplaySinglePdfFile = ({ file, idx }: any) => {
    const { handleDeleteFile } = useSubmitDocLayoutContext()

    return (
        <motion.div
            exit={{ opacity: 0, x: 100 }}

            className='flex border overflow-hidden relative items-center py-4 rounded-md shadow-sm shadow-colorPrimary px-4 justify-between'>
            <div
                className='w-2 top-0 h-full flex-none absolute left-0  bg-colorPrimary'
            />
            <div className='flex-1'>
                <Heading className='font-light mb-1'>{file?.path}</Heading>
                <Button className='rounded-none h-8 bg-colorPrimary text-white' variant="outline">preview</Button>

            </div>
            <div className='flex flex-col items-center space-y-1'
                onClick={() => handleDeleteFile(idx)}
            >
                <TrashIcon />
                <small className='text-gray-400 font-bold'>size: {file?.size / 1000}mb</small>

            </div>

        </motion.div>)
}
const DisplayFile = () => {
    const { pdfFiles, state, setState } = useSubmitDocLayoutContext()
    const isFiles = pdfFiles && pdfFiles?.length > 0

    return (
        <div className='flex-1 border-4'>
            <Heading

                className='text-center mb-6 font-bold'>Lists Of Selected files</Heading>
            <button 
            onClick={()=>setState(Math.random)}
            >change state {state}</button>
            <div className='gap-y-2 px-4 gap-x-2 mb-6  grid grid-cols-[repeat(auto-fit,minmax(min(25rem,calc(100%-60px)),_1fr))]'>
                <AnimatePresence initial={false}  >
                    {
                        isFiles ? pdfFiles?.map((file, idx) => (<DisplaySinglePdfFile file={file} key={idx} idx={idx} />)) :
                            <p>no files selected</p>
                    }
                </AnimatePresence>
            </div>
            {

                isFiles && <Link to={"/home/upload/user"}>
                    <Button
                        className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-full flex gap-x-2 sticky bottom-2 top-auto h-16"
                    >Next <Forward size={20} /></Button>
                </Link>
            }
        </div>
    )
}

export default DisplayFile