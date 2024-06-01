import React, { useEffect, useState } from 'react'
import { Link, LoaderFunctionArgs, Outlet, defer, useNavigate, useOutlet, useOutletContext } from 'react-router-dom'
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
import { useInfiniteQuery } from '@tanstack/react-query';
// import wait from '../../constants/wait'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../components/ui/breadcrumb"
import { Badge } from '../../components/ui/badge'
import { useMediaQuery } from 'react-responsive'
const singleTaskQuery = (id: string) => queryOptions({
    queryKey: ['singleTaskQuery', id],
    queryFn: async () => {
        const { data } = await customFetch.get<{ pdfDocument: iPDFDocument }>('/pdfdocument/' + id);
        return data;
    }
})

export const allRelatedEditQuery = (id: string, query = {} as any) => ({
    queryKey: ['SingleEditQuery', id, {
        limit: query.limit ?? 10,
        page: query.page ?? 1,
    }],
    queryFn: async () => {
        const { data } = await customFetch.get<{ edits: iEdit[] }>('/edits/related/' + id, {

            params: {
                ...query
            }
        });
        return data;
    }
})
export const loader = (queryClient: QueryClient) => async ({ params, request }: LoaderFunctionArgs) => {
    const querys = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        const id = params.taskId
        await queryClient.ensureQueryData(singleTaskQuery(id!))

        const editsData = queryClient.fetchQuery(allRelatedEditQuery(id!, querys));
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
    const { userId, role } = useOutletContext() as iType


    useEffect(() => {
        fetchPdf().then((blob) => setPdfBlob(blob));
    }, []);
    const { id, Edits } = useLoaderData() as any;
    const { pdfDocument } = useQuery(singleTaskQuery(id!))?.data as { pdfDocument: iPDFDocument }
    const navigate = useNavigate()
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

    return (
        <div>
            <Breadcrumb className='py-5 pl-4'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <span onClick={() => navigate(-1)}>Back</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={"/logistics"}>All Documents</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-colorPrimary text-xl lg:text-2xl">Document</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-auto max-w-[calc(100%-1rem)] mx-auto rounded-lg border"
            >
                <ResizablePanel defaultSize={isDesktop ? 70 : 0}>
                    <div className='sticky top-14'>
                        <Heading className='mb-6 font-semibold text-xl text-center uppercase text-colorPrimary'>Document <span className='text-xs'>{id}</span></Heading>

                        {pdfBlob && <SinglePdfWithReactPdf pdfFile={pdfBlob} />}
                    </div>
                </ResizablePanel>
                {isDesktop && <ResizableHandle withHandle />}
                <ResizablePanel defaultSize={isDesktop ? 30 : 100}>
                    <div className='  overflow-x-hidden'>
                        <Heading className='mb-6 font-semibold text-xl text-center uppercase text-colorPrimary'>Action Tab</Heading>
                        <Scrollable className='mb-6 gap-x-1 lg:gap-x-2 px-1 lg:px-4 '>
                            <CustomNavLink to='./view-pdf'
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs lg:hidden flex-1 line-clamp-2 text-center flex items-center justify-center relative z-20 bg-white  capitalize  px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9    hover:bg-purple-600/20'
                                show
                                replace
                                end
                            >
                              Pdf Document
                            </CustomNavLink>
                            <CustomNavLink to='.'
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs flex-1 line-clamp-2 text-center flex items-center justify-center relative z-20 bg-white  capitalize  px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9    hover:bg-purple-600/20'
                                show
                                replace
                                end
                            >
                                Files Changes
                            </CustomNavLink>
                            {role !== "user" && <CustomNavLink to='./later'
                                selectedClassName='text-green-800   text-white bg-colorPrimary'
                                animateClassName="inset-0 animate-pulse size-full shadow-md  right-0  bg-purple-600/60  rounded-full "
                                className='bg-transparent text-xs flex-1 line-clamp-2 text-center flex items-center justify-center relative z-20 bg-white  capitalize  px-4 shadow text-medium rounded-full  shadow-colorPrimary mb-0.5 h-9    hover:bg-purple-600/20'
                                show
                                replace
                                end

                            >
                                Update Pdf File
                            </CustomNavLink>}
                        </Scrollable>
                        <Outlet />
                        <div className='pb-6'>
                            <Heading className='mb-6 font-semibold text-xl text-center uppercase text-colorPrimary py-4'>All Contributors 😘</Heading>
                            <Scrollable direction='column' className='gap-y-1 gap-x-2 justify-center-'>
                                {pdfDocument?.employeeNames?.map((name, idx) => {
                                    if (name.userId == userId) return <Badge key={idx} className='py-2.5 px-3 bg-colorPrimary/60'>Edited BY you</Badge>
                                    return (<Link to={`/user/${userId}`} ><Badge key={idx} className='py-2.5 px-3 bg-colorPrimary'>{name?.fullname}</Badge></Link>)
                                })}
                            </Scrollable>
                        </div>
                    </div>
                </ResizablePanel>


            </ResizablePanelGroup>
        </div>
    )
}

export default SingleTaskPage