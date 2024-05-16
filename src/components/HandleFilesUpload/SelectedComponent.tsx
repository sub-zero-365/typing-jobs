import React from 'react'
import { motion } from "framer-motion"
import { useSubmitDocLayoutContext } from '../layout/SubmitDocLayout'
import SinglePdfWithReactPdf from './SinglePdfWithReactPdf';
import { useDebounceCallback, useResizeObserver } from 'usehooks-ts'
const SelectedComponent = () => {
    const ref = React.useRef<HTMLDivElement>(null)
    const { setIsSelected, isSelected, pdfFiles } = useSubmitDocLayoutContext();
    const file = pdfFiles?.find((__, idx) => isSelected == idx);
    const { width = 0, height = 0 } = useResizeObserver({
        ref,
        box: 'border-box',
    })
    // const source = URL.createObjectURL(file!)
    React.useEffect(() => {
        if (isSelected) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"

        }
    }, [isSelected])
    return (
        <div
            onClick={() => setIsSelected(null)}
            className='fixed inset-0 z-[100] bg-slate-900/20 backdrop-blur flex justify-center items-center'>

            <motion.div
                ref={ref}
                onClick={(e) => {
                    e.stopPropagation()
                }}

                layoutId={isSelected}
                className=' overflow-hidden max-w-[50rem] scrollto w-[calc(100%-1rem)] mx-auto rounded-lg text-white mt-16- bg-colorPrimary  h-[min(40rem,calc(100vh-4rem))] overflow-y-auto'>
                <SinglePdfWithReactPdf
                    pdfFile={file}
                    width={width}
                    height={height}
                />

            </motion.div>
        </div>
    )
}

export default SelectedComponent