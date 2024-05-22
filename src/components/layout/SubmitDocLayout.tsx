import { motion, useScroll, useTransform } from 'framer-motion';
import React, { Dispatch, SetStateAction, createContext, useMemo, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Scrollable } from "../../components/Scrollable";
import CustomNavLink from '../CustomNavlink';
import Heading from '../Heading';
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
    const ref = useRef<any>(null)
    const { scrollXProgress } = useScroll({
        container: ref,
        axis: "x"

    })

 
    const width = useTransform(scrollXProgress, [0, 1], ["0%", "100%"])
    const value = useTransform(scrollXProgress, [0, 0.5, 1], [
        "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
        "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
        "linear-gradient(90deg, #7700ff 90%, rgb(8, 0, 155) 90%)"
    ])
    const { pathname } = useLocation()
    const [pdfFiles, setPdfFiles] = React.useState<any[]>([]);
    const [user, setUser] = React.useState<iUser>({
        name: "",
        email: "",
        phoneNumber: ""
    })
    const pages = useMemo(() => {
        if (pathname.includes("home")) {
            return ([
                {
                    page: "/home/upload",
                    name: "Select Document(s)"
                },
                {
                    page: "user",
                    name: "fill User Information"
                },
                {
                    page: "preview",
                    name: "Preview and Customize your print"
                },
                {
                    page: "payment",
                    name: "Payment"
                },
                {
                    page: "invoice-download",
                    name: "Download Invoice"
                },
            ])
        }
        return ([
            {
                page: "/upload",
                name: "Select Document(s)"
            },
            {
                page: "preview",
                name: "Preview and Customize your print"
            },
            {
                page: "payment",
                name: "Payment"
            },
            {
                page: "invoice-download",
                name: "Download Invoice"
            },
        ])

    }, [pathname])
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
            navigate("../upload")
        }
    }, [pdfFiles, pathname])
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
       
            <Scrollable
                refE={ref}

                className='-mb-2 gap-x-1  scrollto sticky top-4 py-4 flex flex-nowrap overflow-x-auto   md:gap-x-2  z-[10] [--scroll-to-height:0px] max-w-fit px-4 mx-auto'
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
                        className='bg-transparent text-xs relative z-20 bg-white lg:text-sm capitalize w-fit px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9 flex items-center !pointer-events-none  hover:bg-purple-600/20'
                    >

                        <span className='!text-[10px] mr-1 font-black'>({idx + 1})</span> {page.name}</CustomNavLink>)
                }
            </Scrollable>
            <motion.span
                style={{ background: value, width }}
                transition={{ duration: 0.2 }}
                className='block h-[1px] rounded-full md:hidden bg-colorPrimary '></motion.span>
            <div className='max-w-6xl mx-auto'>
                <Outlet />
            </div>
        </SubmitDocLayoutContext.Provider>

    )
}
export const useSubmitDocLayoutContext = () => React.useContext(SubmitDocLayoutContext)

export default SubmitDocLayout