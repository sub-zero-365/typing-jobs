import React, { useState } from 'react'
import { Button } from '../ui/button.js'
// import { iMiniPost } from '../pages/ProtectedRoute/NewLogistics.js'
import { useDropzone } from 'react-dropzone'
import { useSubmitDocLayoutContext } from '../layout/SubmitDocLayout.js'

const HandleGetFileFromStorage = () => {
    const { handleFilesChange } = useSubmitDocLayoutContext()

    const onDrop = React.useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            setPdfFiles(
                acceptedFiles
            )
        }
    }, [])
    const { getRootProps, getInputProps,fileRejections } = useDropzone({
        maxFiles: 10,
        onDrop,
        accept: {
            'application/pdf': ['.pdf'] // Only accept PDF files
        },

    });
    const [pdfFiles, setPdfFiles] = useState<any[]>([]);

    return (
        <div className='flex  flex-col flex-none w-[min(20rem,calc(100%-2rem))] mx-auto'>
            <div {...getRootProps({
                className: `dropzone min-h-44 flex justify-center items-center p-6
            border-4 bg-gray-100 border-dotted rounded-md` })}>
                <input {...getInputProps()} />
                <div
                    className='min-h-44 flex justify-center items-center p-6
            border-4 bg-gray-100 border-dotted rounded-md
            '
                >
                    <small className="text-xl text-center font-bold">

                        Drag 'n' drop some files here, or click to select files

                    </small>

                </div>


            </div>
            <div>
                {
                    pdfFiles.map((file) => <div>file:{file?.name}</div>)
                }
            </div>
            {
                pdfFiles.length > 0 && <Button
                    onClick={() => {
                        handleFilesChange(pdfFiles);
                        setPdfFiles([])
                    }}
                    className='block flex-none w-80 mx-auto'>
                    add file{pdfFiles.length > 1 ? "s" : ""}
                </Button>
            }
        </div>
    )
}

export default HandleGetFileFromStorage