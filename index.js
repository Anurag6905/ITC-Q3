const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// Get all notes
app.get('/api/notes', (req, res) => {
  db.all('SELECT * FROM notes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  db.run(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, title, content });
    }
  );
});

// Delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM notes WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Note deleted', deleted: this.changes });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
