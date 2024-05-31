import React from 'react'
import { TimeLine, TimeLineContainer } from '../../components/ui/TimeLine'
import { Await, useAsyncValue, useRouteLoaderData } from 'react-router-dom'
import { ErrorElement } from '../../components/error/errorComponents'
import { iEdit } from '../../utils/types'
import { Button } from '../../components/ui/button'
import Heading from '../../components/Heading'
import { Separator } from '../../components/ui/separator'

const RenderHistory = () => {
  const { edits } = useAsyncValue() as { edits: iEdit[] }
  return (<div className=''>
    <Heading className='text-pretty text-lg lg:text-xl  text-gray-700 flex items-end px-1.5'>Total Number of Edits <span className='size-6 ml-4 inline-flex justify-center items-center text-xs font-bold  rounded-full bg-colorPrimary text-white '>{edits?.length}</span></Heading>
    <Separator className='h-[1.5px] bg-colorPrimary/95 mb-6 rounded-none mt-1.5 mx-1.5' />
    <div className='px-4'>

      <TimeLineContainer>
        {edits?.map((edit, idx) => <TimeLine key={idx} {...edit} />)}
      </TimeLineContainer>
    </div>
    <Button>load more</Button>
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