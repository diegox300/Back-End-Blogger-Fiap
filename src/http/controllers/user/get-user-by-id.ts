import { Request, Response, NextFunction } from 'express'
import { makeFindUserByIdUseCase } from '../../../use-cases/factory/user/make-find-user-by-id-usecase' // Importing the factory function to create the use case for finding users by ID
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations

// Get a user by ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params // Get the ID from the request parameters
  const findUserByIdUseCase = makeFindUserByIdUseCase() // Creating an instance of the use case for finding users by ID

  // Handle the retrieval of the user and wait for the result
  const user = await findUserByIdUseCase.handler(id)

  // Send a 200 OK response with the user data
  res.status(200).send(user)
})
