// import { Table } from 'lucide-react'
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Await, defer, useAsyncError, useLoaderData } from 'react-router-dom';
import Search from '../../components/Search.js';
import Table from '../../components/Table.js';
import { columns } from '../../types/data.js';
import customFetch from '../../utils/customFetch.js';
import { logisticsResponse } from '../../utils/types.js';
// import { useLoaderData } from '../../utils/utils.js';
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
      search ?? '',
      status ?? 'all',
      sort ?? 'asc',
      page ?? 1,
    ],
    queryFn: async () => {
      // await wait(10000)
      const { data } = await customFetch.get('/logistics/all', {
        params,
      });
      return data;
    },
  };
};
export const loader = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  return defer({
    id: params.tracking_number,
    Logistics: queryClient.ensureQueryData(AllLogisticsQuery(params))
  })
}
const RenderTable = () => {
  // const id = useParams().id
  const params = Object.fromEntries([
    ...new URL(window.location.href).searchParams.entries(),
  ]);
  const { logistics } = useQuery(AllLogisticsQuery(params)).data as logisticsResponse
  return (
    <div>
      {/* {JSON.stringify(logistics)} */}
      <Search />
      <Table columns={columns} data={logistics} />
    </div>
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
    <div>AllLogisticsPage
      <React.Suspense
        fallback={<p>Loading your package please wait a little...</p>}
      >
        <Await
          resolve={Logistics}
          errorElement={
            <ErrorGettingLogistic />
          }
        >
          <RenderTable />
        </Await>
      </React.Suspense>
    </div>
  )
}

export default AllLogisticsPage