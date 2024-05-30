import React from 'react'
import { TimeLine, TimeLineContainer } from '../../components/ui/TimeLine'
import { Await, useAsyncValue, useRouteLoaderData } from 'react-router-dom'
import { ErrorElement } from '../../components/error/errorComponents'
import { iEdit } from '../../utils/types'
import { Button } from '../../components/ui/button'
import Heading from '../../components/Heading'

const RenderHistory = () => {
  const { edits } = useAsyncValue() as { edits: iEdit[] }
  return (<div className='px-6'>
    <Heading className='text-pretty text-xl mb-4 text-gray-700 flex items-end'>Total Number of Edits <span className='size-8 ml-4 inline-flex justify-center items-center text-sm font-bold  rounded-full bg-colorPrimary text-white '>{edits?.length}</span></Heading>
    <TimeLineContainer>
      {edits?.map((edit, idx) => <TimeLine key={idx} {...edit}/>)}
    </TimeLineContainer>
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