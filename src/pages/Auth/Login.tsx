import { Label } from '@radix-ui/react-label'
import React from 'react'
import { useForm } from "react-hook-form"
import { Form, redirect, useActionData, useSubmit, ActionFunctionArgs } from 'react-router-dom'
import SubmitBtn from '../../components/buttons/SubmitBtn.js'
import { Input } from '../../components/ui/input.js'
// import { toast } from '../../components/ui/use-toast.js'
import customFetch from '../../utils/customFetch.js'
import useError from '../../utils/useError.js'
import { useLoaderData } from '../../utils/utils.js'
import { AnimateError } from "../../components/Animated/animated.js"
import { Loader } from '../../components/Loaders/loader.js'
import { z } from "zod"
import wait from '../../constants/wait.js'
import toast from 'react-hot-toast';
import dayjs from "dayjs"
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
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
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
              {dayjs().format("DD/MM/YYYY")}
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
    </div>
  )))
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as FormData;
  var from = data.from
  await wait()
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
    formState: { errors, isLoading, isValid },
  } = useForm<ILoginUser>();
  const submit = useSubmit()
  const onSubmit = async (e) => {

    e.preventDefault()
    if (isValid) {
      submit(e.currentTarget)
    }
    await trigger()
  }
  const errorMessage = useActionData();

  const errorMessageLoader = useLoaderData();

  const errorMsg = useError([errorMessage,
    errorMessageLoader],)
  return (


    <div
      className='sm:flex max-w-sm flex-none w-full  mx-auto  '
    >


      <Form className='w-full space-y-5 '
        method='post'
        id="sigin-form"
        replace
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="email"
            className='m-0 text-start'
          >Email</Label>
          <Input type="email" id="email" placeholder="Email"
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
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="password"
            className='m-0 text-start'
          >Password</Label>
          <Input type="password" id="password" placeholder="password"
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
          className='w-[min(25rem,calc(100%-0.5rem))] rounded-full h-14 mx-auto  uppercase
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