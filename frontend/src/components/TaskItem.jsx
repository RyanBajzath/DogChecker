  import './TaskItem.css';
  import Button from 'react-bootstrap/Button';
  const TaskItem = (prop) => {


    return (
      <li className="list-group-item p-3" onClick={() => prop.onTaskClick(prop.task)}>
        <div className="row align-items-center">

    <div className="col-8 d-flex align-items-center gap-3">
      <span>{prop.task.title}</span>
      <span>{prop.task.time}</span>
    </div>

    <div className="col-4 d-flex justify-content-end align-items-center gap-3">
      <span>
        {prop.task.completed ? "✅" : "⭕"}
      </span>
    
      <Button  onClick={(e) => {
      e.stopPropagation();
      prop.onEditTask(prop.task);
    }} >
        edit
      </Button>

    <Button
    variant={prop.selectedDate < prop.today ? "secondary" : "outline-danger"}
    size="sm"
    disabled={prop.selectedDate < prop.today}
    onClick={(e) => {
      e.stopPropagation();
      prop.onArchiveTask(prop.task.id);
    }}
    className={prop.selectedDate < prop.today ? "opacity-50" : ""}
  >
    ×
  </Button>
    </div>

  </div>
      </li>
    )
  }

  export default TaskItem