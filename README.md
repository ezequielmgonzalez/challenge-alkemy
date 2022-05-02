# challenge-alkemy
Second version for Alkemy's fullstack challenge. App that allows to manage (adding, editing and deleting) money operations of a user. 

![image](https://user-images.githubusercontent.com/90068543/166178166-f1d81d9d-3fd6-4e83-8b39-52dd7e210fbe.png)
![image](https://user-images.githubusercontent.com/90068543/166178177-a6c8c798-d8f6-432a-ba20-c04c1c399705.png)


This app has been made as an update of a previous release of mine for Alkemy:
[Previous front-end repo](https://github.com/ezequielmgonzalez/client-budget-wise)
[Previous back-end repo](https://github.com/ezequielmgonzalez/server-budget)
I thought it was important to take advantage of Agile Methodologies so the first idea was to organize the changes for the project using [Trello](https://trello.com/):

![trello_img](https://user-images.githubusercontent.com/90068543/166172358-c1d9da1a-5645-4316-aab2-08960a3c617a.png)

On [this dashboard](https://trello.com/b/z0yaGDeg/challenge-alkemy) I organized with cards all the tasks I had to do to change the app. These cards changed status depending if they were not done, were in process or were finished.

After organizing the Trello cards, I began to make them starting from the unification of both repositories I had before.

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
- Create a category: POST request to /categories
- Get all categories: GET request to /categories
- Get a category: GET request to /categories/:id where "id" is a number that identifies the specific category.
- Update a category: PUT request to /categories/:id where "id" is a number that identifies the specific category.
- Delete a category: DELETE request to /categories
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
