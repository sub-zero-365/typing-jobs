import React from 'react'
import Heading from '../components/Heading'
import { Button } from '../components/ui/button'
import { ActionFunction, ActionFunctionArgs, Form } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import SubmitBtn from '../components/buttons/SubmitBtn'
import wait from '../constants/wait'
export const action = async ({ params }: ActionFunctionArgs) => {
    try {
        await wait(5000)
        const res = await customFetch.post("/pdfdocument/new", {})
        return null
    } catch (err) {
        alert("fail to create pdf document")
        return null
    }
}
const DownLoadInvoice = () => {
    return (
        <Form method='post'
            id="sigin-form"
            replace
        >
            <Heading className='text-center text-xl my-10 font-semibold uppercase mb-6'>Download your reciept here</Heading>

            <SubmitBtn
                className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-xl flex gap-x-2 sticky bottom-2 top-auto h-12"
            >
                Download invoice
            </SubmitBtn>
        </Form>
    )
}

export default DownLoadInvoice