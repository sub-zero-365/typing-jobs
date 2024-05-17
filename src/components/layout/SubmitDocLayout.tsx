import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
import { NavLink, Outlet, redirect, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import Heading from '../Heading'
import { cn } from '../../lib/utils';
import CustomNavLink from '../CustomNavlink';
import { Scrollable } from "../../components/Scrollable"
export interface iSubmitDocLaYoutContext {
    pdfFiles: any[],
    setPdfFiles: any,
    handleFilesChange: any,
    handleDeleteFile: any,
    isSelected: number | null,
    setIsSelected: Dispatch<SetStateAction<number | null>>,
    user: iUser,
    setUser: Dispatch<SetStateAction<iUser>>
}

export interface iUser {
    name: string,
    email: string,
    phoneNumber: string
}
const SubmitDocLayoutContext = createContext<iSubmitDocLaYoutContext>({
    pdfFiles: [],
    setPdfFiles: () => { },
    handleFilesChange: () => { },
    handleDeleteFile: () => { },

    isSelected: null,
    setIsSelected: () => { },
    user: {
        email: "",
        name: "",
        phoneNumber: ""
    },
    setUser: () => { },


});

const SubmitDocLayout = () => {
    const [pdfFiles, setPdfFiles] = React.useState<any[]>([]);
    const [user, setUser] = React.useState<iUser>({
        name: "",
        email: "",
        phoneNumber: ""
    })
    const pages = [
        {
            page: "/home/upload",
            name: "Select Document(s)"
        },
        {
            page: "/home/upload/user",
            name: "fill User Information"
        },
        {
            page: "/home/upload/preview",
            name: "Preview"
        },
        {
            page: "/home/upload/payment",
            name: "Payment"
        },
        {
            page: "/home/upload/download",
            name: "Download Invoice"
        },
    ]

    const handleFilesChange = (file: any) => {
        setPdfFiles(prevFiles => [...prevFiles, ...file])
    }
    const handleDeleteFile = (idx: number) => {
        const tmp = pdfFiles;
        tmp.splice(idx, 1);
        setPdfFiles([...tmp])
    }
    const [isSelected, setIsSelected] = React.useState<number | null>(null);


    const navigate = useNavigate()
    React.useEffect(() => {
        //if the user trys to refresh to navigate to any other page without
        // selecting a pdffiles s/he will be redirected to start page 
        if (pdfFiles.length <= 0) {
            navigate("/home/upload")
        }
    }, [pdfFiles])
    return (
        <SubmitDocLayoutContext.Provider value={{
            pdfFiles,
            setPdfFiles,
            handleFilesChange,
            handleDeleteFile,

            isSelected,
            setIsSelected,
            user,
            setUser
        }}>
            <Heading className='text-center text-3xl mb-6 uppercase font-bold my-6'>Upload Document(s) </Heading>

            <Scrollable className='my-6 gap-x-1 scrollto sticky top-16 py-4  bg-inherit [--light-color:hsl(var(--color-primary))] [--scroll-to-height:7px] max-w-fit px-4 mx-auto'
                direction='row'
            >
                {
                    pages.map((page, idx) => <CustomNavLink to={page.page} end
                        style={{
                            pointerEvents: "none"
                        }}
                        show
                        replace
                        selectedClassName='text-green-800  !pointer-events-none text-white bg-colorPrimary'
                        animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60 !pointer-events-none rounded-full "
                        className='bg-transparent text-xs lg:text-sm capitalize w-fit px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-2 h-9 flex items-center !pointer-events-none  hover:bg-purple-600/20'
                    >
                
                        <span className='!text-[10px] mr-1 font-black'>({idx + 1})</span> {page.name}</CustomNavLink>)
                }
            </Scrollable>
            <div className='max-w-6xl mx-auto'>
                <Outlet />
            </div>
        </SubmitDocLayoutContext.Provider>

    )
}
export const useSubmitDocLayoutContext = () => React.useContext(SubmitDocLayoutContext)

export default SubmitDocLayout