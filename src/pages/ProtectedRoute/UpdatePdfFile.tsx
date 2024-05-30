import React, { useState } from 'react'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import SubmitBtn from '../../components/buttons/SubmitBtn'
import { Input } from '../../components/ui/input'
import customFetch from '../../utils/customFetch'
import { useForm } from "react-hook-form"
import { ActionFunctionArgs, Form, Navigate, redirect, useActionData, useNavigate, useParams, useSubmit } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import wait from '../../constants/wait'
// import { useQueryClient } from '@tanstack/react-query'
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import HandleGetFileFromStorage from '../../components/HandleFilesUpload/HandleGetFileFromStorage'
import SinglePdfWithReactPdf from '../../components/HandleFilesUpload/SinglePdfWithReactPdf'
import toast from 'react-hot-toast'
import { useMediaQuery } from 'react-responsive'

const validation = z.object({
    editSummary: z.string({
        description: "some desc",
        required_error: "this field  is required"
    }).min(4, { message: "Description  is too short" }),
    newFile: z
        .string({ required_error: "file is required" })
        .min(4, { message: "file is too short" })
        .max(20, { message: "file is too long" })
    ,
})
type iUpdateSchema = z.infer<typeof validation> & {
    device?: "desktop" | "mobile"
}
// const queryClient=useQueryClient()
// queryClient.invalidateQueriess
export const action = (queryClient: QueryClient) => async ({ params, request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData) as iUpdateSchema
    const isDesktop = data.device=="desktop"


    try {
        await customFetch.patch("/pdfdocument/" + params.taskId,
            { ...data })
        toast.success("Edited Successfully ", {position:isDesktop?"top-right":"bottom-center"})
        await queryClient.invalidateQueries({ queryKey: ['SingleEditQuery', params.taskId!] })
        await queryClient.invalidateQueries({ queryKey: ['singleTaskQuery', params.taskId!] })
        return redirect("..")
    } catch (err) {
        // alert("error")
        return null

    }
}
const UpdatePdfFile = () => {
    // const id = useParams().id

    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

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
    const [file, setFile] = useState<any>(null);

    console.log("pdf file", file)
    return (
        <Form method='PATCH'
            onSubmit={(e) => onSubmit(e)}

        >
            <div className='grid gap-y-2 mb-6'>
                <input type='hidden' value={isDesktop ? "desktop" : "phone"} name="device" />
                <HandleGetFileFromStorage name='pdffile' handleFile={setFile} />
                <Label htmlFor="newfile"
                    className=' text-start font-medium text-xl pl-[calc(1rem/4)]'
                >new file </Label>

                <Input
                    {...register("newFile")}
                    className='!shadow-none text-lg max-w-[calc(100%-1rem)] mx-auto ring-1 ring-colorPrimary rounded-sm  focus-within:ring-colorPrimary focus-within:right-[1px]   focus:shadow-none   focus:ring-1 '>
                </Input>
                {errors.newFile && <span className="error">{errors?.newFile?.message?.toString()}</span>}

            </div>
            {file && <SinglePdfWithReactPdf
                pdfFile={file[0]}
            />}
            <div className='grid gap-y-2 mb-6'>
                <Label htmlFor="description"
                    className=' text-start font-medium text-xl pl-[calc(calc(100%-min(calc(100%-1rem),40rem))/2)]'
                >Descriptions </Label>
                <Textarea
                    {...register("editSummary")}
                    className='!shadow-none text-lg max-w-[min(calc(100%-1rem),40rem)] mx-auto ring-1 ring-colorPrimary rounded-sm  focus-within:ring-colorPrimary focus-within:right-[1px]   focus:shadow-none   focus:ring-1 '>

                </Textarea>
                {errors.editSummary && <span className="error">{errors?.editSummary?.message?.toString()}</span>}

            </div>
            <SubmitBtn className='max-w-[min(calc(100%-1rem),30rem)]  mb-6 mx-auto block h-12 w-full bg-colorPrimary'>
                Commit Changes
            </SubmitBtn>
        </Form>
    )
}

export default UpdatePdfFile