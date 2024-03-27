import React, { useContext } from 'react'
import { Input, InputProps } from '../../components/ui/input.js'
import { Label } from '../../components/ui/label.js'
import { useOutletContext } from 'react-router-dom'
import useGetLoginUser from '../../utils/getLogInUser.js'
import { Button } from '../../components/ui/button.js'
// import { Label } from '@radix-ui/react-dropdown-menu'
interface IProps extends InputProps {
    labelText?: string,
    htmlFor?: string
}
const UpdateUserProfile = () => {
    const user = useGetLoginUser();

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
            <div className=' p-3 grid gap-x-2 gap-y-4
            grid-cols-[repeat(auto-fit,minmax(min(15rem,calc(100%-0.1rem)),1fr))]'>
                <FInput
                    htmlFor='name'
                    labelText='Full Names'
                    defaultValue={user.fullname ?? ""}
                    placeholder='no name'
                />
                <FInput
                    disabled
                    htmlFor='email'
                    labelText='Email'
                    defaultValue={user.email}
                />
                <Button> update Profile</Button>
            </div>
        </div>
    )
}

export default UpdateUserProfile
