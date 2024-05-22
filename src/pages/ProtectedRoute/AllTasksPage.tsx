import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Await, defer, useLoaderData, useSearchParams } from 'react-router-dom';
import Table from '../../components/Table.js';
import { columns } from '../../types/data.js';
import customFetch from '../../utils/customFetch.js';
import { iLogistic, logisticsResponse } from '../../utils/types.js';

import { AnimatedText } from '../../components/Animated/animated.js';
import { DatePickerWithRange } from '../../components/DatePicker/CustomDatePicker.js';
import Stats from '../../components/Stats.js';
import { Bar_Chart } from '../../components/charts/recharts.js';
import { ErrorElement } from '../../components/error/errorComponents.js';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger
} from "../../components/ui/sheet.js";
import { demoUsers } from '../../constants/demoData.js';
import { demousercolumns } from '../../Columns/demoUserColumn.js';
import Tasks from '../../components/Cards/Tasks.js';
import { Scrollable } from '../../components/Scrollable.js';
import FilterButton from '../../components/CustomFilterLink.js';
import Heading from '../../components/Heading.js';
import { Settings } from 'lucide-react';
import { Input } from '../../components/ui/input.js';
import { Button } from '../../components/ui/button.js';
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
      const { data } = await customFetch.get<{
        tasks: iLogistic[]
      }>('/tasks/all', {
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
    const { data } = await customFetch.get<any>('/tasks/stats');
    return data;
  }
}
export const loader = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  await queryClient.ensureQueryData(statsQuery)
  return defer({
    id: params.tracking_number,
    Logistics: queryClient.ensureQueryData(AllLogisticsQuery(params)),
    searchValues: { ...params }
  })
}
const RenderTable = () => {
  const { searchValues } = useLoaderData() as any

  const { defaultStats, nHits } = useQuery(statsQuery).data as any
  // console.log("this is the stats", defaultStats, nHits)
  const { tasks } = useQuery(AllLogisticsQuery(searchValues)).data as logisticsResponse
  const [searchParams] = useSearchParams()
  const Query = () => {
    return (<>
      <DatePickerWithRange onChange={e => {
        const { to, from } = e as any;
        console.log({ to, from })

      }} />
      <Button
        className='bg-colorPrimary  w-[calc(100%-1rem)] mx-auto block my-4 rounded-md'
      >Query Date</Button>

      <div className="flex items-center rounded-xl overflow-hidden placeholder:uppercase ">
        <Input placeholder='ENTER ID  '
        className='rounded-none '
        />
        <Button
        className='rounded-none'
        >Submit</Button>
      </div>

    </>)
  }

  const showTable = searchParams.get('table-view') && searchParams.get('table-view') == 'card'
  return (
    <div className='px-2'>

      <div className='lg:flex  lg:flex-row items-start gap-x-6 '>

        <div className='flex-1 flex-grow lg:w-[calc(100%-762626rem)]'>
          <Stats defaultStats={defaultStats}
            nHits={nHits} />

          {
            !showTable ? <Table columns={demousercolumns} data={demoUsers} /> :
              <div className='grid gap-x-4 gap-6  grid-cols-[repeat(auto-fit,minmax(min(20rem,calc(100%-2rem)),1fr))]'>
                {Array.from({ length: 100 }, (arr, idx) => {
                  return <Tasks key={idx} />
                })}

              </div>
          }
        </div>
        <div className='lg:w-[20rem]  flex-none sticky top-16'>
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
      <Heading className='text-2xl sticky top-14 font-semibold my-6 pl-6 lg:text-4xl'>TASKS</Heading>
      <React.Suspense
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