import { Request, Response } from 'express' // Import Request, Response, and NextFunction types from express
import { z } from 'zod' // Import zod for schema validation
import { makeLoginUserUseCase } from '../../../use-cases/factory/user/make-login-user-usecase' // Importing the factory function to create the use case for logging in users
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations

// Login a user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // Define the schema for validating request body
  const loginBodySchema = z.object({
    email: z.string().email('Invalid email format'), // Email must be a valid email format
    password: z.string().min(6, 'Password must be at least 6 characters long'), // Password must be at least 6 characters long
  })

  // Parse and validate the request body against the schema asynchronously
  const { email, password } = await loginBodySchema.parseAsync(req.body)

  const loginUserUseCase = makeLoginUserUseCase() // Creating an instance of the use case for logging in users

  // Handle the login of the user and wait for the result
  const { token, user } = await loginUserUseCase.handler(email, password)

  // Send the token and the user in the response
  res.status(200).send({ token, user })
})
