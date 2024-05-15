import React from 'react'
import { userRegister } from '../utils/types'
import { ZodType, z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import Heading from '../components/Heading'
import SubmitBtn from '../components/buttons/SubmitBtn'
// import {
//     Tabs,
//     TabsContent,
//     TabsList,
//     TabsTrigger,
// } from "../../components/ui/tabs.js"
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
    const { register, handleSubmit,
        formState: { errors, }, setValue,
        clearErrors, reset: _reset } = useForm<iUser>({
            resolver: zodResolver(UserSchema),
        });
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
        
        
            <Heading className='text-center font-bold text-3xl mb-6'>User Information</Heading>
            <form className='px-4 w-[min(30rem,calc(100%-2rem))] mx-auto'>
                <div className="grid gap-2 mb-4">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input type="text" id="fullname" className='' placeholder='Full Name' />
                </div>
                <div className="grid gap-2 mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" defaultValue="ecg@example.com" />
                </div>
                <div className="grid gap-2 mb-6">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input type="tel" id="phone" placeholder='Enter Your Phone Number' />
                </div>
                <SubmitBtn
                    className="bg-gradient-to-br  group/btn w-[min(25rem,calc(100%-2rem))] bg-colorPrimary   shadow-colorPrimary mx-auto rounded-full flex gap-x-2 sticky bottom-2 top-auto h-16
          disabled:bg-red-700
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800  text-white  font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    submittingText=" submitting ..."
                >

                   Next Preview &rarr;
                    <BottomGradient />
                </SubmitBtn>
            </form>
        </div>
    )
}

export default UserInForPage