import react from 'react';
import TaskItem from './TaskItem.jsx';
import { useState } from 'react';


const TaskList = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  <h1>Dog Care Tasks</h1>
  return (
    
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TaskList
