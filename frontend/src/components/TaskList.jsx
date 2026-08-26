import { useEffect, useState } from 'react';
import TaskItem from './TaskItem.jsx';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', time: '', icon: '', completed: false });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch('https://dogchecker.onrender.com/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleTaskClick = async (task) => {
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

  const handleAddTask = async () => {
    const response = await fetch('https://dogchecker.onrender.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    const addedTask = await response.json();
    setTasks([...tasks, addedTask]);
    setNewTask({ title: '', time: '', icon: '', completed: false });
    handleClose();
  }



  return (
    <>
      <h1>Dog Care Tasks</h1>

      <ul className="container list-group">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onTaskClick={handleTaskClick} />
        ))}
        <li className="list-group-item justify-content-center d-flex align-items-center" >
          <Button variant="primary" onClick={handleShow}>
            +
          </Button>
        </li>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body><Form>
            <Form.Group>
              <Form.Label>Task name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              />
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddTask}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </ul>

    </>
  );
};

export default TaskList;  