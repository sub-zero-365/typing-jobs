import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Await, Link, defer, useLoaderData, useSearchParams } from 'react-router-dom';
import Table from '../../components/Table.js';
import { allPdfDocuments } from '../../types/data.js';
import customFetch from '../../utils/customFetch.js';
import { iEdit, iPDFDocument } from '../../utils/types.js';

import { z } from "zod";
import Tasks from '../../components/Cards/Tasks.js';
import { DatePickerWithRange } from '../../components/DatePicker/CustomDatePicker.js';
import FindMyId from '../../components/FindMyId.js';
import Stats from '../../components/Stats.js';
import CustomSelect from '../../components/dropdowns/CustomSelect.js';
import { ErrorElement } from '../../components/error/errorComponents.js';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Button } from '../../components/ui/button.js';
import NavigationArrow from './NavigationArrow.js';
import { Car, PersonStanding, User } from 'lucide-react';
const taskSchema = z.object({
  id: z.number({ invalid_type_error: "please enter a number " }).min(10, "min number show be 10 characters")
})
type validationSchema = z.infer<typeof taskSchema>;
// type FormData = z.infer<typeof validation> & {
//   from?: string
// }

type Params = {
  search?: string,
  sort?: "asc" | "desc",
  page?: number,
  status?: "pending" | "approved" | "rejected"

}
const AllLogisticsQuery = (params: Params) => {

  const { search,
    sort, page, status } = params;
  return {
    queryKey: [
      'tasks',
      {
        search: search ?? '',
        status: status ?? 'all',
        sort: sort ?? 'asc',
        page: page ?? 1,
      }
    ],
    queryFn: async () => {
      // await wait(10000)
      const { data } = await customFetch.get<{ pdfDocuments: iPDFDocument[], edits: iEdit[] }>('/pdfdocument', {
        params,
      });
      console.group(data, "data")
      return data;
    },
    keepPreviousData: true,
  };
};
const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const { data } = await customFetch.get<{ pdfDocuments: iPDFDocument[], edits: iEdit[] }>('/pdfdocument/stats');
    return data;
  }
}
export const loader = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const x = await queryClient.ensureQueryData(statsQuery)
  console.log(x, "x")
  return defer({
    id: params.tracking_number,
    Logistics: queryClient.ensureQueryData(AllLogisticsQuery(params)),
    searchValues: { ...params }
  })
}
const RenderTable = () => {
  const { searchValues } = useLoaderData() as any
  const { defaultStats, totalPdfDocs } = useQuery(statsQuery).data as any
  const { pdfDocuments, edits } = useQuery(AllLogisticsQuery(searchValues)).data as { pdfDocuments: iPDFDocument[], edits: iEdit[] }
  const [searchParams] = useSearchParams()
  const Query = () => {
    return (<>
      <DatePickerWithRange />
      <Button
        className='bg-colorPrimary  w-[calc(100%-1rem)] mx-auto block my-4 rounded-md'
      >Query Date</Button>
      <FindMyId searchPath={`/task/`} />
      <p className='italic text-sm capitalize pt-1'>enter document id to get document</p>
      <div className='mb-6' />
    </>)
  }

  const showTable = searchParams.get('table-view') && searchParams.get('table-view') == 'card'
  const stats = [
    {
        title: 'Total Documents',
        count: totalPdfDocs || 0,
        icon: User,
        className: 'bg-green-900 shadow-lg shadow-colorPrimary rounded-xl text-white',
    },
    {
        title: 'uploaded',
        count: defaultStats["uploaded"] || 0,
        icon: User,
        className: 'bg-blue-200 shadow-lg shadow-colorPrimary rounded-xl',
    },
    {
        title: 'in-progress',
        count: defaultStats["in-progress"] || 0,
        icon: PersonStanding,
        className: 'bg-orange-200 shadow-lg shadow-colorPrimary rounded-xl',
    },
    {
        title: 'completed',
        count: defaultStats["completed"] || 0,
        icon: Car,
        className: 'bg-green-200 shadow-lg shadow-colorPrimary rounded-xl',
    },
];
  return (
    <div className='px-2'>

      <div className='lg:flex  lg:flex-row items-start gap-x-6 '>

        <div className='flex-1 flex-grow lg:w-[calc(100%-762626rem)]'>
         
          <Stats stats={stats}
            nHits={0} />
          <CustomSelect searchKey='table-view' values={["card", "table"]} defaultValue='view' className='mb-6 ml-auto' />
          {
            !showTable ? <Table columns={allPdfDocuments} data={pdfDocuments} /> :
              <div className='grid gap-x-4 gap-6  grid-cols-[repeat(auto-fit,minmax(min(20rem,calc(100%-2rem)),1fr))]'>
                {Array.from({ length: 100 }, (arr, idx) => {
                  return <Tasks key={idx} />
                })}

              </div>
          }
        </div>
        <div className='lg:w-[20rem] hidden md:block  flex-none sticky top-16'>
          <Query />
        </div>
      </div>

    </div>
  )
}

const AllLogisticsPage = () => {
  const { Logistics } = useLoaderData() as any
  return (
    <>
      <NavigationArrow />
      <Breadcrumb className='py-5 pl-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to={"/"}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-colorPrimary text-xl lg:text-3xl">All Documents</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>  <React.Suspense
        fallback={<p>Loading your package please wait a little...</p>}
      >
        <Await
          resolve={Logistics}
          errorElement={
            <ErrorElement />
          }
        >
          <RenderTable />
        </Await>
      </React.Suspense>
    </>
  )
}

export default AllLogisticsPage