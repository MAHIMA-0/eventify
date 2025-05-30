# Event Management System

A full-stack web application that enables users to register, log in, and manage events efficiently. The backend is built with **Express.js**, and the frontend uses **React.js** with a modular component structure. The system stores user and event information in two separate database tables for clear organization and smooth operation.


## Project Structure

/backend
└── app.js # Express backend entry point
/frontend
└── CM
└── src
└── components # Reusable UI components
├── EventList.js
└── EventForm.js
└── pages # Main pages of the app
├── Homepage.js
├── Login.js
├── Register.js
├── Dashboard.js # Contains add, delete, logout buttons
└── AddEvent.js # Page to add events


## Features

- Secure user registration and login system  
- Create, view, and delete events with ease  
- Reusable React components for maintainability  
- RESTful API built with Express.js to handle data  
- Two database tables: `users` and `events`  
- Responsive and user-friendly interface

 
 ##Technologies Used
Backend: Node.js, Express.js

Frontend: React.js

Database: ( MySQL)



## Installation and Setup

### Backend

1. Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Start the backend server:
node app.js
Frontend
Navigate to the frontend folder:
cd frontend/CM
Install dependencies:
npm install
Start the frontend:
npm start
Environment Variables
Create a .env file in the backend folder with the following variables:
PORT=5000
DB_CONNECTION_STRING=your-database-connection-string
API Endpoints
POST /api/register - Register a new user

POST /api/login - Login user

GET /api/events - Get all events

POST /api/addevents - Add a new event

DELETE /api/events/:id - Delete an event by ID

Usage
Register or login to access the dashboard.

Use AddEvent page to create new events.

View and manage events on the Dashboard with add, delete, and logout controls.



