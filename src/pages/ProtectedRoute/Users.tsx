import React, { Suspense } from 'react'
// import wait from '../../constants/wait.js'
import { useQuery } from '@tanstack/react-query'
import { useLoaderData } from 'react-router-dom'
import DataTable from '../../components/Table.js'
import { AreaChart, BarChart, data } from '../../components/charts/react-chartjs-2.js'
import wait from '../../constants/wait.js'
import { allUsersColumns } from '../../types/data.js'
import customFetch from '../../utils/customFetch.js'
import { user } from '../../utils/types.js'
import { Register } from '../Auth/index.js'
import { Button } from '../../components/ui/button.js'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
interface Props {
    search?: string,
    page?: number
}
const allUserQuery = (params: Props) => {
    const {
        search,
        page
    } = params
    return (
        {
            queryFn: async () => {
                await wait(5000)
                const { data } = await customFetch.get<{ users: user[] }>('/users/allusers', {
                    params
                })
                return data
            }, queryKey: ["users", {
                search: search ?? "",
                page: page ?? 1
            }],
            keepPreviousData: true,
        }
    )
}
export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ])
    await queryClient.ensureQueryData(allUserQuery(params))
    return {
        searchValues: {
            ...params
        }
    }

}
const User = () => {
    const { searchValues } = useLoaderData() as any
    const users = useQuery(

        allUserQuery(searchValues),

    ).data
    // data?.users
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className='max-w-sm w-full'>
                    <Suspense fallback={<div>loading ...</div>}

                    >
                        <Register />
                    </Suspense>

                </div>
            </DialogContent>
            <div className=" lg:flex gap-x-4">
                <div className='lg:w-[calc(100%-20rem)]'>
                    {/* <Bar_Chart /> */}
                    <BarChart
                        // options={options}
                        chartData={data}
                    />
                    <AreaChart
                        // options={options}
                        chartData={data}
                    />

                </div>
                <div className='w-[20rem]  flex-none'>
                    <Suspense fallback={<div>loading ...</div>}

                    >
                        <Register />
                    </Suspense>

                </div>
</div>
            {/* dont know how to removethis error cause it not an error */}
            <DataTable columns={allUsersColumns} data={users?.users} />
        </Dialog>
    )
}
User.displayName = "userPage"
export default User