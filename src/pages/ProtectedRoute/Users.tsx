import React, { Suspense } from 'react'
// import wait from '../../constants/wait.js'
import { useQuery } from '@tanstack/react-query'
import DataTable from '../../components/Table.js'
import wait from '../../constants/wait.js'
import { allUsersColumns } from '../../types/data.js'
import customFetch from '../../utils/customFetch.js'
import { user } from '../../utils/types.js'
import { Register } from '../Auth/index.js'
import { useLoaderData } from 'react-router-dom'
import { Bar_Chart } from '../../components/charts/recharts.js'
import { AreaChart, BarChart, data, options } from '../../components/charts/react-chartjs-2.js'
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
        <div>
            <div className=" lg:grid grid-cols-[1fr,auto]">
                <div className=''>
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
                <div className='max-w-sm w-full'>
                    <Suspense fallback={<div>loading ...</div>}

                    >
                        <Register />
                    </Suspense>

                </div>

            </div>
            {/* dont know how to removethis error cause it not an error */}
            <DataTable columns={allUsersColumns} data={users?.users} />
        </div>
    )
}
User.displayName = "userPage"
export default User