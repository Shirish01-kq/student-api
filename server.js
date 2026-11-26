require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Student API is running');
});

// CREATE: add a student
app.post('/students', async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO students (name, email, course) VALUES (?, ?, ?)',
      [name, email, course]
    );
    res.status(201).json({ id: result.insertId, name, email, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: get all students
app.get('/students', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE: get a single student by id
app.get('/students/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM students WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: edit a student
app.put('/students/:id', async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const [result] = await pool.execute(
      'UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?',
      [name, email, course, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: remove a student
app.delete('/students/:id', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM students WHERE id = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});