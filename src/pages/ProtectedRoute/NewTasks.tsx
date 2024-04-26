import { AnimatePresence } from "framer-motion"
import { ArrowDownWideNarrow } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Heading from '../../components/Heading.js'
import LogisticCard from '../../components/LogisticCard.js'
import NewLogisticInput from '../../components/NewLogisticImageCard.js'
import SubmitBtn from '../../components/buttons/SubmitBtn.js'
import { Input } from '../../components/ui/input.js'
import { Label } from '../../components/ui/label.js'
import customFetch from '../../utils/customFetch.js'
import { useForm } from "react-hook-form"
import { cn } from "../../lib/utils.js"
import wait from "../../constants/wait.js"
export interface iMiniPost {
    image: File,
    text: string,
    createdAt?: any
}

export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    // const data = Object.fromEntries(formData);
    const images = formData.get("uploadedImages")

    try {
        await customFetch.post('/logistics/new', formData);
        console.log("this is data ", images)
        queryClient.invalidateQueries(['jobs']);
        //   toast.success('Job added successfully ');
        // return redirect('/dashboard');
        return null
    } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.response?.data
        //   toast.error(error?.response?.data?.msg);
        alert(errMsg)
        return error;
    }
}
const NewLogistics = () => {
    const navigate = useNavigate()
    const formRef = useRef(null)
    interface iLogistic {
        price: number;
        name: string;

    }
    const {
        register,
        handleSubmit,
       
        clearErrors,
        formState: { errors, isLoading, isSubmitting },
    } = useForm<iLogistic>();
    //   const submit = useSubmit()

    const [description, setDescription] = useState<iMiniPost[]>([])

    // const fileRef = useRef(null)
    console.log(errors)
    const deleteImg = (id: any) => {
        console.log("this is the id ", id)
        const temp = description.filter(item => item.createdAt != id);

        console.log(temp)
        setDescription(
            [...temp]
        )
    }
    const handleFilesChange = (newDesc: iMiniPost) => {
        setDescription(desc => [
            ...desc, newDesc
        ])
    }
    const onSubmit = async (_data) => {
        const formData = new FormData();
        const fd = new FormData(formRef.current);
        const data = Object.fromEntries(fd);
        description.forEach(({ image, text }, index) => {
            formData.append(`uploadedImages`, image);
            formData.append("text", text)
        });
        Object.keys(data).forEach((key) => {
            formData.append(`${key}`, data[key])
        })
        try {
            await customFetch.post("/logistics/new", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigate("/dashboard/logistics")
        } catch (err) {
            alert("error")
        }
    }

    return (
        <div className='flex-1 w-full py-4 h-[calc(100vh-4rem)] overflow-y-auto scrollto '>


            <div className='lg:px-5  bg-white px-2  py-5 rounded-lg max-w-5xl mx-auto'>
                <Heading
                    className='px-5 leading-10 pb-3 font-semibold  border-b mb-6
                            '
                >
                    Add New Task for writing <span><ArrowDownWideNarrow className="inline-block" size={15}></ArrowDownWideNarrow></span>
                </Heading>
                <div
                    className='  grid grid-cols-1 gap-y-4 lg:grid-cols-12
                    gap-x-5  items-start '
                >
                    <div
                        className='border lg:col-span-4 rounded-lg px-2 py-2 lg:sticky lg:top-2  '
                    >
                        <div>
                            <NewLogisticInput
                                handleFilesChange={handleFilesChange} />
                        </div>



                    </div>
                    <form 
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                        ref={formRef}
                        className='border rounded-lg lg:col-span-8
                mt-10 lg:mt-0
                lg:px-4 py-5 lg:sticky lg:top-2 space-y-4 bg-white relative z-1 px-3 '

                    >
                        <div>
                            <Label htmlFor="name"
                                className='font-medium mb-3 text-lg block'
                            >
                                Name
                            </Label>
                            <Input id="name"  type="text"
                                className={cn(""
                                    ,
                                    errors.name && "ring-rose-400"
                                )}
                                placeholder='what do you want to call your logistic'
                                {...register("name", {
                                    required: "This field is required",
                                    maxLength: 30,
                                    minLength: 2
                                })}
                            />
                            {errors.name && errors.name.type === "required" && (
                                <p role="alert" className="error">
                                    {errors.name?.message}
                                </p>
                            )}
                            {errors.name && errors.name.type === "maxLength" && (
                                <span className="error">Max length exceeded</span>
                            )}
                            {errors.name && errors.name.type === "minLength" && (
                                <span className="error">Min length 2 character</span>
                            )}
                            {/* {JSON.stringify(errors)} */}
                        </div>
                        <div>
                            <Label htmlFor="price"
                                className='font-medium mb-3 text-lg block'

                            >
                                Price
                            </Label>
                            <Input

                                id="price"
                                type="number"
                                placeholder='price here'
                                {...register("price", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.price && (
                                <p role="alert" className="error">
                              error validate
                                </p>
                            )}
                        </div>


                        <AnimatePresence>

                            {description
                                ?.sort((a, b) => b.createdAt - a.createdAt)
                                .map((img) => {
                                    return <LogisticCard
                                        key={img.createdAt}
                                        deleteImg={deleteImg}
                                        imageObject={img}
                                    />
                                })}


                        </AnimatePresence>
                        <div
                            className='flex gap-x-2 justify-end  flex-wrap !ml-auto'

                        >

                            <SubmitBtn
                                isLoading={isSubmitting}
                                submittingText="creating logistic ..."
                                type="submit"
                                // variant='outline'
                                className='
                                w-[min(250px,calc(100%-0.2rem))] py-6
                                text-lg
                                '
                            >
                                Create Logistics

                            </SubmitBtn>


                        </div>


                    </form>
                </div>

            </div>
        </div>
    )
}

export default NewLogistics