import { Router } from 'express' // Importing the Router from the Express framework
import { createUser } from '../http/controllers/user/create-user' // Importing the controller for creating a user
import { getUserByEmail } from '../http/controllers/user/get-user-by-email' // Importing the controller for getting a user by email and ID
import { getUserById } from '../http/controllers/user/get-user-by-id' // Importing the controller for getting a user by ID
import { loginUser } from '../http/controllers/user/login-user' // Importing the controller for logging in a user
import { getAllUsers } from '../http/controllers/user/get-all-users' // Importing the controller for getting all users

const router = Router() // Creating an instance of the Express Router

// User routes

router.get('/', getAllUsers) // Route to get all users

router.post('/', createUser) // Route to create a new user

router.post('/login', loginUser) // Route to login a user)

router.get('/email/:email', getUserByEmail) // Route to get a user by email

router.get('/id/:id', getUserById) // Route to get a user by ID

export default router // Exporting the configured router for use in other modules
