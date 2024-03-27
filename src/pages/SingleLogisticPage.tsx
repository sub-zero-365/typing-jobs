import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Await, defer, useAsyncError, useLoaderData, useParams } from 'react-router-dom'
import SingleLogistic from '../components/SingleLogistic.js'
import wait from '../constants/wait.js'
import customFetch from '../utils/customFetch.js'
import Heading from '../components/Heading.js'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../components/ui/resizable.js"
const singleLogistic = (id: any) => {
    return ({
        queryKey: ["logistics", id],
        queryFn: async (): Promise<any> => {
            await wait()
            const { data } = await customFetch.get(`/logistics/${id}`)
            return data
        }
    })
}
export const loader = (queryClient) => ({ params }) => {
    return defer({
        id: params.tracking_number,
        Logistic: queryClient.ensureQueryData(singleLogistic(params.tracking_number))
    })

}
const RenderLeeds = () => {
    const id = useParams().tracking_number
    const { logistic } = useQuery(singleLogistic(id)).data

    return (
    <>
    
    
      <div className='hidden lg:block'>
      <ResizablePanelGroup direction="horizontal"
            className="min-h-[200px] max-w-5xl mx-auto  rounded-lg border">
            <ResizablePanel defaultSize={25}>
                <div className='lg:w-64 border static top-0 left-0'>
                    <Heading>Action menu</Heading>
                </div>
            </ResizablePanel>
            {/* <ResizableHandle /> */}
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
                <SingleLogistic
                    {
                    ...logistic
                    }

                />
            </ResizablePanel>
        </ResizablePanelGroup>
      </div>
        <div className='lg:hidden grid-cols-[1fr,auto] gap-4 divide-x-2 max-w-4xl mx-auto'>
            <div className='grid'>

                <SingleLogistic
                    {
                    ...logistic
                    }

                />

            </div>
            <div className='lg:w-64 border'>
                some cord
            </div>
        </div>
    </>
    )
}
const ErrorGettingLogistic = () => {
    const err = useAsyncError() as any;
    const erMsg = err?.response?.data?.msg || err?.response?.data || "something went wrong try agai later"

    return (
        <div className=''>
            <p className='error mb-10 p-5 '>Error:!{erMsg}</p>
        </div>
    )
}

const TrackingPage = () => {
    // const queryClient = useQueryClient()
    const { Logistic, id } = useLoaderData() as any

    return (
        <div>
            <Heading className='text-2xl font-semibold text-center my-5'>
                Single Logistic <span
                    className='font-black ml-2'
                >{id}</span>
            </Heading>

            <React.Suspense
                fallback={<p>Loading your package please wait a little...</p>}
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

export default TrackingPage