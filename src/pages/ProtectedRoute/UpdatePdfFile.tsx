import React from 'react'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import SubmitBtn from '../../components/buttons/SubmitBtn'
import { Input } from '../../components/ui/input'
import customFetch from '../../utils/customFetch'
import { useForm } from "react-hook-form"
import { ActionFunctionArgs, Form, redirect, useActionData, useParams, useSubmit } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import wait from '../../constants/wait'

const validation = z.object({
    editSummary: z.string({
        description: "some desc",
        required_error: "this field  is required"
    }).min(4, { message: "Description  is too short" }),
    newFile: z
        .string({ required_error: "file is required" })
        .min(8, { message: "file is too short" })
        .max(20, { message: "file is too long" })
    ,
})
type iUpdateSchema = z.infer<typeof validation>
export const action = (queryClient) => async ({ params,request }: ActionFunctionArgs) => {
    await wait(500)
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch("/pdfdocument/" + params.taskId,
        {...data})
        return null
    } catch (err) {
        alert("error")
        return null

    }
}
const UpdatePdfFile = () => {
    // const id = useParams().id
    const {
        register,
        trigger,
        formState: { errors, isValid },
    } = useForm<iUpdateSchema>({
        resolver: zodResolver(validation)
    });
    const submit = useSubmit()
    const onSubmit = async (e) => {

        e.preventDefault()
        if (isValid) {
            submit(e.currentTarget)
        }
        await trigger()
    }
    return (
        <Form method='PATCH'
            onSubmit={(e) => onSubmit(e)}

        >
            <div className='grid gap-y-2 mb-6'>
                <Label htmlFor="newfile"
                    className=' text-start font-medium text-xl pl-[calc(1rem/4)]'
                >new file </Label>
                <Input
                    {...register("newFile")}
                    className='!shadow-none text-lg max-w-[calc(100%-1rem)] mx-auto ring-1 ring-colorPrimary rounded-sm  focus-within:ring-colorPrimary focus-within:right-[1px]   focus:shadow-none   focus:ring-1 '>
                </Input>
            </div>
            <div className='grid gap-y-2 mb-6'>
                <Label htmlFor="description"
                    className=' text-start font-medium text-xl pl-[calc(1rem/4)]'
                >Descriptions </Label>
                <Textarea
                    {...register("editSummary")}
                    className='!shadow-none text-lg max-w-[calc(100%-1rem)] mx-auto ring-1 ring-colorPrimary rounded-sm  focus-within:ring-colorPrimary focus-within:right-[1px]   focus:shadow-none   focus:ring-1 '>

                </Textarea>
            </div>
            <SubmitBtn className='max-w-[calc(100%-1rem)] mx-auto h-12 w-full bg-green-800'>
                Commit Changes
            </SubmitBtn>
        </Form>
    )
}

export default UpdatePdfFile