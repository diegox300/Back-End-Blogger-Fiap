import { Request, Response } from 'express' // Import Request, Response, and NextFunction types from express
import { z } from 'zod' // Import zod for schema validation
import { makeEditUserUseCase } from '../../../use-cases/factory/user/make-edit-user-usecase' // Importing the factory function to create the use case for editing users
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import bcrypt from 'bcrypt' // Importing bcrypt for hashing passwords
import { makeFindUserByIdUseCase } from '../../../use-cases/factory/user/make-find-user-by-id-usecase' // Importing the factory function to create the use case for finding users by ID

// Edit an existing user
export const editUser = asyncHandler(async (req: Request, res: Response) => {
  // Define the schema for validating request body
  const editBodySchema = z.object({
    name: z.string().min(1, 'Name is required').optional(), // Name must be a non-empty string if provided
    email: z.string().email('Invalid email format').optional(), // Email must be a valid email format if provided
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .optional(), // Password must be at least 6 characters long if provided
    isAdmin: z.boolean().optional(), // isAdmin is an optional boolean field
  })

  // Convert isAdmin to boolean if it exists
  if (req.body.isAdmin !== undefined) {
    req.body.isAdmin = req.body.isAdmin === 'true' || req.body.isAdmin === true
  }

  // Parse and validate the request body against the schema asynchronously
  const { name, email, password, isAdmin } = await editBodySchema.parseAsync(
    req.body,
  )

  const findUserByIdUseCase = makeFindUserByIdUseCase() // Creating an instance of the use case for finding users by ID
  const { id } = req.params // Get the ID from the request parameters
  const user = await findUserByIdUseCase.handler(id) // Find the user by ID

  if (!user) {
    return res.status(404).send({ message: 'User not found' }) // Return 404 if user is not found
  }

  const editUserUseCase = makeEditUserUseCase() // Creating an instance of the use case for editing users

  let hashedPassword
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10) // Hash the password using bcrypt if provided
  }

  // Handle the update of the user and wait for the result
  const returnUser = await editUserUseCase.handler({
    _id: req.params._id,
    name,
    email,
    password: hashedPassword,
    isAdmin,
  })

  // removed password from the response
  const { password: _, ...userWithoutPassword } = returnUser.toObject()

  // Send a 200 OK response with the updated user
  res.status(200).send(userWithoutPassword)
})
