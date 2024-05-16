import React from 'react'
import { Document, Page } from 'react-pdf';

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
                        height={height || Math.max(80, 490)}

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