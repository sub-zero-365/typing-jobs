import React, { useState } from 'react'
import { TimeLine, TimeLineContainer } from '../../components/ui/TimeLine'
import Heading from '../../components/Heading'
import { AnimatedText } from '../../components/Animated/animated'
import CustomNavLink from '../../components/CustomNavlink'
import { Outlet } from 'react-router-dom'
import { Document, Page } from 'react-pdf';
export const loader = () => {
    return null
}
const SingleTaskPage = () => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, _setPageNumber] = useState<number>(1);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    return (
        <div>
            <AnimatedText text='Task' />
            <div className='grid grid-cols-[1fr,auto] '>
                <div>
                    <Heading>Document Detail</Heading>
                    <Document
                    className='border-2 border-green-700 max-w-md'
                    file="https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                    {/* <Viewer fileUrl="https://css4.pub/2015/usenix/example.pdf" defaultScale={SpecialZoomLevel.PageFit} />; */}
                </div>
                <div className='max-w-sm'>

                    <Heading className='mb-6'>Edited History</Heading>
                    <div className='grid px-4 grid-cols-2 max-w-[28rem] mx-auto mb-5 w-full flex-row gap-4'>

                        <CustomNavLink to='./'

                            selectedClassName=''
                            className='bg-transparent text-black hover:bg-slate-50'
                            show
                        >
                            later
                        </CustomNavLink>
                        <CustomNavLink to='./later'

                            selectedClassName=''
                            className='bg-transparent text-black hover:bg-slate-50'
                            show

                        >
                            add
                        </CustomNavLink>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SingleTaskPage