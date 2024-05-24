import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { Input } from './ui/input';
import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
const taskSchema = z.object({
    id: z.string({ invalid_type_error: "please enter a number " }).min(10, "min number show be 10 characters")
})
type validationSchema = z.infer<typeof taskSchema>;
// interface IFindMyId extends useNavigationType{
// }

const FindMyId = ({ searchPath }: { searchPath: string }) => {
    const navigate = useNavigate()
    const { register, handleSubmit,
        formState: { errors, isSubmitting } } = useForm<validationSchema>({
            resolver: zodResolver(taskSchema),
        });
    const onSubmit = ({ id }: validationSchema) => {
        navigate(searchPath + id)
        console.log("this the data here ", id)
    }
    return (
        <>

            <form
                onSubmit={handleSubmit(onSubmit)}

                className="flex items-center rounded-xl overflow-hidden placeholder:uppercase ">
                <Input placeholder='ENTER ID  '
                    className='rounded-none '
                    {...register("id")}
                />

                <Button disabled={isSubmitting}
                    type='submit'
                    className='rounded-none'
                >Submit</Button>
            </form>
            {errors.id && <span className="error">{errors?.id?.message?.toString()}</span>}

        </>
    )
}

export default FindMyId