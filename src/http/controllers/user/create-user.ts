import { Request, Response } from 'express' // Import Request, Response, and NextFunction types from express
import { z } from 'zod' // Import zod for schema validation
import { makeCreateUserUseCase } from '../../../use-cases/factory/user/make-create-user-usecase' // Importing the factory function to create the use case for creating users
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import bcrypt from 'bcrypt' // Importing bcrypt for hashing passwords

// Create a new user
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  // Define the schema for validating request body
  const registerBodySchema = z.object({
    name: z.string().min(1, 'Name is required'), // Name must be a non-empty string
    email: z.string().email('Invalid email format'), // Email must be a valid email format
    password: z.string().min(6, 'Password must be at least 6 characters long'), // Password must be at least 6 characters long
  })

  // Parse and validate the request body against the schema asynchronously
  const { name, email, password } = await registerBodySchema.parseAsync(
    req.body,
  )

  const createUserUseCase = makeCreateUserUseCase() // Creating an instance of the use case for creating users

  const hashedPassword = await bcrypt.hash(password, 10) // Hash the password using bcrypt

  // Handle the creation of the user and wait for the result
  const returnUser = await createUserUseCase.handler({
    name,
    email,
    password: hashedPassword,
  })

  // removed password from the response
  const { password: _, ...userWithoutPassword } = returnUser.toObject()

  // Send a 201 Created response with the created user
  res.status(201).send(userWithoutPassword)
})
