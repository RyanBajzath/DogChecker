import { useEffect, useState } from 'react';
import TaskItem from './TaskItem.jsx';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [patchTask, setPatchTask] = useState(null);

  useEffect(() => {
    fetch('https://dogchecker.onrender.com/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleTaskClick = async(task) => {
    const response = await fetch(`https://dogchecker.onrender.com/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !task.completed }),
    });

    
    const updatedTask = await response.json();
    setTasks(currentTasks =>
      currentTasks.map(tasks =>
        tasks.id === updatedTask.id ? updatedTask : tasks
      )
    )



  }

  return (
    <>
      <h1>Dog Care Tasks</h1>

      <ul className="container list-group">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onTaskClick={handleTaskClick} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;  