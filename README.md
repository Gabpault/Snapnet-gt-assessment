Features
1. Create new tasks with title, priority, assignee, and assigner
2. Retrieve all tasks
3. Update task details (assigner only)
4. Update task status (assigned user only)
5. Unassign tasks (assigner only)
6. Delete tasks (assigner only)
7. Input validation and proper HTTP responses

Setup Instructions
Clone the repository
Set up MySQL database: I am including the exported database, extract and import it to your mysql database management system

Open the cloned script in any ide or terminal and run the program in the terminal using "Node server.js"

to test using the following endpoints, their corresponding requirements and response.

1. ``http://localhost:3000/tasks ``
purpose : get all tasks
method : GET
requirement : nothin

response : json = 
``{
        "id": 1,
        "title": "test",
        "priority": "High",
        "status": "Pending",
        "assignedTo": "002",
        "assignedBy": "1",
        "createdAt": "2026-03-16T23:00:00.000Z"
    }``

  2. http://localhost:3000/tasks 
purpose : get all tasks
method : POST
requirement : json =  ``{
        "id": 1,
        "title": "test",
        "priority": "High",
        "status": "Pending",
        "assignedTo": "002",
        "assignedBy": "1",
        "createdAt": "2026-03-16T23:00:00.000Z"
    }``

response : json =  ``{
    "success": true,
    "message": "Task created successfully",
    "data": {
        "id": 14,
        "title": "Complete assessment",
        "priority": "High",
        "status": "Pending",
        "assignedTo": "test",
        "assignedBy": "Gab",
        "createdAt": "2026-03-17T23:24:40.002Z"
    }``


3. ``http://localhost:3000/tasks``
purpose : get all tasks
method : GET
requirement : nothin

response : json =  ``{
        "id": 1,
        "title": "test",
        "priority": "High",
        "status": "Pending",
        "assignedTo": "002",
        "assignedBy": "1",
        "createdAt": "2026-03-16T23:00:00.000Z"
    }``


    
