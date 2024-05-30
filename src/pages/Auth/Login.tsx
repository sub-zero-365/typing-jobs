import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { ActionFunctionArgs, Form, redirect, useActionData, useSubmit } from 'react-router-dom'
import SubmitBtn from '../../components/buttons/SubmitBtn.js'
import { Input } from '../../components/ui/input.js'
import dayjs from "dayjs"
import toast from 'react-hot-toast'
import { z } from "zod"
import { AnimateError } from "../../components/Animated/animated.js"
import { Loader } from '../../components/Loaders/loader.js'
import customFetch from '../../utils/customFetch.js'
import useError from '../../utils/useError.js'
import { useLoaderData } from '../../utils/utils.js'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { motion } from "framer-motion"
import { useMediaQuery } from 'react-responsive'
const validation = z.object({
  email: z.string({
    description: "some desc",
    required_error: "email address is required"
  }).email(),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" })
  ,
})

type FormData = z.infer<typeof validation> & {
  from?: string
}

const LoginNotification = ({ userName }) => {
  return (toast.custom((t) => (
    <motion.div
      initial={{ y: -100}}
      animate={{ y: 0 }}
      transition={{ duration:0.5 }}
   
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } fixed top-4 max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {userName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Welcome Back 🥰
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </motion.div>
  )))
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as FormData;
  var from = data.from
  try {
    const { user } = (await customFetch.post('/auth/login', data))?.data;
    LoginNotification({ userName: user.name })
    return redirect("/")
  } catch (err) {
    return err?.response?.data?.msg || null
  }

}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
export const loader = async ({ request }: ActionFunctionArgs) => {
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
    trigger,
    formState: { errors, isValid },
  } = useForm<ILoginUser>();
  const submit = useSubmit()
  const onSubmit = async (e) => {

    e.preventDefault()
    if (isValid) {
      submit(e.currentTarget)
    }
    await trigger()
  }

  const [showPassword, setShowPassword] = useState(false)
  const errorMessage = useActionData();

  const errorMessageLoader = useLoaderData();

  const errorMsg = useError([errorMessage,
    errorMessageLoader],)
  return (


    <div
      className='sm:flex max-w-sm flex-none w-full  mx-auto '
    >


      <Form className='w-full space-y-5 '
        method='post'
        id="sigin-form"
        replace
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="email"
            className='m-0 text-start font-medium text-xl mb-2'
          >Email Address </Label>
          <div className='flex items-center bg-white focus-within:ring-2 transition-all duration-300 ring-1 ring-colorPrimary rounded-sm overflow-hidden'>
            <span className='flex-none border-e-[1px] border-colorPrimary flex items-center justify-center size-10'>
              <Mail size={20} />
            </span>
            <Input type="email" autoComplete='email'
              className='h-10 flex-1  !shadow-none rounded-none !border-none focus-within:!ring-0 focus-within:border-none focus-within:shadow-none focus:shadow-none focus:border-0 focus:right-0 hover:border-none hover:ring-0'
              id="email" placeholder="example@gmail.com"
              {...register("email", {
                required: true,
                minLength: 8
              })}
            />

          </div>
          {errors.email && (
            <p role="alert" className="error">
              {errors.email?.message}
            </p>
          )}
          {errors.email && errors.email.type === "required" && (
            <span className='error'>This is required</span>
          )}
          {errors.email && errors.email.type === "minLength" && (
            <span className='error'>Max length exceeded</span>
          )}
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="password"
            className='m-0 text-start font-medium text-xl'
          >Password</Label>
          <div className='flex items-center  bg-white focus-within:ring-2 transition-all duration-300 ring-1 ring-colorPrimary rounded-sm overflow-hidden'>
            <span
              onClick={() => setShowPassword(c => !c)}
              className='flex-none border-e-[1px] border-colorPrimary flex items-center justify-center size-10'>
              {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}

            </span>
            <Input type={!showPassword ? "password" : "text"} autoComplete='current-password'
              className='h-10 flex-1 placeholder:text-xl placeholder:font-black  !shadow-none rounded-none !border-none focus-within:!ring-0 focus-within:border-none focus-within:shadow-none focus:shadow-none focus:border-0 focus:right-0 hover:border-none hover:ring-0'
              id="password" placeholder="••••••••"
              {...register("password", {
                required: true,
                minLength: 8

              })}
            />

          </div>
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

        <AnimateError
          duration={0.3}
          error={errorMsg}
          errorMessage={errorMsg}
        />


        <SubmitBtn type='submit'
          submittingText={
            <Loader
              className='h-full relative z-10'
              childrenClassName='size-4'
            />
          }
          className='w-[min(25rem,calc(100%-0.5rem))] bg-colorPrimary rounded-sm h-12 mx-auto  uppercase
            disabled:bg-blue-800
            '
        >
          login &rarr;
          <BottomGradient />
        </SubmitBtn>


      </Form>
    </div>


  )
}
export default Login