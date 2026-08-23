import { useEffect, useState } from 'react';
import TaskItem from './TaskItem.jsx';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://dogchecker.onrender.com/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <>
      <h1>Dog Care Tasks</h1>

      <ul className="container list-group">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;  