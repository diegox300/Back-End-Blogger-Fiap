import express from 'express' // Importing the Express framework
import routes from './routes/' // Importing the application's routes
import { errorMiddleware } from './middleware/error' // Importing the error handling middleware
import { authMiddleware } from './middleware/auth'
import cors from 'cors'
import { json } from 'body-parser'

const app = express() // Creating an instance of the Express application

app.use(express.json()) // Middleware to parse JSON request bodies
app.use(cors())
app.use(json())
app.use('/', routes) // Mounting the routes at the root path

// Error handling middleware
app.use(errorMiddleware) // Using the error middleware for handling errors

export default app // Exporting the app instance for use in other modules
