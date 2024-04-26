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
  console.log("this is the stats", defaultStats, nHits)
  const { tasks } = useQuery(AllLogisticsQuery(searchValues)).data as logisticsResponse
  const [searchParams] = useSearchParams()
  const showTable = searchParams.get('table-view') && searchParams.get('table-view') == 'card'
  return (
    <>
      <SheetTrigger className='fixed size-10 flex mr-4 items-center justify-center p-4 bg-slate-500  rounded-sm shadow-sm top-1/2 z-30 left-[min(calc(80rem-3rem),calc(100%-2.5rem))] translate-y-1/2'>
      
      <Settings size={20}  className='flex-none'/>
      
      </SheetTrigger>
      <SheetContent
        className='w-[min(25rem,calc(100%-4rem))] overflow-y-auto right-[calc(calc(100%-min(100%,80rem))/2)] items-start'
        sheetOverlayClassName="w-full max-w-7xl z-[12]  -translate-x-1/2 left-1/2 " >
        <SheetHeader>
          {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
          <SheetDescription>

          </SheetDescription>
        </SheetHeader>
        <DatePickerWithRange />
        <Bar_Chart />

      </SheetContent>



      <Stats defaultStats={defaultStats}
        nHits={nHits} />
      <Heading className='text-3xl mb-6  font-black'>
        recent created task
      </Heading>
      <Scrollable

      >
        <FilterButton filterType='table-view'>
          table
        </FilterButton>
        <FilterButton filterType='table-view'
          value={"card"}
        >
          card
        </FilterButton>
      </Scrollable>
      {
        !showTable ? <Table columns={demousercolumns} data={demoUsers} /> :
          <div className='grid gap-x-4 gap-6  grid-cols-[repeat(auto-fit,minmax(min(20rem,calc(100%-2rem)),1fr))]'>
            {Array.from({ length: 100 }, (arr, idx) => {
              return <Tasks key={idx}/>
            })}

          </div>
      }

    </>
  )
}

const AllLogisticsPage = () => {
  const { Logistics } = useLoaderData() as any
  return (
    <Sheet >
      <AnimatedText
        text='Tasks'
        className='text-center lg:text-start '
      />
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
    </Sheet>
  )
}

export default AllLogisticsPage