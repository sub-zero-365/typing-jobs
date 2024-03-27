import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import wait from '../../constants/wait.js'
import useGetLoginUser from '../../utils/getLogInUser.js'
export const loader = (queryClient) => async ({ }) => {
    return null
}
const User = () => {
    const  user  = useGetLoginUser()
    return (
        <div>User
            <Link to={"/home"}>home
                this is the login user here
                {
                    JSON.stringify(user)
                }

            </Link>
        </div>
    )
}

export default User