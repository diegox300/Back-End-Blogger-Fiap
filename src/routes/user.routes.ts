import { Router } from 'express' // Importing the Router from the Express framework
import { createUser } from '../http/controllers/user/create-user' // Importing the controller for creating a user
import { getUserByEmail, getUserById } from '../http/controllers/user/get-user' // Importing the controller for getting a user by email and ID

const router = Router() // Creating an instance of the Express Router

// User routes

router.post('/', createUser) // Route to create a new user

router.get('/email/:email', getUserByEmail) // Route to get a user by email

router.get('/id/:id', getUserById) // Route to get a user by ID

export default router // Exporting the configured router for use in other modules
