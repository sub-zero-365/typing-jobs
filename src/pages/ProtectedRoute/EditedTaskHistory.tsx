import React from 'react'
import { TimeLine, TimeLineContainer } from '../../components/ui/TimeLine'
import { useRouteLoaderData } from 'react-router-dom'

const EditedTaskHistory = () => {
  const x = useRouteLoaderData("maintaskRouter")
  console.log("router data",x)
  const edits = []
  return (
    <div>
      <TimeLineContainer>
        {edits?.map((c, idx) => <TimeLine key={idx} />)}
      </TimeLineContainer>
    </div>
  )
}

export default EditedTaskHistory