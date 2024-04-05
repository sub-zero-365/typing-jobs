import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, FilePenLine, SlashIcon } from 'lucide-react'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Await, Link, defer, redirect, useAsyncError, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import Heading from '../components/Heading.js'
import { Loader, SkeletonCard } from '../components/Loaders/loader.js'
import SingleLogistic from '../components/SingleLogistic.js'
import UpdateLogistic from '../components/UpdateLogistic.js'
import { Ban } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "../components/ui/breadcrumb.js"
import { Button } from '../components/ui/button.js'
import customFetch from '../utils/customFetch.js'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog.js"
import { Input } from '../components/ui/input.js'
import wait from '../constants/wait.js'
import { useMutation } from '@tanstack/react-query';
import { AnimateError } from "../components/Animated/animated.js"

const singleLogistic = (id: any) => {
    return ({
        queryKey: ["logistics", id],
        queryFn: async (): Promise<any> => {
            // await wait(10000)
            const { data } = await customFetch.get(`/logistics?tracking_numbers=${id}`)
            return data
        }
    })
}
interface iLogistic {
    logistics?: any
}
const LogisticsContext = createContext<iLogistic>(null)
export const loader = (queryClient) => ({ params }) => {
    return defer({
        id: params.tracking_number,
        Logistic: queryClient.ensureQueryData(singleLogistic(params.tracking_number))
    })

}
const RenderLeeds = () => {
    const id = useParams().tracking_number
    const { logistics } = useQuery(singleLogistic(id)).data
    // const [toggle, setToggle] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const [name, setName] = useState("")
    const isValid = (val: string) => val.toLocaleLowerCase().trim() === logistics[0]?.name?.toLocaleLowerCase().trim()
    const buttonRef = useRef<any>(null)
    const navigate = useNavigate()
    const closeModal = async () => {

        // return
        mutate(logistics[0]?.tracking_number, {
            // onSettled,

            onSuccess(data, variables, context) {
                console.log("this is the varaibles", variables)
                navigate("/dashboard/logistics")
                // queryClient.invalidateQueries({ queryKey: ["logistics"] })
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["logistics", variables] })
                }, 200);

            },
        })
        wait(5000).then(() => {
            // buttonRef.current?.click()
        })
    }
    const deleteLog = async (id): Promise<void> => {
        await wait(10000, {
            state: "reject",
            message: "something happend"
        })
        // return
        // await customFetch.delete('/logistics/delete/' + id)
    }
    const { mutate, isPending,
        failureReason, reset

    } = useMutation({
        mutationFn: deleteLog,
        onError(error, variables, context) {
            console.log(error)
        },
    });
    // DeleteLogisticMutation.mutateAsync()





    return (
        <Dialog onOpenChange={() => {
            reset()
        }}>
            <DialogContent className="w-[min(425px,calc(100%-2rem))] rounded-sm  mx-auto !z-[2000]">
                <DialogHeader>
                    <DialogTitle>Delete logistic <span><Ban className="inline-block" /></span></DialogTitle>
                    <DialogDescription className='text-rose-800 font-medium'>
                        Enter logistics name to delete it  <span className='font-bold text-rose-950 uppercase ml-2'>{logistics[0]?.name}</span>
                    </DialogDescription>
                </DialogHeader>
                <Input
                    onKeyDown={e => {
                        if (e.key == "Enter" && isValid(name)) {
                            closeModal()
                        }
                    }}
                    onChange={e => {
                        const text = e.target.value
                        setName(text)
                        // if()
                    }}
                    placeholder={logistics[0]?.name} />
                <AnimateError
                    error={failureReason?.message}
                    errorMessage={failureReason?.message}
                />
                {/* <p className='error'>{failureReason?.message}</p> */}
                <DialogFooter>

                    {!isPending ? <Button type="submit"
                        disabled={!isValid(name)}
                        onClick={() => closeModal()}
                    >
                        delete

                    </Button> : <Loader
                        className='h-full'
                        childrenClassName='size-4'
                    />
                    }

                </DialogFooter>
            </DialogContent>
            <LogisticsContext.Provider value={{
                logistics: logistics
            }} >

                <div className='lg:grid grid-cols-[1fr,auto] gap-4 divide-x-2 max-w-4xl mx-auto'>
                    <div className=''>
                        <Heading
                            className='text-lg flex items-center justify-center sm:text-xl text-center sm:text-start text-gray-600 uppercase font-medium border-b pb-2 border-black leading-loose'
                        >
                            Product Details <FilePenLine size={15} className="inline-block ml-2 font-semibold" />
                        </Heading>
                        <SingleLogistic
                            {
                            ...logistics[0]
                            }

                        />
                    </div>
                    <div className='lg:w-64 border'>
                        <Heading
                            className='text-lg flex items-center justify-center sm:text-xl text-center sm:text-start text-gray-600 uppercase font-medium border-b pb-2 border-black leading-loose'
                        >
                            Update Product here <FilePenLine size={15} className="inline-block ml-2 font-semibold" />
                        </Heading>
                        <UpdateLogistic />
                        <Heading
                            className='text-lg mt-6 flex items-center justify-center sm:text-xl text-center sm:text-start text-gray-600 uppercase font-medium border-b pb-2 border-black leading-loose'
                        >
                            Delete Logistic  <FilePenLine size={15} className="inline-block ml-2 font-semibold" />
                        </Heading>
                        <p> magnam aliquam autem?</p>

                        <DialogTrigger asChild ref={buttonRef}>
                            <Button variant="destructive">Delet log</Button>
                        </DialogTrigger>
                    </div>
                </div>
            </LogisticsContext.Provider>

        </Dialog>
    )
}
const ErrorGettingLogistic = () => {
    const err = useAsyncError() as any;
    const erMsg = err?.response?.data?.msg || err?.response?.data || "something went wrong try agai later"

    return (
        <div className=''>
            <p className='error mb-10 p-5 '>Error:!{erMsg} {JSON.stringify(err)}</p>
        </div>
    )
}

const TrackingPage = () => {
    // const queryClient = useQueryClient()
    const { Logistic, id } = useLoaderData() as any
    const location = useLocation();
    const rd_from = location.state?.rd_from || "/dashboard"
    return (
        <div>
            <Breadcrumb className='px-2 my-3 '>
                <BreadcrumbList>
                    <BreadcrumbItem className='text-lg'>
                        <Link to={rd_from}>
                            <ChevronLeft className='' size={20} />
                        </Link>
                        {/* <BreadcrumbLink href="/" >Home</BreadcrumbLink> */}
                    </BreadcrumbItem>
                    <BreadcrumbItem className='text-lg'>
                        {/* <BreadcrumbLink href="/" >Home</BreadcrumbLink> */}
                        <Link to={"/dashboard"}>Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator >
                    <BreadcrumbItem className='text-lg'>
                        <Link to={"/dashboard/logistics"}>Logistics</Link>

                        {/* <BreadcrumbLink href="/components" >Components</BreadcrumbLink> */}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-lg'>single</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Heading className='text-2xl font-semibold text-center my-5'>
                Single Logistic <span
                    className='font-black ml-2'
                >{id}</span>
            </Heading>

            <React.Suspense
                fallback={<SkeletonCard />}
            >
                <Await
                    resolve={Logistic}
                    errorElement={
                        <ErrorGettingLogistic />
                    }
                >
                    <RenderLeeds />
                </Await>
            </React.Suspense>
        </div>
    )
}
export const useLogisticsContext = () => useContext(LogisticsContext);
export default TrackingPage