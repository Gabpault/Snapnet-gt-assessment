const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password123',
  database: 'snapnet_test'
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected!");
});
// API endpoint to get all users

// CRUD routes
app.post('/add-tasks', (req, res) => { 

    const { title, priority, status, assignedTo, assignedBy} = req.body;
    const sql = 'INSERT INTO tasks (title,  priority, status, assignedTo, assignedBy, createdAt) VALUES (?, ?, ?, ?, ?, now())';

    db.query(sql, [title, priority, status, assignedTo, assignedBy], (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, title, priority, status, assignedTo, assignedBy });
    });
    
 });
app.get('/tasks', (req, res) => { 

    // fetching all the available tasks from the database

    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });

 });
app.put('/tasks/:id', (req, res) => { 
    const { id } = req.params;
    const { title, priority, status, assignedTo, assignedBy } = req.body;
    const sql = 'UPDATE tasks SET title = ?, priority = ?, status = ?, assignedTo = ?, assignedBy = ? WHERE id = ?';
    db.query(sql, [title, priority, status, assignedTo, assignedBy, id], (err, result) => {
      if (err) throw err;
      res.json({ id, title, priority, status, assignedTo, assignedBy });
    });

 });

app.delete('/tasks/:id', (req, res) => { 

    // deleting a task from the database based on the provided id

    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Task deleted successfully' });
    });

    // end of delete endpoint
 });

// end of API endpoints

app.listen(3000, () => {
  console.log("Server running on port 3000");
});