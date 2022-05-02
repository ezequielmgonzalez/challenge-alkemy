# challenge-alkemy
Second version for Alkemy's fullstack challenge. App that allows to manage (adding, editing and deleting) money operations of a user. 

## Back-end
Developed in [Node.js](https://nodejs.org/es/about/) together with the [Express](https://expressjs.com/) framework. Database in PostgreSQL, connected via the ORM [Sequelize](https://sequelize.org/).

Two tables are used in the database, one to store the movements and the other for categories. Both tables are related. I took the decision to create a separate table for Category because, in this way, if you want to, you can add more attributes to it in the future (for example a description of it).

![diagram](https://user-images.githubusercontent.com/90068543/166171533-55ba311f-ac40-47ba-9030-2a2bb411ee32.png)

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

## Front-end

The technologies used were [React](https://reactjs.org/) and [React-Bootstrap](https://react-bootstrap.github.io/). [Create React App](https://github.com/facebook/create-react-app) was used to start with.

### Getting started

After you have created the database and started the server (following the instructions above in Back-end), in the /front-end directory, you can use: 

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
