1 How you approached the implementation:

  1. First I choose Node.js with Express js.
  2. created the project and the install express
  3. installed all dependencies and Created the "Server.js" file to serve the entire app
  4. created mysqli database and table and the connected it
  5. set the port(3000) for the view.
  6. Then I started carefully creating the API endpoints and the logic.
  7. testing each endpoint using Postman before moving to the next.
  8. I ensure clarity using comments as internal documentation and readibility was prioritize.
  

2. Why you structured the code the way you did:

  Respond: 
  The project is a small and light one so i choose the monolit architecture to implement the project.
  All the endpoints are on the same page (sever.js). This sufficiently reduce the need for a controller and the microservices    since the endpoints are few and light. Commenct was sufficiently used to provide internal documentation and clarity.
  
3. Assumptions you made
Respond:
Basically I used the data you provided even for unassigning "assignTO" endpoint and updating the status but i was just changing the values on Postman to enable me test for validation and authorization.

4. What you would improve if given more time
Maybe I would make it a microservice making each endpoints an indepedent sections in controller.

5. Any tools or AI assistance used
Yes: Copilot was so insightful in this.
