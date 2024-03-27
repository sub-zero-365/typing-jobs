import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar.js'
import { Toaster } from './ui/toaster.js'
import { useToast } from "./ui/use-toast.js"
// import { createContext } from 'vm'
import { createContext } from 'react'
import customFetch from '../utils/customFetch.js'
import { useQueryClient } from '@tanstack/react-query'
import Footer from './Footer.js'
import { useDispatch } from 'react-redux'
import { removeUser, setUser as setLoginUser } from '../actions/userSlice.js'
import useAuthenticalUser from '../hooks/Authentication.js'

interface IUser {
  fullname: string,
  email: string,
  _id: string
}
interface IAppContext {
  user?: IUser | null;
  // setUser: (props: IUser) => void,
  // loginUser?: () => void,
  // logOutUser?: () => void
}
const AppContext = createContext<IAppContext>(undefined)
const RootElement = () => {
  // const navigate = useNavigate()
  // const queryClient = useQueryClient()

  // const [user, setUser] = useState<null | IUser>(null)
  // const dispatch = useDispatch()
  // const setUser = (props) => dispatch(setLoginUser(props))
  const { loginUser } = useAuthenticalUser()
  useEffect(() => {
    loginUser();
  }, [])
  return (
    <AppContext.Provider
      value={{
        // setUser,
        // logOutUser: logoutUser,
      }}
    >
      
      <div className='h-[100svh] flex flex-col'>
      <NavBar>
      </NavBar>
        <div className='flex-1'>
          <Outlet />
        </div>
        <Footer className='flex-none' />
      </div>
      <Toaster />
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)
export default RootElement