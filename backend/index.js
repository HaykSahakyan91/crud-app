const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding task:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle completed state
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Toggling task with id: ${id}`);

    const taskRes = await pool.query('SELECT "completed" FROM tasks WHERE id = $1', [id]);
    if (taskRes.rows.length === 0) {
      console.warn(`Task with id ${id} not found`);
      return res.status(404).json({ error: 'Task not found' });
    }

    const currentCompleted = taskRes.rows[0].completed;

    const updatedRes = await pool.query(
      'UPDATE tasks SET "completed" = $1 WHERE id = $2 RETURNING *',
      [!currentCompleted, id]
    );

    res.json(updatedRes.rows[0]);
  } catch (err) {
    console.error('Error toggling task:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log('Backend started. Current environment:');
console.log(process.env);
