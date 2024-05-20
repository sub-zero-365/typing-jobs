import React, { useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.js"
import { Scrollable } from "../components/Scrollable"
import { useSubmitDocLayoutContext } from '../components/layout/SubmitDocLayout.js'
import { useResizeObserver } from 'usehooks-ts'
import SinglePdfWithReactPdf from '../components/HandleFilesUpload/SinglePdfWithReactPdf.js'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button.js'
import { Forward } from 'lucide-react'

const DocBookPreview = ({ file }) => {
  const ref = useRef<any>(null)
  const { width = 0, height = 0 } = useResizeObserver({
    ref,
    box: 'border-box',
  })
  return (<div
    ref={ref}
    className='bg-green-500 min-h-[300px] rounded-md shadow-sm h-[200px] overflow-hidden'>
    <SinglePdfWithReactPdf
      pdfFile={file}
      width={width}
      height={height}
    />
  </div>)

}

const Preview = () => {
  const { pdfFiles } = useSubmitDocLayoutContext()
  return (
    <div>
      <Tabs defaultValue="account" className="w-full border-4">
        <TabsList className='!w-fit border flex border-green-500 !mx-auto flex-none'>
          <TabsTrigger value="account">Document Information</TabsTrigger>
          <TabsTrigger value="password">User Information</TabsTrigger>
        </TabsList>
        <TabsContent value="account">

          <div className='gap-y-2  justify-center pt-6 px-4 gap-x-2 mb-6 items-start grid grid-cols-[repeat(auto-fit,minmax(min(20rem,calc(100%-60px)),_1fr))] '>

            {pdfFiles.map((file, idx) => <DocBookPreview key={idx} file={file} />)}

          </div>

        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      <Link to={"/home/upload/payment"}>
        <Button
          className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-full flex gap-x-2 sticky bottom-2 top-auto h-16"
        >Payment <Forward size={20} /></Button>
      </Link>
    </div>
  )
}

export default Preview