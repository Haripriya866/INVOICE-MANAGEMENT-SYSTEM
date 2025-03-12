# Title
Invoice Management System

## Objective
An Invoice Management System application enabling Authenticated users to perform CRUD operations.

## Demo

Link: https://invoice-management-system-frontend.vercel.app

## Tech Stack
HTML, CSS, JS, ReactJS, React Router, Vite, REST APIs, JWT Token, NodeJS, Express, MongoDB, Github, and vercel for hosting the repository.

### Functionality
* Develop multiple pages, including Register, Login, Home, CreateInvoice, and UpdateInvoice, using React functional components, Hooks, useParams, lists, event handlers, and form inputs.
* Configure routing for all pages using React Router components (Route, Routes, and Link) to enable seamless navigation and ensure that authenticated users can access the Home route and perform CRUD operations.
* Maintain user login state by storing JWT tokens in localStorage.
* Build the backend using Node.js and Express, integrating REST API calls and connecting to MongoDB for data persistence.
  
## Setup Instructions
* Initial Setup: open root folder for project in vscode: cd Netflix Clone
* initialize git in this folder (Netflix Clone): git init

    Set Up the client:

        Run the following command to generate a React app (npm init vite)

        Create a new folder for the client:
        mkdir client

        Navigate to the client folder:
        cd ../client

        Install the necessary dependencies:
        npm install
        npm install react-router-dom@5 

    Set Up the server:
    
        Create a new folder for the server:
        mkdir server

        Navigate to the server folder:
        cd ../server

        Initialize the server project:
        npm init -y

        Install required dependencies:
        npm install cors, express, mongoose, nodemon, jsonwebtoken

    Folder Structure and Logic: 
        client:

        The src folder contains the main logic for the React application.
        Components for the project are created in the components/ folder within src.

        server:

        The server uses Express.js for setting up APIs and CORS for
        cross-origin resource sharing.
        axios is used for making HTTP requests.
    
    
    Running the Application:
        Start the client:

            Navigate to the client folder:
            cd ../client
    
            Start the React development client:
            npm run dev

        Start the server:

            Navigate to the server folder:
            cd ../server
    
            Start the React development server:
            npm start

## Resources
## Design files
Register, Home, Login, CreateInvoice, UpdateInvoice


    