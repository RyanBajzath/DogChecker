import './TaskItem.css';
const TaskItem = (prop) => {


  return (
<li className="list-group-item p-3" onClick={() => prop.onTaskClick(prop.task)}>
  <div className="row align-items-center">
    <span className="col-7">{prop.task.icon} {prop.task.title}</span>
    <span className="col-2">{prop.task.time}</span>
    <span className="col-3 text-end">
      {prop.task.completed ? "✅" : "⭕"}
    </span>
  </div>
</li>
  )
}

export default TaskItem