import { AnimatePresence } from 'framer-motion'
import { Forward } from "lucide-react"
import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../Heading'
import { useSubmitDocLayoutContext } from '../layout/SubmitDocLayout'
import { Button } from '../ui/button'
import DisplaySinglePdfFile from './DisplaySinglePdfFile'
import SelectedComponent from './SelectedComponent'

const DisplayFile = () => {
    const { pdfFiles, isSelected } = useSubmitDocLayoutContext()
    const isFiles = pdfFiles && pdfFiles?.length > 0

    return (
        <div className='flex-1'>
            <Heading

                className='text-center mb-6 font-bold'>Lists Of Selected files</Heading>

            <div className='gap-y-2 px-4 gap-x-2 mb-6 items-start grid grid-cols-[repeat(auto-fit,minmax(min(20rem,calc(100%-60px)),_1fr))]'>
                <AnimatePresence initial={false}  >

                    {
                        (isSelected === 0 || isSelected) && <SelectedComponent />
                    }



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