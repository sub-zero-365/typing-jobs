import { Forward } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Link } from "react-router-dom"
import SinglePdfWithReactPdf from '../components/HandleFilesUpload/SinglePdfWithReactPdf'
const fetchPdf = async () => {
  const response = await fetch('http://192.168.43.68:5000/api/v1/tasks/generate-invoice/2');
  const blob = await response.blob();
  return blob;
};
const Payment = () => {
  const [pdfBlob, setPdfBlob] = useState<any>(null);

  useEffect(() => {
    fetchPdf().then((blob) => setPdfBlob(blob));
  }, []);
  return (
    <div>
      {pdfBlob && <SinglePdfWithReactPdf pdfFile={pdfBlob} />}
      
      <Link to={"../invoice-download"}>
        <Button
          className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-full flex gap-x-2 sticky bottom-2 top-auto h-16"
        >Download Invoice <Forward size={20} /></Button>
      </Link>
    </div>
  )
}

export default Payment