import { useState } from 'react'
import { tasks } from './data/data.js'
import TaskList from './components/TaskList.jsx'

function App() {
 

  return (
    <>
   
        
          <TaskList tasks={tasks} />
        
      
    </>
  )
}

export default App
