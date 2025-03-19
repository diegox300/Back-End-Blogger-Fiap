import { Request, Response, NextFunction } from 'express'
import { z } from 'zod' // Import zod for schema validation
import { makeEditUserUseCase } from '../../../use-cases/factory/user/make-edit-user-usecase' // Importing the factory function to create the use case for editing users
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing the ObjectId validation middleware

// Define the schema for validating update data
const updateUserSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty' }).optional(), // Name must be a non-empty string if provided
  email: z.string().email({ message: 'Invalid email format' }).optional(), // Email must be a valid email format if provided
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .optional(), // Password must be at least 6 characters long if provided
  isAdmin: z.boolean().optional(), // isAdmin is an optional boolean field
})

// Middleware to validate update data using Zod
const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updateUserSchema.safeParse(req.body) // Parsing and validating the request body
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors }) // Responds with 400 if validation fails
  }
  next() // Proceed to the next middleware if validation passes
}

// Update a user by ID
export const updateUserById = [
  validateObjectId, // Applying the ObjectId validation middleware
  validateUpdateUser, // Applying the Zod validation middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extracting the ID from the request parameters
    const updateData = req.body // Extracting update data from the request body

    const editUserUseCase = makeEditUserUseCase() // Creating an instance of the use case for editing a user
    const updatedUser = await editUserUseCase.execute(id, updateData) // Executing the update operation

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Responds with 404 if the user is not found
    }

    // Send a 200 OK response with the updated user
    return res.status(200).json(updatedUser)
  }),
]
