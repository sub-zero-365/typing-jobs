import React from 'react'
import { Await, defer, useAsyncError, useAsyncValue, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import TrackingInput from '../components/TrackingInput.js'
import customFetch from '../utils/customFetch.js'
import wait from '../constants/wait.js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import SingleLogistic from '../components/SingleLogistic.js'
import { iMiniPost } from './ProtectedRoute/NewLogistics.js'
import axios from 'axios'
// import {queryClient} from '@tanstack/react-query'
// import axios from "axios"
const singleLogistic = (tracking_numbers: any) => {
    return ({
        queryKey: ["logistics", tracking_numbers],
        queryFn: async (): Promise<any> => {
            await wait()
            const { data } = await customFetch.get(`/logistics?tracking_numbers=${tracking_numbers}`)
            return data
        }
    })
}
export const loader = (queryClient) => ({ request }) => {
    // alert(params.id)
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    return defer({
        searchValues: params,
        Logistic: queryClient.ensureQueryData(singleLogistic(params.tracking_numbers))
    })

}
const RenderLeeds = () => {
    const params = Object.fromEntries([
        ...new URL(window.location.href).searchParams.entries(),
    ]);
    // const id = useParams().id
    const { logistics } = useQuery(singleLogistic(params?.tracking_numbers)).data
    if (!logistics) return "d"
    return (
        <div>
            {/* {JSON.stringify(logistics
            )} */}
            {
                logistics?.map(logistic => <SingleLogistic
                    {
                    ...logistic
                    }

                />)
            }
        </div>
    )
}
const ErrorGettingLogistic = () => {
    const err = useAsyncError() as any;
    let erMsg = err?.response?.data?.msg || err?.response?.data || "something went wrong try agai later"

    if (axios.isAxiosError(err)) {
        erMsg = err.response?.data?.msg
    }

    return (
        <div className=''>
            <p className='error mb-10 p-5 '>Error:!{erMsg}</p>
        </div>
    )
}

const TrackingPage = () => {
    // const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { Logistic, searchValues } = useLoaderData() as any
    // const { searchValues } = useParams()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const id = formdata.get("tracking_number");
        navigate("/home/tracking?tracking_numbers=" + id,
            { replace: true })

    }
    return (
        <div>

            <TrackingInput
                defaultValue={searchValues?.tracking_numbers || ""}
                onSubmit={handleSubmit}
            >

            </TrackingInput>
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