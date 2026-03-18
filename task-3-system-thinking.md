Task 3: Basic System Thinking

1. Scaling: The following are most likely to occur:
   1. Decline in Database performance, all the request evenetually are demanding resources from database therefore
       the database may not be able to handle the whole of them as they are coming in.
   2. System resource masking out: System resources such as RAM, CPU and Processor may be masking out even to the extent
      of 100% usage.
   4. Delay in response time due to long queue which could need to starvation and then deadlock if not handle on time.
   5. Program/API downtime: due to inability of database to response to requests on time might lead to 504 error
      (server not available) and with increase in request; the database can crash completely especially mysql.

   2. Performance Improvements: The following techniques could you use to improve performance:
      
      1. Database table indexing: A database index is like a shortcut that helps the database find data faster.
        Instead of checking every row, the index lets the database jump directly to the needed data.eg Searching by
         id with an index is fast; without it, the database scans the whole table.
      2. Database Table Partitioning: Table partitioning means splitting a large table into smaller,
          more manageable pieces called partitions, while still treating it as one table. eg spliting
          tasks table by date or status both still on the same table.
      3. Query Optimization: Query optimization means writing database queries in a way that makes
          them run faster and use fewer resources. eg Instead of asking the database to do extra work, you
          write queries so it can find results quickly and efficiently.
      4. Vertical or Horizontal Scaling : This is improving the capacity of infrastructure to accommodate traffic.
         This is either increasing the already serving (in use) facility by adding more Memmory, Processors, CPU, Storage etc or by buy more devices to increase the devices
         eg instead of using one server, adding one or two more server to the already existing server.
       5. Using Caching and Sessions: Caching is storing frequently used data in a temporary storage (usually memory) so it can be retrieved faster
       6.  instead of repeatedly querying the database And Sessions are a way to store user-specific data on the server across multiple requests, allowing the
       7.  server to remember a user (e.g., after login).

    4. Production Monitoring: These are tools or mechanisms that can be used to monitor the performance of a
       system either software or hardware. These tools includes the following:
       1. Response Time / Latency : How long requests take
       2. Request Rate / Throughput : Number of requests per second/minute
       3. CPU Usage : High CPU through system task manager, may indicate overload or inefficient code
       4. Memory Usage : One can Detect leaks or heavy payload processing still through the system task manager.
       5. Event Loop Lag (Node.js) : Measures responsiveness of the server.
       6. Database Inspection: Checking table Growth / Index Usage;  Ensure tables and indexes are efficient and
          Query Performance / Execution Time; Slow queries can degrade API
       
