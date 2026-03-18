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
// Adding a new task to the database based on the provided details in the request body

app.post('/tasks', (req, res) => {
  const { title, priority, assignedTo, assignedBy } = req.body;

  //  Input Validation
  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Title is required and must be at least 3 characters long'
    });
  }

  const validPriorities = ['Low', 'Medium', 'High'];
  if (!priority || !validPriorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: `Priority must be one of: ${validPriorities.join(', ')}`
    });
  }

  if (!assignedTo || typeof assignedTo !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'assignedTo is required and must be a string'
    });
  }

  if (!assignedBy || typeof assignedBy !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'assignedBy is required and must be a string'
    });
  }

  //  Default status enforced
  const status = 'Pending';

  const sql = `
    INSERT INTO tasks (title, priority, status, assignedTo, assignedBy, createdAt)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [title.trim(), priority, status, assignedTo, assignedBy], (err, result) => {
    
    //  Handle DB error properly
    if (err) {
        
      return res.status(500).json({
        success: false,
        message: 'Database error while creating task'
      });
    }

    //  Handle unexpected failure
    if (result.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create task'
      });
    }

    //  Success response
    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        id: result.insertId,
        title: title.trim(),
        priority,
        status,
        assignedTo,
        assignedBy,
        createdAt: new Date().toISOString()
      }
    });
  });
});

//  end of create task endpoint

// endpoint to fetch all the available tasks from the database and return them in the response. 
app.get('/tasks', (req, res) => { 

    // fetching all the available tasks from the database

    const sql = 'SELECT * FROM tasks ORDER BY status';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });

 });

//  updating a task in the database based on the provided id and details in the request body. Only the assigner can update the task details.
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, priority, status, assignedTo, assignedBy } = req.body;

  //  Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid task ID is required'
    });
  }

  //  Validate assignedBy (used for authorization)
  if (!assignedBy) {
    return res.status(400).json({
      success: false,
      message: 'assignedBy is required for authorization'
    });
  }

  //  Allowed values
  const validPriorities = ['Low', 'Medium', 'High'];
  const validStatuses = ['Pending', 'In Progress', 'Completed'];

  //  Building dynamic update fields (true PATCH behavior)
  let fields = [];
  let values = [];

  if (title) {
    if (typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Title must be at least 3 characters'
      });
    }
    fields.push('title = ?');
    values.push(title.trim());
  }

  if (priority) {
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: `Priority must be one of: ${validPriorities.join(', ')}`
      });
    }
    fields.push('priority = ?');
    values.push(priority);
  }

  if (status) {
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }
    fields.push('status = ?');
    values.push(status);
  }

  if (assignedTo) {
    if (typeof assignedTo !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'assignedTo must be a string'
      });
    }
    fields.push('assignedTo = ?');
    values.push(assignedTo);
  }

  //  Nothing to update
  if (fields.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No valid fields provided for update'
    });
  }

  // Final SQL
  const sql = `
    UPDATE tasks 
    SET ${fields.join(', ')} 
    WHERE id = ? AND assignedBy = ?
  `;

  values.push(id, assignedBy);

  db.query(sql, values, (err, result) => {

    //  Handle DB error
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Database error while updating task'
      });
    }

    //  No rows affected → either not found or unauthorized
    if (result.affectedRows === 0) {
      return res.status(403).json({
        success: false,
        message: 'Task not found or unauthorized to update'
      });
    }

    //  Success
    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: {
        id,
        ...(title && { title: title.trim() }),
        ...(priority && { priority }),
        ...(status && { status }),
        ...(assignedTo && { assignedTo }),
        assignedBy
      }
    });
  });
});
// end of update task endpoint by the assigner.

//  updating status only by assigned user and not by the assigner.

app.patch('/tasks/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, assignedTo } = req.body;

  //  Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid task ID is required'
    });
  }

  //  Validate assignedTo (authorization)
  if (!assignedTo || typeof assignedTo !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'assignedTo is required and must be a string'
    });
  }

  //  Validate status
  const validStatuses = ['Pending', 'In Progress', 'Completed'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${validStatuses.join(', ')}`
    });
  }

  const sql = `
    UPDATE tasks 
    SET status = ? WHERE id = ? AND assignedTo = ?
  `;

  db.query(sql, [status, id, assignedTo], (err, result) => {

    //  Handle DB error
    if (err) {
      console.error('Error updating task status:', err);
      return res.status(500).json({
        success: false,
        message: 'Database error while updating task status'
      });
    }

    //  No rows affected → not found OR unauthorized
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you are not authorized to update this task'
      });
    }

    //  Success
    return res.status(200).json({
      success: true,
      message: 'Task status updated successfully',
      data: {
        id,
        status,
        assignedTo
      }
    });
  });
});

//  end of update task status endpoint by the assigned user.

// unassigining a task by the assigner by setting the assignedTo field to null in the database.

app.patch('/tasks/:id/unassign', (req, res) => {
  const { id } = req.params;
  const { assignedBy, assignedTo } = req.body;

  //  Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid task ID is required'
    });
  }

  // Validate assignedBy (authorization)
  if (!assignedBy || typeof assignedBy !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'assignedBy is required and must be a string'
    });
  }

  // Validate assignedTo (authorization)
  if (!assignedTo || typeof assignedTo !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'assignedTo is required because a task must be assigned to someone'
    });
  }

  // Business Logic: unassign → set to NULL
  const sql = `
    UPDATE tasks 
    SET assignedTo =? WHERE id = ? AND assignedBy = ?
  `;

  db.query(sql, [assignedTo, id, assignedBy], (err, result) => {

    //  Handle DB error
    if (err) {
      console.error('Error unassigning task:', err);
      return res.status(500).json({
        success: false,
        message: 'Database error while unassigning task'
      });
    }

    //  No rows affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or unauthorized to unassign'
      });
    }

    //  Success
    return res.status(200).json({
      success: true,
      message: 'Task unassigned successfully',
      data: {
        id,
        assignedTo: assignedTo,
        assignedBy
      }
    });
  });
});

//  end of update task endpoint by the assigner.

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { assignedBy } = req.body;

  //  Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid task ID is required'
    });
  }

  //  Validate assignedBy (authorization)
  if (!assignedBy || typeof assignedBy !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'assignedBy is required and must be a string'
    });
  }

  const sql = `
    DELETE FROM tasks 
    WHERE id = ? AND assignedBy = ?
  `;

  db.query(sql, [id, assignedBy], (err, result) => {

    //  Handle DB error
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({
        success: false,
        message: 'Database error while deleting task'
      });
    }

    //  No rows affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or unauthorized to delete'
      });
    }

    //  Success
    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {
        id,
        assignedBy
      }
    });
  });
});

// end of API endpoints

app.listen(3000, () => {
  console.log("Server running on port 3000");
});