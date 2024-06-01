import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TimeLine, TimeLineContainer } from '../../components/ui/TimeLine'
import { Await, useAsyncValue, useOutletContext, useParams, useRouteLoaderData } from 'react-router-dom'
import { ErrorElement } from '../../components/error/errorComponents'
import { iEdit } from '../../utils/types'
import { Button } from '../../components/ui/button'
import Heading from '../../components/Heading'
import { Separator } from '../../components/ui/separator'
import { useInfiniteQuery } from '@tanstack/react-query'
import { allRelatedEditQuery } from './SingleTaskPage'
import { useFilter } from '../../hooks/CustomLinkFilterHook'

const RenderHistory = () => {
  const { edits,
    totalPages,
    currentPage,nHits } = useAsyncValue() as {
      edits: iEdit[], currentPage: number,
      totalEdits: number,
      totalPages: number,
      nHits:number
    }
  const { handleFilterChange } = useFilter()


  const [_edits, _setEdits] = useState<iEdit[]>([]);
  useEffect(() => {
    if (currentPage == 1) return _setEdits([...edits])
    _setEdits(prevEdits => [...prevEdits, ...edits])
  }, [currentPage, edits]);
  useEffect(() => {
    handleFilterChange({ key: "page" })
  }, [])


  return (<div className=''>
    <Heading className='text-pretty text-lg lg:text-xl  text-gray-700 flex items-end px-1.5'>Total Number of Edits <span className='size-6 ml-4 inline-flex justify-center items-center text-xs font-bold  rounded-full bg-colorPrimary text-white '>{nHits}</span></Heading>
    <Separator className='h-[1.5px] bg-colorPrimary/95 mb-6 rounded-none mt-1.5 mx-1.5' />
    <div className='px-4'>
      <TimeLineContainer>
        {_edits?.map((edit, idx) => <TimeLine key={idx} {...edit} />)}
      </TimeLineContainer>
    </div>
    <Button
      disabled={currentPage >= totalPages}
      className='rounded-xl text-xs'
      onClick={() => {
        handleFilterChange({ key: "page", value: `${currentPage + 1}` })
      }}
    >load more {currentPage}/{totalPages}</Button>
  </div>)
}


const EditedTaskHistory = () => {
  const { Edits } = useRouteLoaderData("maintaskRouter") as any
  console.log("edits", Edits)
  return (
    <React.Suspense
      fallback={<p>Loading your package please wait a little...</p>}
    >
      <Await
        resolve={Edits}
        errorElement={
          <ErrorElement />
        }
      >
        <RenderHistory />
      </Await>

    </React.Suspense>
  )
}

export default EditedTaskHistory