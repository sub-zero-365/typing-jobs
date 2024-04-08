// import { Table } from 'lucide-react'
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Await, defer, useAsyncError, useLoaderData } from 'react-router-dom';
import Table from '../../components/Table.js';
import { columns } from '../../types/data.js';
import customFetch from '../../utils/customFetch.js';
import { logisticsResponse } from '../../utils/types.js';

import { AnimatedText } from '../../components/Animated/animated.js';
import { DatePickerWithRange } from '../../components/DatePicker/CustomDatePicker.js';
import Stats from '../../components/Stats.js';
import { Bar_Chart } from '../../components/charts/recharts.js';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger
} from "../../components/ui/sheet";
import { ErrorElement } from '../../components/error/errorComponents.js';
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
      'logistics',
      {
        search: search ?? '',
        status: status ?? 'all',
        sort: sort ?? 'asc',
        page: page ?? 1,
      }
    ],
    queryFn: async () => {
      // await wait(10000)
      const { data } = await customFetch.get('/logistics/all', {
        params,
      });
      return data;
    },
    keepPreviousData: true,
  };
};
const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const { data } = await customFetch.get<any>('/logistics/stats');
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

  // const params = Object.fromEntries([
  //   ...new URL(window.location.href).searchParams.entries(),
  // ]);
  const { defaultStats, nHits } = useQuery(statsQuery).data as any
  console.log("this is the stats", defaultStats, nHits)
  const { logistics } = useQuery(AllLogisticsQuery(searchValues)).data as logisticsResponse
  return (
    <>
      <SheetTrigger>Open</SheetTrigger>
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
      <Bar_Chart />

      <Table columns={columns} data={logistics} />
    </>
  )
}
const ErrorGettingLogistic = () => {
  const err = useAsyncError() as any;
  const erMsg = err?.response?.data?.msg || err?.response?.data || "something went wrong try agai later"

  return (
    <div className=''>
      <p className='error mb-10 p-5 '>Error:!{erMsg}</p>
    </div>
  )
}
const AllLogisticsPage = () => {
  const { Logistics } = useLoaderData() as any
  return (
    <Sheet >
      <AnimatedText
        text='All Logistics'
        className='text-start '
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