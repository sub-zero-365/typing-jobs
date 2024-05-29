import React, { useEffect, useState } from 'react'
import { TimeLine, TimeLineContainer } from '../../components/ui/TimeLine'
import Heading from '../../components/Heading'
import { AnimatedText } from '../../components/Animated/animated'
import CustomNavLink from '../../components/CustomNavlink'
import { Outlet } from 'react-router-dom'
import { Document, Page } from 'react-pdf';
import SinglePdfWithReactPdf from '../../components/HandleFilesUpload/SinglePdfWithReactPdf'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../../components/ui/resizable"
import { Scrollable } from '../../components/Scrollable'
export const loader = () => {
    return ({ user: "rose" })
}

const fetchPdf = async () => {
    const response = await fetch('http://192.168.43.68:5000/api/v1/tasks/generate-invoice/2');
    const blob = await response.blob();
    return blob;
};
const SingleTaskPage = ({ pdfFile }: { pdfFile?: any }) => {
    const [pdfBlob, setPdfBlob] = useState<any>(null);

    useEffect(() => {
        fetchPdf().then((blob) => setPdfBlob(blob));
    }, []);

    return (
        <>
            <AnimatedText text='Task' />
            <ResizablePanelGroup
                direction="horizontal"
                className="h-auto max-w-[calc(100%-1rem)] mx-auto rounded-lg border"
            >
                <ResizablePanel defaultSize={70}>
                    <div>
                        <Heading>Document Detail</Heading>
                        {pdfBlob && <SinglePdfWithReactPdf pdfFile={pdfBlob} />}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30}>
                    <div className='pl-4'>
                        <Heading className='mb-6 font-semibold text-3xl text-center uppercase text-colorPrimary'>Action Tab</Heading>
                        <Scrollable className='mb-6'>
                            <CustomNavLink to='.'
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs flex-1 line-clamp-2 text-center flex items-center justify-center relative z-20 bg-white lg:text-sm capitalize  px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9    hover:bg-purple-600/20'
                                show
                                replace
                                end
                            >
                                Files Changes
                            </CustomNavLink>
                            <CustomNavLink to='./later'
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs flex-1 line-clamp-2 text-center flex items-center justify-center relative z-20 bg-white lg:text-sm capitalize  px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9    hover:bg-purple-600/20'
                                show
                                replace
                                end

                            >
                                Update Pdf File
                            </CustomNavLink>
                        </Scrollable>
                        <Outlet />
                    </div>
                </ResizablePanel>


            </ResizablePanelGroup>
        </>
    )
}

export default SingleTaskPage