  import { useEffect, useState } from 'react';
  import TaskItem from './TaskItem.jsx';

  import Button from 'react-bootstrap/Button';
  import Modal from 'react-bootstrap/Modal';
  import Form from 'react-bootstrap/Form';


  const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', time: '', icon: '', completed: false });

    const [show, setShow] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

useEffect(() => {
  fetch(`https://dogchecker.onrender.com/tasks?date=${selectedDate}`)
    .then(async response => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data;
    })
    .then(data => setTasks(data))
    .catch(error => {
      console.log(error.message);
      setTasks([]);
    });
}, [selectedDate]);;

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
        
          tasks.id === updatedTask.id
            ? { ...tasks, completed: updatedTask.completed }
            : tasks
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

    const changeDate = (days) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);

    setSelectedDate(date.toISOString().split('T')[0]);
  };


    return (
      <>
        <h1>Dog Care Tasks</h1>
        <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
    <Button onClick={() => changeDate(-1)}>
      ←
    </Button>

    <span>{selectedDate}</span>

    <Button onClick={() => changeDate(1)}>
      →
    </Button>
  </div>

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