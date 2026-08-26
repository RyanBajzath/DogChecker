const supabase = require('./supabase');
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


app.get('/tasks', async (req, res) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});
app.patch('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);

  const { data, error } = await supabase
    .from('tasks')
    .update({ completed: req.body.completed })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
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