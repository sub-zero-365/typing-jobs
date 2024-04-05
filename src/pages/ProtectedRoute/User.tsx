import React, { Suspense } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
// import wait from '../../constants/wait.js'
import useGetLoginUser from '../../utils/getLogInUser.js'
import { Register } from '../Auth/index.js'
import customFetch from '../../utils/customFetch.js'
import { user } from '../../utils/types.js'
import { useLoaderData } from '../../utils/utils.js'
import wait from '../../constants/wait.js'
const allUserQuery = () => {
    return (
        {
            queryFn: async () => {
                await wait(5000)
                const { data } = await customFetch.get<user[]>('/users/allusers')
                return data
            }, queryKey: ["users"]
        }
    )
}
export const loader = (queryClient) => async ({ }) => {
    return await queryClient.ensureQueryData(allUserQuery())
}
const User = () => {
    // const  user  = useGetLoginUser()
    const users = useLoaderData<any>() as readonly user[]

    return (
        <div>
            {JSON.stringify(users)}
            <div className=" lg:grid grid-cols-[1fr,auto]">
                <div className=''>
                    data ui here

                </div>
                <div className='max-w-sm w-full'>
                    <Suspense fallback={<div>loading ...</div>}

                    >
                        <Register />
                    </Suspense>

                </div>

            </div>

        </div>
    )
}
User.displayName = "userPage"
export default User