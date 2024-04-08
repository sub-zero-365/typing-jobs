import React from 'react'
import wait from '../../constants/wait'
import { user } from '../../utils/types.js'
import customFetch from '../../utils/customFetch.js'
import { useLoaderData, Await, defer, useAsyncValue } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Stats from '../../components/Stats.js'
import { ErrorElement } from '../../components/error/errorComponents.js'

const singleUserQuery = (userId) => ({
    queryKey: [`singleUser`, userId],
    queryFn: async () => {

        const { data } = await customFetch.get<{ user: user }>(`/users/${userId}`)
        return data.user
    }

})
const singleUserLogisticsQuery = (id: number) => {
    return {
        queryKey: [
            'singleuserdetails', id

        ],
        queryFn: async () => {
            // await wait(10000)
            const { data } = await customFetch.get('/logistics/all', {
                params: {
                    userId: id
                },
            });
            return data;
        },
        keepPreviousData: true,
    };
};
const statsQuery = (id: number) => ({
    queryKey: ['single-stats', id],
    queryFn: async () => {
        await wait(500, { state: "reject" })
        const { data } = await customFetch.get<any>('/logistics/stats', {
            params: {
                userId: id
            }
        });
        return data;
    }
})
export const loader = (queryClient) => async ({ params }) => {
    const id = params.userId as number
    const user = await queryClient.ensureQueryData(singleUserQuery(id)) as user
    return defer({
        user,
        id,
        userDetails: queryClient.ensureQueryData(singleUserLogisticsQuery(id)),
        userStats: queryClient.ensureQueryData(statsQuery(id)),
    })

}

const UserInfo = () => {
    const [user, stats] = useAsyncValue();
    return (<div>
        some code here
        <Stats defaultStats={stats.defaultStats} />
        {/* {JSON.stringify(stats)} */}
    </div>)
}
const SingleUser = () => {
    const { id, userDetails,
        userStats } = useLoaderData() as any
    const user = useQuery(singleUserQuery(id)).data

    return (
        <div>SingleUser
            {JSON.stringify(user)}

            <React.Suspense fallback={<div>loading userDetails... </div>}>

                <Await errorElement={<ErrorElement/>}
                    resolve={Promise.all([userDetails,
                        userStats])}
                >
                    <UserInfo />
                </Await>

            </React.Suspense>
        </div>

    )
}

export default SingleUser