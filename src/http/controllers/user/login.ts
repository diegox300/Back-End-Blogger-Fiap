import { Request, Response } from 'express' // Import Request, Response, and NextFunction types from express
import { z } from 'zod' // Import zod for schema validation
import bcrypt from 'bcryptjs' // Importing bcrypt for comparing passwords
import jwt from 'jsonwebtoken' // Importing jsonwebtoken for generating JWT
import { makeGetUserUseCase } from '../../../use-cases/factory/user/make-get-user-usecase' // Importing the factory function to create the use case for getting users
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

  const getUserUseCase = makeGetUserUseCase() // Creating an instance of the use case for getting users

  // Handle the retrieval of the user and wait for the result
  const user = await getUserUseCase.findByEmail(email)

  // Check if the user exists
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' })
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).send({ message: 'Invalid email or password' })
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h',
  })

  const { password: _, ...userWithoutPassword } = user.toObject()

  // Send the token in the response
  res.status(200).send({ user: userWithoutPassword, token })
})
