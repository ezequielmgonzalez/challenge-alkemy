# challenge-alkemy
Second version for Alkemy's fullstack challenge. App that allows to manage (adding, editing and deleting) money operations of a user. 

## Back-end
Developed in [Node.js](https://nodejs.org/es/about/) together with the [Express](https://expressjs.com/) framework. Database in PostgreSQL, connected via [node-postgres](https://node-postgres.com/): collection of node.js modules for interfacing with the database.

### Getting started

#### Creating database

First, we run in the server directory: \
`createdb budgetwisedb` 

If it doesn't work, use this one: \
`sudo -u postgres psql` \
`CREATE DATABASE budgetWiseDb;` 

And get out with: \
`\q`

Then, run the following command to setup the PostgresSQL database schema: 

If you run the first command:
`psql -d budgetwisedb < database.sql`

If it didn't work:
`sudo -u postgres psql -d budgetwisedb < database.sql`

#### Starting server

In the project directory, you can run:

##### `npm start`

#### API
This API exposes URLs that return JSON data. Below is the list of endpoints:
- Create a movement: POST request to /movements
- Get all movements: GET request to /movements
- Get only selected type of movements: GET request to /movements/type/:t where ":t" is the filtered type. 
- Get last movements: GET request to /movements/last/:q where ":q" is the quantity of movements requested.
- Get total balance from all movements: GET request to /movements/balance
- Get a movement: GET request to /movements/:id where "id" is a number that identifies the specific movement.
- Update a movement: PUT request to /movements/:id where "id" is a number that identifies the specific movement.
- Delete a movement: DELETE request to /movements
All this endpoints interact with the local database where it can be consulted or modified depending on which one is used.

