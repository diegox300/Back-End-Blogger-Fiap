import { Request, Response, NextFunction } from 'express'
import { z } from 'zod' // Import zod for schema validation
import { makeUpdatePostUseCase } from '../../../use-cases/factory/posts/make-update-post-usecase' // Importing the factory function to create the use case for updating posts
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { UserType } from '../../../models/user.model' // Importing the UserType interface
import { validateObjectId } from '../../../middleware/validateObjectId' // Importing the ObjectId validation middleware
import upload from '../../../middleware/upload' // Importing the multer upload middleware

// Define the schema for validating update data
const updatePostSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }), // Title must be a non-empty string
  content: z.string().min(1, { message: 'Content cannot be empty' }), // Content must be a non-empty string
})

// Middleware to validate update data using Zod
const validateUpdatePost = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = updatePostSchema.safeParse(req.body) // Parsing and validating the request body
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors }) // Responds with 400 if validation fails
  }
  next() // Proceed to the next middleware if validation passes
}

// Update a post by ID
export const updatePostById = [
  validateObjectId, // Applying the ObjectId validation middleware
  upload.single('img'), // Applying the multer middleware to handle single file upload
  validateUpdatePost, // Applying the Zod validation middleware
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params // Extracting the ID from the request parameters
    const updateData = req.body // Extracting update data from the request body

    // Get the image URL from the uploaded file if available
    if (req.file) {
      updateData.img = (req.file as any).path
    }

    const updatePostUseCase = makeUpdatePostUseCase() // Creating an instance of the use case for updating a post
    const updatedPost = await updatePostUseCase.execute(id, updateData) // Executing the update operation

    // Check if the post was found and updated
    if (!updatedPost) {
      return res.status(404).json({ message: `ID ${id} not found` }) // Responds with 404 if the post is not found
    }

    // Send a 200 OK response with the updated post, including the author's name
    return res.status(200).json({
      ...updatedPost,
      author: (updatedPost.author as UserType).name, // Replace the author ID with the author's name
    })
  }),
]
