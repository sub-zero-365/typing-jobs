import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button.js'
import { Input } from '../../components/ui/input.js'
import { Label } from '@radix-ui/react-label'
import { useForm, SubmitHandler } from "react-hook-form"
import { Form, redirect, useActionData, useNavigation, useSubmit } from 'react-router-dom'
import SubmitBtn from '../../components/buttons/SubmitBtn.js'
import wait from '../../constants/wait.js'
import customFetch from '../../utils/customFetch.js'
import { toast } from '../../components/ui/use-toast.js'
import { useLoaderData } from '../../utils/utils.js'
import useError from '../../utils/useError.js'
// import { useToast } from "./ui/use-toast.js"

export const action = (queryClient) => async ({ request }) => {
  // await wait(5000)
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  var from = data.from
  try {
    await customFetch.post('/auth/login', data);
    toast({
      description: "Login successfull",
    })
    return redirect("/dashboard")
  } catch (err) {
    toast({
      variant: "destructive",
      description: err?.response?.data?.msg,
    })
    console.log("err: ", err)
    return err?.response?.data?.msg || null
  }

  // alert("calling loader here")
  // return redirect("/home/dashboard")

}
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  return (params?.message || null)
}
const Login = () => {
  interface ILoginUser {
    email: string,
    password: string
  }
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    clearErrors,
    formState: { errors, isLoading },
  } = useForm<ILoginUser>();
  const submit = useSubmit()
  console.log("errors", Object.values(errors).length)
  const isError = Object.values(errors).length > 0
  const onSubmit = (data) => console.log("this is data",data)
  // handleSubmit(onSubmit)
  const formSubmit = async (data) => {
    // const isValid = await trigger()
    // event.preventDefault();
    // if (isValid) {
    //   submit(event.currentTarget);
    // }
    // await trigger()
    // setTimeout(() => {
    //   clearErrors()
    // }, 3000);
  }
  const errorMessage = useActionData();

  const errorMessageLoader = useLoaderData();

  const errorMsg = useError([errorMessage, errorMessageLoader])
  return (
    <div>

      <div
        className='sm:flex max-w-7xl  mx-auto border '
      >
        <div className='sm:block hidden'>

        </div>

        <Form className='w-full space-y-5'
          method='post'
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email"
              className='m-0 text-start'
            >Email</Label>
            <Input type="email" id="email" placeholder="Email"
              name='email'
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors.email && (
              <p role="alert" className="error">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password"
              className='m-0 text-start'
            >Password</Label>
            <Input type="password" id="password" placeholder="password"
              name='password'
              {...register("password", {
                required: true,
                minLength: 8

              })}
            />
            {errors.password && (
              <p role="alert" className="error">
                {errors.password?.message}
              </p>
            )}
            {errors.password && errors.password.type === "required" && (
              <span className='error'>This is required</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className='error'>Max length exceeded</span>
            )}
          </div>
          {(errorMsg) && <div className='error'>
            {errorMsg}
          </div>}
          <SubmitBtn type='submit'
            submittingText='logging ....'
            className='w-[min(25rem,calc(100%-0.5rem))] mx-auto  uppercase
            disabled:bg-blue-800
            '
            onSubmit={handleSubmit(onSubmit)}

          >
            Login
          </SubmitBtn>
        </Form>
      </div>

    </div>
  )
}

export default Login