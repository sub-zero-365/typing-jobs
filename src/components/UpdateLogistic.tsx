import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom'
import { z, ZodType } from "zod"
import { useToast } from "../components/ui/use-toast"
import { useLogisticsContext } from '../pages/SingleLogisticPage.js'
import customFetch from '../utils/customFetch.js'
import SubmitBtn from './buttons/SubmitBtn.js'
import { CustomInput } from './Inputs/Input.js'
import { Label } from './ui/label.js'
import { ToastAction } from './ui/toast.js'
import { Input } from './ui/input.js'
import { useQueryClient } from '@tanstack/react-query'
import Select from "react-select"
import { statusOptions } from "../constants/options"
export interface iUpdate {
    price: string;
    name: string;
    status?: "pending" | "recieved" | "sent";
}

const UpdateLogistic = () => {
    const queryClient = useQueryClient()
    const updateSchema: ZodType<iUpdate> = z.object({
        price: z.string({
            invalid_type_error: "please enter a valid number"
        }).min(1),
        name: z.string({
            required_error: "please name is required"
        }),
        status: z.union([z.literal("pending"), z.literal("recieved")],
            z.literal("sent")
        ).optional()
    })
    const tracking_number = useParams().tracking_number
    const { toast } = useToast()
    const { logistics } = useLogisticsContext();
    const { name, price } = logistics[0] as any || {}
    const _formRef = useRef<any>(null)
    const { register, handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        reset: _reset } = useForm<iUpdate>({
            resolver: zodResolver(updateSchema),
        });
    console.log(getValues(), errors)
    const onSubmit = async (_data) => {
        console.log("data is here ", _data)
        try {

            await customFetch.patch("/logistics/update/" + tracking_number, { ..._data })
            toast({
                description: "Update messages successfully !!!",
            })
            queryClient.invalidateQueries({
                queryKey: ["logistics",
                    tracking_number]
            })
        } catch (err) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "fail to delete message",
                action: <ToastAction altText="Try again"
                    onClick={() => { _formRef.current?.click() }
                    }
                >Try again</ToastAction>

            })
        }

    }
    return (
        <div className='px-2'>


            <form
                // ref={_formRef}
                onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor=''
                        className={"text-start m-0"}
                    >Name</Label>
                    <Input
                        className='my-1 mb-2 h-8'
                        defaultValue={name}
                        {...register("name")}
                    />
                </div>
                {/* <CustomInput
                    labelText='name'
                    labelclassName="text-lg mb-2 capitalize"
                    // defaultValue={name}
                    className='my-1 mb-2 h-8'
                    name='name'
                    {...register("name")}

                />
                {errors.name && <span className="error">{errors?.name?.message?.toString()}</span>} */}

                <div>
                    <Label htmlFor=''
                        className={"text-start m-0"}
                    >Price</Label>
                    <Input
                        className='my-1 mb-2 h-8'
                        type='number'
                        // name="price"
                        defaultValue={price}
                        {...register("price")}
                    />
                </div>


                {errors.price && <span className="error">{errors?.price?.message?.toString()}</span>}

                {/* <Label
                    htmlFor='status'
                    className='text-sm'
                >
                    select status
                </Label> */}
                <Select id='status'
                    className='mb-2 max-w-[100px] text-xs sm:text-sm'
                    isSearchable={false}
                    options={statusOptions}
                    onChange={(e) => {
                        const val = e?.value as any
                        _reset({
                            status: val
                        })

                    }}
                />
                <SubmitBtn
                    submittingText="updating ..."

                    type="submit"
                    // variant='outline'
                    isLoading={isSubmitting}
                    refE={_formRef}
                    className='
                                w-[min(250px,calc(100%-0.2rem))] py-6
                                text-sm
                                '
                >
                    Update Logistic

                </SubmitBtn>
            </form>



        </div>
    )
}

export default UpdateLogistic