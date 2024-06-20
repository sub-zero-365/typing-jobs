import { Forward } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Link, Navigate, redirect, useNavigate } from "react-router-dom"
import SinglePdfWithReactPdf from '../components/HandleFilesUpload/SinglePdfWithReactPdf'
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { cn } from '../lib/utils'
import Heading from '../components/Heading'
import { Input } from '../components/ui/input'
import wait from '../constants/wait'

const fetchPdf = async () => {
  const response = await fetch('http://192.168.43.68:5000/api/v1/tasks/generate-invoice/2');
  const blob = await response.blob();
  return blob;
};
const options = [
  { id: 'option1', label: 'MTN CM', color: "bg-yellow-400/50" },
  { id: 'option2', label: 'ORANGE CM', color: "bg-red-400/50" },
];

const PaymentCard = ({ id, label, selected, color }) => {
  const navigate=useNavigate()
  const handlePayment = async () => {
    await wait();
    return navigate("../invoice-download")
  
  }
  const isSelected = id == selected;
  return (
    <div className='flex flex-col gap-y-2 cursor-pointer'>

      <Label htmlFor={id} className={cn('border rounded-sm shadow-lg transition-colors duration-300 border-orange-500 min-h-28 px-2 py-2.5',
        isSelected && "border-colorPrimary border-4",
        color
      )}>
        <div className='flex items-center gap-x-3'>

          <RadioGroupItem value={id} id={id} className='h'>
          </RadioGroupItem>
          {/*  */}
          <Heading>{label}</Heading>
        </div>

      </Label>
      {
        <div className={cn('flex flex-col gap-y-0.5',
          !isSelected && "hidden"

        )}>
          <Input placeholder={`enter ${label} number`} type='tel' className='rounded-none placeholder:text-xs'>
          </Input>
          <Button
            onClick={() => handlePayment()}
            className={cn("",
              // color
            )}>pay with {label}</Button>
        </div>

      }
    </div>
  )
}
const Payment = () => {
  const [pdfBlob, setPdfBlob] = useState<any>(null);

  useEffect(() => {
    fetchPdf().then((blob) => setPdfBlob(blob));
  }, []);
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div>
      {pdfBlob && <SinglePdfWithReactPdf pdfFile={pdfBlob} />}
      <Heading className='text-center text-xl italic'>Please Select Your Payment Method</Heading>

      <RadioGroup className='max-w-md mx-auto grid  gap-y-2 grid-cols-2 gap-x-2 px-2 py-4' onValueChange={value => setSelected(value)}>
        {options.map((arr, idx) => <PaymentCard key={idx} {...arr} selected={selected} />)}
      </RadioGroup>
      {/* <Link to={"../invoice-download"}>
        <Button
          className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-full flex gap-x-2 sticky bottom-2 top-auto h-16"
        >Download Invoice <Forward size={20} /></Button>
      </Link> */}
    </div>
  )
}

export default Payment