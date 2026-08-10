import React from 'react'

import {useState} from 'react'

const TaskItem = (prop) => {

  return (
    <>
    <h1>task</h1>
    <li className="task-item">
      <span>{prop.task.title}</span>
      <span>{prop.task.time}</span>
      <span>{prop.task.icon}</span>
      <span>{prop.task.completed? 'Completed' : 'Pending'}</span>
    </li>
    </>
  )
}

export default TaskItem
