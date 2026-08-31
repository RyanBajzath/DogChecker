import './TaskItem.css';
import Button from 'react-bootstrap/Button';
const TaskItem = (prop) => {


  return (
    <li className="list-group-item p-3" onClick={() => prop.onTaskClick(prop.task)}>
      <div className="row align-items-center">
  <span className="col-6">
    {prop.task.icon} {prop.task.title}
  </span>

  <span className="col-2">
    {prop.task.time}
  </span>

  <span className="col-1">
    <Button
      variant="outline-danger"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        prop.onArchiveTask(prop.task.id);
      }}
    >
      ×
    </Button>
  </span>

  <span className="col-3 text-end">
    {prop.task.completed ? "✅" : "⭕"}
  </span>
</div>
    </li>
  )
}

export default TaskItem