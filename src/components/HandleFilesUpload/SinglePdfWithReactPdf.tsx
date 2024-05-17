import React from 'react'
import { Document, Page } from 'react-pdf';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { motion } from "framer-motion";

const SinglePdfWithReactPdf = ({ pdfFile, width, height }: { pdfFile: any, width?: number, height?: number }) => {
    const [numPages, setNumPages] = React.useState<number>();
    const [pageNumber, _setPageNumber] = React.useState<number>(1);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    return (
        <div className='max-w-[50rem] w-full'>
            <Document
                className='border-2 border-green-700 max-w-fit'
                file=
                {pdfFile ||
                    "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"

                }
                onLoadSuccess={onDocumentLoadSuccess}>
                {
                    Array.from({ length: numPages || 0 }, (_, idx) => <Page
                        key={idx}
                        
                        pageNumber={(idx + 1)}
                        width={width || Math.max(80, 390)}
                        // height={height || Math.max(80, 490)}
                        height={400}
                        className="border-b-4 border-red-300"
                        pageIndex={3}

                    />)

                }

            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    )
}

export default SinglePdfWithReactPdf