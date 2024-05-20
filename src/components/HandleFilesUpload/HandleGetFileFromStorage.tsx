import React, { useState } from 'react'
import { Button } from '../ui/button.js'
// import { iMiniPost } from '../pages/ProtectedRoute/NewLogistics.js'
import { useDropzone } from 'react-dropzone'
import { useSubmitDocLayoutContext } from '../layout/SubmitDocLayout.js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs.js"
import Heading from '../Heading.js'

const HandleGetFileFromStorage = () => {
    const { handleFilesChange } = useSubmitDocLayoutContext()

    const onDrop = React.useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            setPdfFiles(
                acceptedFiles
            )
        }
    }, [])
    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        maxFiles: 10,
        onDrop,
        accept: {
            'application/pdf': ['.pdf'] // Only accept PDF files
        },

    });
    const [pdfFiles, setPdfFiles] = useState<any[]>([]);
    const isRej = fileRejections.length >= 1
    const isValid = pdfFiles.length >= 1
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
                <Tabs defaultValue="file" className="w-full pb-6 pt-4 ">
                    <TabsList className='!w-fit  flex  !mx-auto flex-none'>
                        <TabsTrigger value="file" className='text-green-500'>Accepted Files</TabsTrigger>
                        <TabsTrigger value="rejected" className='text-rose-500'>Rejected Files</TabsTrigger>
                    </TabsList>
                    <TabsContent value="file">
                        {
                            isValid ? pdfFiles.map((file) => <div>file: {file?.name}:"No selected files"</div>) : <div>No selected files</div>

                        }

                        {
                            pdfFiles.length > 0 && <Button
                                onClick={() => {
                                    handleFilesChange(pdfFiles);
                                    setPdfFiles([])
                                }}
                                className='block flex-none w-80 mx-auto mt-6 capitalize'>
                                add file{pdfFiles.length > 1 ? "s" : ""}
                            </Button>
                        }
                    </TabsContent>
                    <TabsContent value="rejected">
                        <Heading className='mb-4 text-center uppercase font-bold'>only pdf files are allow</Heading>
                        {
                            isRej ? fileRejections.map((file) => <div className='text-rose-500'>file: {file?.file?.name}</div>) : "no rejeccted files selected "
                        }

                    </TabsContent>
                </Tabs>

            </div>

        </div>
    )
}

export default HandleGetFileFromStorage