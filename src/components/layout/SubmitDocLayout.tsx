import React, { createContext, useState } from 'react'
import { NavLink, Outlet, redirect, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import Heading from '../Heading'
import { cn } from '../../lib/utils';
import CustomNavLink from '../CustomNavlink';
import { Scrollable } from "../../components/Scrollable"
interface iSubmitDocLaYoutContext {
    pdfFiles: any[],
    setPdfFiles: any,
    handleFilesChange: any,
    handleDeleteFile: any,
    nextPage: () => string,
    state: any,
    setState: any
}

interface iUser {

}
const SubmitDocLayoutContext = createContext<Partial<iSubmitDocLaYoutContext>>({});

const SubmitDocLayout = () => {
    const [pdfFiles, setPdfFiles] = React.useState<any[]>([]);

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
            page: "/home/upload/user/",
            name: "Preview"
        },
        {
            page: "/home/upload/payment",
            name: "Payment"
        },
    ]
    const location = useLocation();

    const handleFilesChange = (file: any) => {
        setPdfFiles(prevFiles => [...prevFiles, ...file])
    }
    const handleDeleteFile = (idx: number) => {
        const tmp = pdfFiles;
        tmp.splice(idx, 1);
        setPdfFiles([...tmp])
    }
    const nextPage = () => {
        return "page"
    }
    const [state, setState] = useState("rose")
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
            nextPage,
            state,
            setState
        }}>
            <Heading className='text-center text-3xl mb-6 uppercase font-bold my-6'>Upload Document(s) </Heading>

            <Scrollable className='my-6 scrollto max-w-fit px-4 mx-auto'
                direction='column'
            >

                {
                    pages.map((page, idx) => <CustomNavLink to={page.page} end
                        style={{
                            pointerEvents: "none"
                        }}
                        show
                        replace
                        selectedClassName='text-green-800 !pointer-events-none'
                        animateClassName="inset-0 size-full shadow-md  right-0  bg-purple-600/60 !pointer-events-none rounded-full"
                        className='bg-transparent capitalize w-fit px-6 shadow rounded-full text-sm shadow-colorPrimary mb-2 h-10 flex items-center !pointer-events-none text-black hover:bg-purple-600/20'

                    >
                        ({idx + 1}) {page.name}</CustomNavLink>)
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