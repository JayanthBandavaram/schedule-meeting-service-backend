# schedule-meeting-service-backend
I am so excited that this is something thrilling 
i created backend schedule booking api using NodeJs,Express Js,Javascript,SQL database,Sequalize

##
Tech Stack
Node.js
JavaScript
Express
Sequelize ORM
SQL (SQLite)
JWT Authentication
Postman (API testing)
Render (Deployment)


### Features
User registration and login
JWT-based authentication
Create meetings with start & end time
Prevent overlapping meeting schedules
List all meetings
REST API design
Deployed live on Render

Main Logic 
existing.startTime < new.endTime
AND
existing.endTime > new.startTime
we should schedule meeting such that there is no overlapping to each if there is any overlapping we should arise an error code 

400 Bad Request
Time slot already booked


### What I Learned

How backend APIs work
How to design database models using Sequelize
How to implement authentication using JWT
How to handle real business rules
How to deploy a backend service

**** This project helped me gain confidence in backend development and practical API design.
