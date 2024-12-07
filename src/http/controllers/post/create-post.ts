import { Request, Response, NextFunction } from 'express' // Import Request, Response, and NextFunction types from express
import { z } from 'zod' // Import zod for schema validation
import { makeCreatePostUseCase } from '../../../use-cases/factory/posts/make-create-posts-usecase' // Importing the factory function to create the use case for creating posts
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations
import { UserType } from '../../../models/user.model' // Importing the UserType interface
import { Types } from 'mongoose' // Importing Types from mongoose

interface CustomRequest extends Request {
  user?: UserType // Extending the Request interface with the user property
}

// Create a new post
export const createPost = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    // Define the schema for validating request body
    const registreBodySchema = z.object({
      title: z.string().min(1, 'Title is required'), // Title must be a non-empty string
      content: z.string().min(1, 'Content is required'), // Content must be a non-empty string
      img: z.string().optional(), // Image is an optional string
    })

    // Parse and validate the request body against the schema asynchronously
    const { title, content, img } = await registreBodySchema.parseAsync(
      req.body,
    )
    const createPostUseCase = makeCreatePostUseCase() // Creating an instance of the use case for creating posts

    // Handle the creation of the post and wait for the result
    const returnPost = await createPostUseCase.handler({
      title,
      content,
      img,
      author: new Types.ObjectId(req.user!._id.toString()), // Use the authenticated user's ID as the author
    })

    // Send a 201 Created response with the created post, including the author's name
    res.status(201).send({
      ...returnPost.toObject(),
      author: (returnPost.author as UserType).name, // Replace the author ID with the author's name
    })
  },
)
