import React, { Suspense, useState } from 'react'
// import wait from '../../constants/wait.js'
import ChartsOptions, { FilterButtonPosition } from '@/components/charts/chartOptions'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Link, useLoaderData } from 'react-router-dom'
import Heading from '../../components/Heading.js'
import SearchComponent from '../../components/Search'
import Stats, { stats } from '../../components/Stats'
import DataTable from '../../components/Table.js'
import { data } from '@/components/charts/react-chartjs-2'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../components/ui/breadcrumb"
import { Button } from '../../components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "../../components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "../../components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { useFilter } from '../../hooks/CustomLinkFilterHook.js'
import { allUsersColumns } from '../../types/data.js'
import customFetch from '../../utils/customFetch.js'
import debounce from '../../utils/debounce.js'
import { user } from '../../utils/types.js'
import { Register } from '../Auth/index.js'
interface Props {
    search?: string,
    page?: number,
    limit?: number,
    role?: string
}
const allUserQuery = (params: Props) => {
    const {
        search,
        page, limit, role
    } = params
    return (
        {
            queryFn: async () => {
                const { data } = await customFetch.get<{
                    users: user[],
                    numberOfPage: number,
                    limit: number,
                    currentPage: number
                }>('/users/allusers', {
                    params
                })
                return data
            }, queryKey: ["users", {
                search: search ?? "",
                page: page ?? 1,
                limit: limit ?? null,
                role: role ?? ''
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
    const [search, setSearch] = useState<string>('')
    const { users, numberOfPage, limit, currentPage } = useQuery(allUserQuery(searchValues)).data!
    const { handleFilterChange, searchQuery } = useFilter()
    const checkboxes = [
        ...Array.from({ length: 10 }, (_arr, idx) => ({
            name: "admin",
            element: <div className="flex items-center space-x-2 justify-start">
                <RadioGroupItem value={`${idx + 1}`} id={`${idx + 1}`}
                />
                <label htmlFor={`${idx + 1}`}>limit {idx + 1}</label>
            </div>
        }))
    ]
    const debouncedHandleChange = debounce((e: string) => handleFilterChange({ key: "limit", value: e }), 500);

    return (
        <>
            <Breadcrumb className='py-5 pl-4'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={"/"}>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-colorPrimary text-xl lg:text-3xl">Users Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* {JSON.stringify(users)} */}
            <Dialog>
                {/* <Heading className='text-center font-semibold lg:text-3xl my-6'>USERS DETAILS </Heading> */}

                <DialogTrigger asChild className='ml-auto block mb-2 '>
                    <Button variant="outline" className='bg-colorPrimary text-white rounded-full h-12 mr-2 lg:hidden'>Create Employee Account</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[min(425px,calc(100%-2rem))] mx-auto">
                    <div className='max-w-sm w-full px-4'>
                        <Suspense fallback={<div>loading ...</div>}

                        >
                            <Register />
                        </Suspense>

                    </div>
                </DialogContent>
            </Dialog>

            <div className='px-4'>
                <Stats stats={stats}
                    nHits={444} />
            </div>
            <div className=" lg:flex- gap-x-4 px-4 items-end hidden ">
                <div className='lg:w-[calc(100%-25rem)]'>
                    <Heading className='text-center font-semibold'>USERS STATISTICS </Heading>
                    <ChartsOptions btn_position="bottom" chartData={data} />
                    <FilterButtonPosition />
                </div>
                <div className='w-[25rem]  flex-none hidden lg:block sticky top-14'>
                    <Suspense fallback={<div>loading ...</div>}
                    >
                        <Heading>Create Employee Account</Heading>

                        <Register />
                    </Suspense>
                </div>
            </div>
            <SearchComponent />
            {/* dont know how to removethis error cause it not an error */}
            {/* <CustomSelect className='w-fit rounded-sm border-2 border-colorPrimary text-sm !ring-0'  defaultValue='role of users' searchKey="role" values={["admin", "user", "employee"]} /> */}
            <div className='ml-auto mb-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='h-fit text-xs ml-auto flex items-center justify-center gap-x-3'><Plus size={15} /> Limits</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44">
                        <RadioGroup defaultValue={searchQuery.get("limit") ?? ''} onValueChange={debouncedHandleChange}>
                            {checkboxes.map(checkbox => checkbox.name.includes(search.trim()) && <> {checkbox.element} </>)}
                        </RadioGroup>
                        <Button className='w-full text-xs' onClick={() => handleFilterChange({ key: "limit" })}>Clear Filter</Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <DataTable columns={allUsersColumns} data={users} paginationData={{ numberOfPage, limit, currentPage }} />

        </>
    )
}
User.displayName = "userPage"
export default User