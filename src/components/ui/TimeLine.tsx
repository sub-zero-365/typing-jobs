import React from 'react'
import { iEdit } from '../../utils/types'
import { Button } from './button'
import dayjs from 'dayjs'
import { Scrollable } from '../Scrollable'
import { Badge } from "../../components/ui/badge"
import Heading from '../Heading'
import { Separator } from './separator'
import { useOutletContext } from 'react-router-dom'
import { IUserState } from '../../actions/userSlice'
import useGetLoginUser from '../../utils/getLogInUser'
export const TimeLine = ({ employee, newFile, editSummary, previousFile, createdAt, pdfId }: iEdit) => {
    const user = useGetLoginUser();

    return (
        <li className="mb-10 ms-6 group/sidebar">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
            </span>
            <Heading className="flex items-center mb-1 text-lg sidebar font-semibold text-colorPrimary -translate-y-2.5 dark:text-white">{newFile}</Heading>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Edited on the {dayjs(createdAt).format("	dddd, MMMM D, YYYY h:mm A")}</time>

            <Badge className="mb-4  group-hover/sidebar:opacity-75 font-medium text-sm text-gray-500 mt-6 dark:text-gray-400 rounded-sm py-5 w-full relative" variant={"secondary"}>
                <Heading className='font-black mb-2 absolute -top-4 group-hover/sidebar:-top-5 transition-all duration-300 bg-colorPrimary rounded-md left-2 text-white text-xs py-1.5 px-2'>Description </Heading>

                {editSummary}</Badge>
            <Scrollable className='flex flex-row items-center mb-1 w-full gap-y-2 break-keep  ![--border-color:red]'><p className='font-black  text-xs inline-flex break-keep'>Edited-By</p><Badge>{employee.userId == String(user?.userId) ? "You" : employee.fullname}</Badge></Scrollable>

            <Scrollable>
                <Button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"><svg className="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlnsNaclassName="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>
                    Download pdf</Button>
                <Button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">preview pdf</Button>
            </Scrollable>
            <Separator className='h-[1px] bg-colorPrimary/15 rounded-sm mt-1.5' />
        </li >
    )
}
export const TimeLineContainer = ({ children }: { children: React.ReactNode }) => {
    return (<ol className="relative border-s border-gray-200 dark:border-gray-700">
        {children}
    </ol>)
}
