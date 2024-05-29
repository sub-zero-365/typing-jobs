import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMediaQuery } from 'react-responsive'
import { z } from 'zod'
import { Button } from '../../components/ui/button.js'
import { Input } from '../../components/ui/input.js'
import { Label } from '../../components/ui/label.js'
import customFetch from '../../utils/customFetch.js'
import useGetLoginUser from '../../utils/getLogInUser.js'

const UserSchema = z
    .object({
        name: z.string({ required_error: "invalid type" }).trim()
            .min(5, "full name should contain more than 5 character long"),
        phoneNumber: z.string({ invalid_type_error: 'number is required here' })
            .min(9, 'please 9 numbers are required to register ').max(12)
    }).refine((data) => {
        const isNameGreaterThanOne = data.name.trim().split(" ").length > 1
        return isNameGreaterThanOne
    }, {
        message: "Please Enter alteast two names",
        path: ["name"], // path of error
    })
type iUpdateUser = z.infer<typeof UserSchema>

const UpdateUserProfile = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })
    const queryClient = useQueryClient()
    const user = useGetLoginUser();
    const { register, handleSubmit, formState: { errors, isDirty, isSubmitting }, reset, } = useForm<iUpdateUser>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: user?.fullname ?? '',
            phoneNumber: user?.phoneNumber?.toString() ?? ''
        }
    })
    const onSubmit = async (data: iUpdateUser) => {
        try {
            await customFetch.patch("/users/update-user", {
                ...data
            });
            await queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success("profile updated successfully", { position: !isDesktop ? "bottom-center" : "top-left" })
        } catch (err) {
            toast.error("fail to update profile", { position: !isDesktop ? "bottom-center" : "top-left" })
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=' p-3 grid gap-x-2 gap-y-4 items-end
            grid-cols-[repeat(auto-fit,minmax(min(15rem,calc(100%-0.1rem)),1fr))]'>
                <>
                    <div>
                        <Label htmlFor={'name'}
                            className='m-0 text-start'
                        >Full Names</Label>
                        <Input
                            placeholder='no name'
                            id='name'
                            type='text'
                            defaultValue={user?.fullname || ''}
                            autoComplete='additional-name'
                            {...register('name')}
                        />
                    </div>
                    {errors.name && <span className="error">{errors?.name?.message?.toString()}</span>}
                </>
                <>
                    <div>
                        <Label htmlFor={'name'}
                            className='m-0 text-start'
                        >Phone Number</Label>
                        <Input
                            placeholder='place enter your new phone number'
                            id='name'
                            type='tel'
                            defaultValue={user?.phoneNumber || ''}
                            autoComplete='additional-name'
                            {...register('phoneNumber')}
                        />
                    </div>
                    {errors.phoneNumber && <span className="error">{errors?.phoneNumber?.message?.toString()}</span>}
                </>



                <Button type='submit'
                    disabled={!isDirty || isSubmitting}
                > update Profile</Button>
            </form>
        </div>
    )
}

export default UpdateUserProfile
