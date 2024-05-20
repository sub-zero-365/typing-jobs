import React from 'react'
import { Document, Page } from 'react-pdf';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { motion } from "framer-motion";
import { Viewer ,ProgressBar,LoadError} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
const SinglePdfWithReactPdf = ({ pdfFile, width, height }: { pdfFile: any, width?: number, height?: number }) => {
    const [numPages, setNumPages] = React.useState<number>();
    const [pageNumber, _setPageNumber] = React.useState<number>(1);
   
    let url = "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"
    if (pdfFile) {
        url = URL.createObjectURL(pdfFile)
    }
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    const renderError = (error: LoadError) => {
        let message = '';
        switch (error.name) {
            case 'InvalidPDFException':
                message = 'The document is invalid or corrupted';
                break;
            case 'MissingPDFException':
                message = 'The document is missing';
                break;
            case 'UnexpectedResponseException':
                message = 'Unexpected server response';
                break;
            default:
                message = 'Cannot load the document';
                break;
        }
    
        return (
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#e53e3e',
                        borderRadius: '0.25rem',
                        color: '#fff',
                        padding: '0.5rem',
                    }}
                >
                    {message}
                </div>
            </div>
        );
    };
    
    if (1 == 1) {
        return (
            <Viewer
         
            renderLoader={(percentages: number) => (
                <div style={{ width: '240px' }}>
                    <ProgressBar progress={Math.round(percentages)} />
                </div>
            )}
            fileUrl={url || "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"} />
        )
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
                {/* { */}
                {/* Array.from({ length: numPages || 0 }, (_, idx) =>  */}
                <Page
                    // key={idx}

                    pageNumber={1}
                    width={width || Math.max(80, 390)}
                    // height={height || Math.max(80, 490)}
                    height={height || 400}
                    className="border-b-4 border-red-300"
                    pageIndex={3}

                />
                {/* ) */}

                {/* } */}

            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    )
}

export default SinglePdfWithReactPdf