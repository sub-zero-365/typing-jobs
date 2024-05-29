import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, User } from 'lucide-react'
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { ZodType, z } from 'zod'
import Heading from '../components/Heading'
import { useSubmitDocLayoutContext } from '../components/layout/SubmitDocLayout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { userRegister } from '../utils/types'
interface iUser extends Pick<userRegister, "name" | "email" | "phoneNumber"> {

}

const UserSchema: ZodType<iUser> = z
    .object({
        name: z.string({ required_error: "" })
            .min(5, "full name should contain more than 5 character long"),
        email: z.string({
            description: "some desc",
            required_error: "email address is required"
        }).email(),
        phoneNumber: z.string({ invalid_type_error: 'number is required here' })
            .min(9, 'please 9 numbers are required to register ').max(12)
    })
const UserInForPage = () => {
    const { user, setUser } = useSubmitDocLayoutContext()
    const navigate = useNavigate()
    const { register, handleSubmit,
        formState: { errors },
        reset: _reset } = useForm<iUser>({
            resolver: zodResolver(UserSchema),
            defaultValues: {
                ...user
            }
        });
    const onSubmit = async (data: iUser) => {
        console.log("data", data)
        setUser(data)
        navigate("../preview")


    }
    const BottomGradient = () => {
        return (
            <>
                <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </>
        );
    }
    return (
        <div>


            <Heading className='text-center font-medium text-2xl my-6'>User Information</Heading>
            <p className='text-center text-gray-600 mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit esentium.</p>
            <form onSubmit={handleSubmit(onSubmit)}

                className='px-4 w-[min(30rem,calc(100%-2rem))] mx-auto mb-24 rounded-sm bg-white py-10'>
                <div className="grid gap-2 mb-4">
                    <Label htmlFor="fullname">Full Name</Label>
                    <div className='flex items-center  bg-white focus-within:ring-2 transition-all duration-300 ring-1 ring-colorPrimary rounded-sm overflow-hidden'>
                        <span
                            className='flex-none border-e-[1px] border-colorPrimary flex items-center justify-center size-10'>
                            <User size={20} />
                        </span>
                        <Input type="text" id="fullname"


                            {...register("name")}
                            className='h-10 flex-1  placeholder:font-black  !shadow-none rounded-none !border-none focus-within:!ring-0 focus-within:border-none focus-within:shadow-none focus:shadow-none focus:border-0 focus:right-0 hover:border-none hover:ring-0' placeholder='Full Name' />
                        {errors.name && <span className="error">{errors?.name?.message?.toString()}</span>}
                    </div>

                </div>
                <div className="grid gap-2 mb-4">
                    <Label htmlFor="email">Email</Label>
                    <div className='flex items-center  bg-white focus-within:ring-2 transition-all duration-300 ring-1 ring-colorPrimary rounded-sm overflow-hidden'>
                    <span
                            className='flex-none border-e-[1px] border-colorPrimary flex items-center justify-center size-10'>
                            <Mail size={20} />
                        </span>
                    <Input type="email" id="email"
                        className='h-10 flex-1  placeholder:font-black  !shadow-none rounded-none !border-none focus-within:!ring-0 focus-within:border-none focus-within:shadow-none focus:shadow-none focus:border-0 focus:right-0 hover:border-none hover:ring-0'
                        {...register("email")}
                        defaultValue="ecg@example.com" />
                    {errors.email && <span className="error">{errors.email?.message?.toString()}</span>}
                    </div>

                </div>
                <div className="grid gap-2 mb-6">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className='flex items-center  bg-white focus-within:ring-2 transition-all duration-300 ring-1 ring-colorPrimary rounded-sm overflow-hidden'>
                        <span
                            className='flex-none border-e-[1px] border-colorPrimary flex items-center justify-center size-10'>
                            <Phone size={20} />
                        </span>

                        <Input type="tel" id="phone"
                            className='h-10 flex-1  placeholder:font-black  !shadow-none rounded-none !border-none focus-within:!ring-0 focus-within:border-none focus-within:shadow-none focus:shadow-none focus:border-0 focus:right-0 hover:border-none hover:ring-0'
                            {...register("phoneNumber")}
                            placeholder='23767.......3' />
                        {errors.phoneNumber && <span className="error">{errors.phoneNumber?.message?.toString()}</span>}
                    </div>

                </div>
                <Button
                    className="bg-gradient-to-br  group/btn w-[min(30rem,calc(100%-0.5rem))] bg-colorPrimary   shadow-colorPrimary mx-auto rounded-s, flex gap-x-2  top-auto h-12
          disabled:bg-red-700
          from-bg-colorPrimary dark:from-bg-colorPrimary dark:to-bg-colorPrimary to-bg-colorPrimary/60  dark:bg-bg-colorPrimary  text-white  font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
           
                >

                  Preview &rarr;
                    <BottomGradient />
                </Button>
            </form>
        </div>
    )
}

export default UserInForPage