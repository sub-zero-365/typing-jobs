import React from 'react'
import { ActionFunctionArgs, Form } from 'react-router-dom'
import Heading from '../components/Heading'
import SubmitBtn from '../components/buttons/SubmitBtn'
import { useSubmitDocLayoutContext } from '../components/layout/SubmitDocLayout'
import customFetch from '../utils/customFetch'
import { useMediaQuery } from 'react-responsive'
import toast from 'react-hot-toast'
export const action = async ({ request }: ActionFunctionArgs) => {
    try {
        // await wait(5000)
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const isDesktop = data.device == "desktop"
        if (data?.guess_user && data.guess_user == "guess_user") {
            await customFetch.post("/pdfdocument/new/guess?guess_user=guess_user", {
                ...data
            })
        } else {
            delete data?.guess_user
            await customFetch.post("/pdfdocument/new", {})
        }
        toast.success("Created Successfully,Thanks for using our service ", { position: isDesktop ? "top-right" : "bottom-center" })

        return null
    } catch (err) {
        alert("fail to create pdf document")
        return null
    }
}
const DownLoadInvoice = () => {
    const { user } = useSubmitDocLayoutContext()
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })
    return (
        <Form method='post'
            id="sigin-form"
            replace
        >

            <Heading className='text-center text-xl my-10 font-semibold uppercase mb-6'>Download your reciept here</Heading>
            {user?.email && <input type="hidden" name='guess_user' value={"guess_user"} />}
            <input type='hidden' value={isDesktop ? "desktop" : "phone"} name="device" />

            <input type="hidden" name='name' value={user?.name} />
            <input type="hidden" name='phoneNumber' value={user?.phoneNumber} />
            <input type="hidden" name='email' value={user?.email} />

            <SubmitBtn
                className="w-[min(25rem,calc(100%-2rem))] bg-colorPrimary shadow-sm  shadow-colorPrimary mx-auto rounded-xl flex gap-x-2 sticky bottom-2 top-auto h-12"
            >
                Download invoice
            </SubmitBtn>
        </Form>
    )
}

export default DownLoadInvoice