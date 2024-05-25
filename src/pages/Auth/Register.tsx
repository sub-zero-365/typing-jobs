// "use client"; not a nextjs app 
import React, { useEffect } from "react";
import { Input } from "./Input.js";
import { Label } from "./Label.js";
// import { cn } from "@/utils/cn";
import SubmitBtn from "../../components/buttons/SubmitBtn.js";
import { cn } from "../../lib/utils.js";
import { userRegister } from "../../utils/types.js";
import { z, ZodType } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/customFetch.js";
import { isAxiosError } from "axios";
import useGetLoginUser from "../../utils/getLogInUser.js";
import UserSelect from 'react-select'
import { usersoptions } from "../../constants/options.js";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge.js";
import wait from '../../constants/wait.js'
import { Loader } from "../../components/Loaders/loader.js";

export default function SignupFormDemo() {
  const user = useGetLoginUser()
  const UserSchema: ZodType<userRegister> = z
    .object({
      name: z.string({ required_error: "" })
        .min(5, "full name should contain more than 5 character long"),
      email: z.string({
        description: "some desc",
        required_error: "email address is required"
      }).email(),
      password: z
        .string({ required_error: "password is required" })
        .min(8, { message: "Password is too short" })
        .max(20, { message: "Password is too long" })
      ,
      confirmPassword: z.string(),
      role: z.union([z.literal("user"),
      z.literal("employee")]
      ).optional(),
      phoneNumber: z.string({ invalid_type_error: 'number is required here' })
        .min(9, 'please 9 numbers are required to register ').max(12)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // path of error
    });

  // console.log(UserSchema.parse({ name: "" }))

  const { register, handleSubmit,
    formState: { errors, isSubmitting }, setValue,
   reset: _reset } = useForm<userRegister>({
      resolver: zodResolver(UserSchema),
    });


  // console.log(errors)
  const createUser = async (data: userRegister): Promise<any> => {
    return await customFetch.post("/auth/signup", {
      ...data
    })
  }
  console.error(errors)
  const navigate = useNavigate()
  const { mutate, failureReason, error, reset, } = useMutation({
    mutationFn: createUser,
    onError(error, _variables, _context) {
      if (isAxiosError(error)) {
        console.log("err is axios error", error)
      }
      console.log(error)
    },
    onSuccess({ data }, _variables, _context) {
      console.log(data)
      navigate(`/home/otp?email=${data?.user?.email}`)
      reset()
      _reset()
    },
  });
  const onSubmit = async (data: userRegister) => {
    console.log(data);
    await wait(5000)

    mutate(data)// Submit the form data if passwords match

  };

  useEffect(() => {
    let timer = setTimeout(() => {
      reset()
    }, 5000);

    return () => {
      clearTimeout(timer)
    }
  }, [error])
  return (
    <div className="max-w-md w-full mx-auto rounded-none  p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="my-1"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Full  Name</Label>
            <Input id="name" placeholder="example user" type="text"
              {...register('name')}
            />
          </LabelInputContainer>
        </div>
        {errors.name && <span className="error">{errors?.name?.message?.toString()}</span>}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" placeholder="6........" type="number"
            {...register('phoneNumber')}
          />
        </LabelInputContainer>
        {errors.phoneNumber && <span className="error">{errors?.phoneNumber?.message?.toString()}</span>}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="example@fc.com" type="email"
            {...register('email')}
          />
        </LabelInputContainer>
        {errors.email && <span className="error">{errors?.email?.message?.toString()}</span>}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••"
            {...register('password')}
            type="password" name="password" />
        </LabelInputContainer>
        {errors.password && <span className="error">{errors?.password?.message?.toString()}</span>}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">confirmPassword</Label>
          <Input id="confirmPassword" placeholder="••••••••"

            type="confirmPassword"
            {...register('confirmPassword')}
          />
        </LabelInputContainer>
        {errors.confirmPassword && <span className="error">{errors?.confirmPassword?.message?.toString()}</span>}

        {/* {errMessage && <div className="error">
          {errMessage}
        </div>} */}
        {failureReason?.message && <Badge variant="destructive"
          className='w-[min(25rem,calc(100%-1rem))] mx-auto h-10 text-center flex items-center justify-center mb-2'
        >{error?.response?.data?.msg}</Badge>}
        <SubmitBtn
          disabled={isSubmitting}
          className="bg-gradient-to-br relative group/btn
          disabled:bg-red-700
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          submittingText="creating account ..."
        >

          {isSubmitting ? <Loader childrenClassName="size-4" className="h-10" /> : <>Sign up &rarr;</>  }
          <BottomGradient />
        </SubmitBtn>


      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
