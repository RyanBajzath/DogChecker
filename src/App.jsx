import { useState } from 'react'
import { tasks } from './data/data.js'
import TaskList from './components/TaskList.jsx'

function App() {
 

  return (
    <>
      <div>
        <h1>Dog Care Tasks</h1>
        <TaskList tasks={tasks} />
      </div>
    </>
  )
}

export default App
