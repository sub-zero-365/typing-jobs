import { Forward} from 'lucide-react'
import React from 'react'
import { Button } from '../components/ui/button'
import {Link} from "react-router-dom"
const Payment = () => {
  return (
    <div>Payment
      lorem20

      <Link to={"/home/upload/invoice-download"}>
        <Button
          className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-full flex gap-x-2 sticky bottom-2 top-auto h-16"
        >Download Invoice <Forward size={20} /></Button>
      </Link>
    </div>
  )
}

export default Payment