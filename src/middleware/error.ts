import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { env } from '../env' // Importing environment variables
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError' // Importing the custom error class
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError' // Importing the custom error class
import { UserNotFoundError } from '../errors/UserNotFoundError' // Importing the custom error class

// Error handling middleware for Express
export const errorMiddleware = (
  error: Error & { status?: number }, // The error object with an optional status property
  req: Request, // The HTTP request object
  res: Response, // The HTTP response object
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction, // The next middleware function
) => {
  // Check if the error is an instance of ZodError (validation error)
  if (error instanceof ZodError) {
    return res
      .status(400) // Respond with a 400 Bad Request status
      .send({ message: 'Validation error', errors: error.errors }) // Send validation errors
  }

  // Check if the error is an instance of InvalidCredentialsError
  if (error instanceof InvalidCredentialsError) {
    return res
      .status(error.status) // Respond with the error status
      .send({ message: error.message }) // Send the error message
  }

  // Check if the error is an instance of EmailAlreadyExistsError
  if (error instanceof EmailAlreadyExistsError) {
    return res
      .status(error.status) // Respond with the error status
      .send({ message: error.message }) // Send the error message
  }

  // Check if the error is an instance of UserNotFoundError
  if (error instanceof UserNotFoundError) {
    return res
      .status(error.status) // Respond with the error status
      .send({ message: error.message }) // Send the error message
  }

  // Log the error to the console in development mode
  if (env.NODE_ENV === 'development') {
    console.error(error) // Print the error stack trace
  }

  // Handle other types of errors here if needed
  res.status(500).send({ message: 'Internal Server Error' }) // Respond with a 500 Internal Server Error status
}
