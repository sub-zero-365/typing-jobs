import React, { useContext } from 'react'
import { Input, InputProps } from '../../components/ui/input.js'
import { Label } from '../../components/ui/label.js'
import { useOutletContext } from 'react-router-dom'
import useGetLoginUser from '../../utils/getLogInUser.js'
import { Button } from '../../components/ui/button.js'
import { userRegister } from '../../utils/types.js'
import { ZodType, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// import { Label } from '@radix-ui/react-dropdown-menu'
interface IProps extends InputProps {
    labelText?: string,
    htmlFor?: string
}
interface iUpdateUser extends Pick<userRegister, 'name'> {

}
const UserSchema: ZodType<iUpdateUser> = z
    .object({
        name: z.string({ required_error: "invalid type" })
            .min(5, "full name should contain more than 5 character long")
    })


const UpdateUserProfile = () => {
    const user = useGetLoginUser();
    const { register, handleSubmit, formState: { errors, }, reset } = useForm<iUpdateUser>({
        resolver: zodResolver(UserSchema),
    })
    console.log('thisis te er', errors)
    const onSubmit = async (data: iUpdateUser) => {
        alert('enter here')
        console.log('this is the data', data)
    }
    const FInput = ({ labelText, htmlFor, ...props }: IProps) => (<div>
        <Label htmlFor={htmlFor}
            className='m-0 text-start'
        >{labelText}</Label>
        <Input
            {...props}
        />
    </div>)
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=' p-3 grid gap-x-2 gap-y-4 items-end
            grid-cols-[repeat(auto-fit,minmax(min(15rem,calc(100%-0.1rem)),1fr))]'>
                <div>
                    <Label htmlFor={'name'}
                        className='m-0 text-start'
                    >{'Name'}</Label>
                    <Input
                     placeholder='no name'
                     id='name'
                     type='text'
                     autoComplete='additional-name'
                     {...register('name')}
                    />
                </div>
                {errors.name && <span className="error">{errors?.name?.message?.toString()}</span>}

                {/* <FInput
                    htmlFor='password'
                    labelText='password'
                    defaultValue={user?.fullname ?? ""}
                    placeholder='no name'
                /> */}

                <Button type='submit'> update Profile</Button>
            </form>
        </div>
    )
}

export default UpdateUserProfile
