const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./notes.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = db;
