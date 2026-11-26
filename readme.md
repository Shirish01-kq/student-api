# Student API

A simple REST API built with Node.js, Express and MySQL.
It can create, read, update and delete student records (CRUD).

## How to run

1. Install the libraries: `npm install`
2. Create a `.env` file with your MySQL details (host, user, password, database name, port)
3. Create the database and table in MySQL (see `schema.sql`)
4. Start the server: `node server.js`
5. Open http://localhost:3000/students in the browser

## Routes

| Method | URL | What it does |
|--------|-----|--------------|
| POST | /students | Add a student |
| GET | /students | Show all students |
| GET | /students/:id | Show one student |
| PUT | /students/:id | Edit a student |
| DELETE | /students/:id | Delete a student |

## Tech used

Node.js, Express, MySQL, mysql2, dotenv