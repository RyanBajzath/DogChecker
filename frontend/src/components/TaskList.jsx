import react from 'react';
import TaskItem from './TaskItem.jsx';
import { useState } from 'react';


const TaskList = (props) => {
  const [tasks, setTasks] = useState(props.tasks);

  return (
    
    <ul className="container list-group mt-5" style={{ maxWidth: '600px' }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TaskList
