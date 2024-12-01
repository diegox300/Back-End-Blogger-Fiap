import { Request, Response } from 'express' // Import Request, Response, and NextFunction types from express
import { makeGetUserUseCase } from '../../../use-cases/factory/user/make-get-user-usecase' // Importing the factory function to create the use case for getting users
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations

// Get a user by email
export const getUserByEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.params // Get the email from the request parameters
    const getUserUseCase = makeGetUserUseCase() // Creating an instance of the use case for getting users

    // Handle the retrieval of the user and wait for the result
    const user = await getUserUseCase.findByEmail(email)

    // Send a 200 OK response with the user data
    res.status(200).send(user)
  },
)

// Get a user by ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params // Get the ID from the request parameters
  const getUserUseCase = makeGetUserUseCase() // Creating an instance of the use case for getting users

  // Handle the retrieval of the user and wait for the result
  const user = await getUserUseCase.findById(id)

  // Send a 200 OK response with the user data
  res.status(200).send(user)
})
