const supabase = require('./supabase');
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


app.get('/tasks', async (req, res) => {


  const selectedDate =
  req.query.date ||
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei'
  }).format(new Date());

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei'
  }).format(new Date());

  if (selectedDate > today) {
    return res.status(400).json({ error: 'Selected date cannot be in the future.' });
  }

  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('*')
    .lte(`created_at`, selectedDate)
    .or(`archived_at.is.null,archived_at.gt.${selectedDate}`)
    .order('id', { ascending: true });

  if (tasksError) {
    return res.status(500).json({ error: tasksError.message });
  }

  const { data: logs, error: logsError } = await supabase
    .from('task_logs')
    .select('*')
   .eq('date', selectedDate);

  if (logsError) {
    return res.status(500).json({ error: logsError.message });
  }

  const tasksWithStatus = [];

  for (const task of tasks) {
    let completed = false;

    for (const log of logs) {
      if (log.task_id === task.id) {
        completed = log.completed;
        break;
      }
    }

    tasksWithStatus.push({
      ...task,
      completed: completed
    });
  }

  res.json(tasksWithStatus);
});
app.patch('/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei'
  }).format(new Date());

  const { data: existingLog, error: findError } = await supabase
    .from('task_logs')
    .select('*')
    .eq('task_id', taskId)
    .eq('date', today)
    .maybeSingle();

  if (findError) {
    return res.status(500).json({ error: findError.message });
  }

  let data;
  let error;

  if (existingLog) {
    ({ data, error } = await supabase
      .from('task_logs')
      .update({ completed: req.body.completed })
      .eq('id', existingLog.id)
      .select()
      .single());
  } else {
    ({ data, error } = await supabase
      .from('task_logs')
      .insert([{
        task_id: taskId,
        date: today,
        completed: req.body.completed
      }])
      .select()
      .single());
  }

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({
    id: taskId,
    completed: data.completed
  });
});
app.post('/tasks', async (req, res) => {
  const { title, time, icon, completed } = req.body;

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, time, icon, completed }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});