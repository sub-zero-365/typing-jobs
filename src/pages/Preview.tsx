import { Forward } from 'lucide-react'
import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useResizeObserver } from 'usehooks-ts'
import SinglePdfWithReactPdf from '../components/HandleFilesUpload/SinglePdfWithReactPdf.js'
import { useSubmitDocLayoutContext } from '../components/layout/SubmitDocLayout.js'
import { Button } from '../components/ui/button.js'
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.js"

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
  const { pdfFiles, user } = useSubmitDocLayoutContext()
  const { pathname } = useLocation();
  const files = React.useMemo(() => pdfFiles, [pdfFiles])

  return (
    <div>
      <Tabs defaultValue="docinformation" className="w-full ">

        {pathname.includes("home") && <TabsList className='!w-fit border flex  !mx-auto flex-none'>
          <TabsTrigger value="docinformation">Document Information</TabsTrigger>
          <TabsTrigger value="userinformation">User Information</TabsTrigger>
        </TabsList>}
        <TabsContent value="docinformation">
          <div className='gap-y-2  justify-center  pt-6 px-4 gap-x-2 mb-6 items-start grid grid-cols-[repeat(auto-fit,minmax(min(20rem,calc(100%-60px)),_1fr))] '>
            {files.map((file, idx) => <DocBookPreview key={idx} file={file} />)}
          </div>
        </TabsContent>
        <TabsContent value="userinformation">
          <div className='max-w-sm mx-auto border-[1px] border-colorPrimary  rounded-md py-5 mb-6 shadow-sm'>
            <Table>

              <TableBody>
                <TableRow >
                  <TableCell className="font-bold ">Full Name</TableCell>
                  <TableCell className="text-right">{user?.name}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="font-bold ">Email Address</TableCell>
                  <TableCell className="text-right">{user?.email}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="font-bold ">Phone Number</TableCell>
                  <TableCell className="text-right">{user?.phoneNumber}</TableCell>
                </TableRow>
              </TableBody>

            </Table>

          </div>

        </TabsContent>
      </Tabs>
      <Link to={"../payment"}>
        <Button
          className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-full flex gap-x-2 sticky bottom-2 top-auto h-16"
        >Payment <Forward size={20} /></Button>
      </Link>
    </div>
  )
}

export default Preview