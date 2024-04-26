import React from 'react'
import { TimeLine, TimeLineContainer } from '../../components/ui/TimeLine'

const EditedTaskHistory = () => {
  return (
    <div>
      <TimeLineContainer>
        <TimeLine />
        <TimeLine />
        <TimeLine />
      </TimeLineContainer>
    </div>
  )
}

export default EditedTaskHistory