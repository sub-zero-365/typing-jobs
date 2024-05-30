import React, { useEffect, useState } from 'react'
import { LoaderFunctionArgs, Outlet, defer, useOutlet, useOutletContext } from 'react-router-dom'
import { AnimatedText } from '../../components/Animated/animated'
import CustomNavLink from '../../components/CustomNavlink'
import SinglePdfWithReactPdf from '../../components/HandleFilesUpload/SinglePdfWithReactPdf'
import Heading from '../../components/Heading'
import { Scrollable } from '../../components/Scrollable'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../../components/ui/resizable"
import customFetch from '../../utils/customFetch'
import { iEdit, iPDFDocument } from '../../utils/types'
import { queryOptions, useQuery, QueryClient } from '@tanstack/react-query'
import { useLoaderData } from '../../utils/utils'
import { IUserState } from '../../actions/userSlice'
// import wait from '../../constants/wait'
const singleTaskQuery = (id: string) => queryOptions({
    queryKey: ['singleTaskQuery', id],
    queryFn: async () => {
        const { data } = await customFetch.get<{ pdfDocument: iPDFDocument }>('/pdfdocument/' + id);
        return data;
    }
})
const allRelatedEditQuery = (id: string) => ({
    queryKey: ['SingleEditQuery', id],
    queryFn: async () => {
        const { data } = await customFetch.get<{ edits: iEdit[] }>('/edits/related/' + id);
        return data;
    }
})
export const loader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
    try {
        const id = params.taskId
        await queryClient.ensureQueryData(singleTaskQuery(id!))

        const editsData = queryClient.fetchQuery(allRelatedEditQuery(id!));
        const deferredData = {
            id: id!,
            Edits: editsData
        };
        return (
            defer(deferredData)
        )
    } catch (err) {
        throw err
    }
}

const fetchPdf = async () => {
    const response = await fetch('http://192.168.43.68:5000/api/v1/tasks/generate-invoice/2');
    const blob = await response.blob();
    return blob;
};
const SingleTaskPage = () => {
    const [pdfBlob, setPdfBlob] = useState<any>(null);
    type iType = Exclude<IUserState["user"], null>
    const { _id, fullname, role } = useOutletContext() as iType
    console.log("user :", { _id, fullname, role })

    useEffect(() => {
        fetchPdf().then((blob) => setPdfBlob(blob));
    }, []);
    const { id, Edits } = useLoaderData() as any;
    const { pdfDocument } = useQuery(singleTaskQuery(id!))?.data as { pdfDocument: iPDFDocument }


    return (
        <div>

            <AnimatedText text='Task' />
            <ResizablePanelGroup
                direction="horizontal"
                className="h-auto max-w-[calc(100%-1rem)] mx-auto rounded-lg border"
            >
                <ResizablePanel defaultSize={70}>
                    <div className='sticky top-14'>
                        <Heading>Document Detail {role}</Heading>
                        {pdfBlob && <SinglePdfWithReactPdf pdfFile={pdfBlob} />}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30}>
                    <div className=' border border-black max-h-screen scrollto overflow-y-auto overflow-x-hidden'>
                        <Heading className='mb-6 font-semibold text-3xl text-center uppercase text-colorPrimary'>Action Tab</Heading>
                        <Scrollable className='mb-6 gap-x-1 lg:gap-x-2 px-4 py-1'>
                            <CustomNavLink to='.'
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs flex-1 line-clamp-2 text-center flex items-center justify-center relative z-20 bg-white lg:text-sm capitalize  px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9    hover:bg-purple-600/20'
                                show
                                replace
                                end
                            >
                                Files Changes
                            </CustomNavLink>
                            {role !== "user" && <CustomNavLink to='./later'
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs flex-1 line-clamp-2 text-center flex items-center justify-center relative z-20 bg-white lg:text-sm capitalize  px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9    hover:bg-purple-600/20'
                                show
                                replace
                                end

                            >
                                Update Pdf File
                            </CustomNavLink>}
                        </Scrollable>
                        <Outlet />
                    </div>
                </ResizablePanel>


            </ResizablePanelGroup>
        </div>
    )
}

export default SingleTaskPage