import { Request, Response, NextFunction } from 'express'
import { makeFindUserByEmailUseCase } from '../../../use-cases/factory/user/make-find-user-by-email-usecase' // Importing the factory function to create the use case for finding users by email
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations

// Get a user by email
export const getUserByEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.params // Get the email from the request parameters
    const findUserByEmailUseCase = makeFindUserByEmailUseCase() // Creating an instance of the use case for finding users by email

    // Handle the retrieval of the user and wait for the result
    const user = await findUserByEmailUseCase.handler(email)

    // Send a 200 OK response with the user data
    res.status(200).send(user)
  },
)
