import { Request, Response, NextFunction } from 'express'
import { makeGetAllUsersUseCase } from '../../../use-cases/factory/user/make-get-all-users-usecase' // Importing the factory function to create the use case for getting all users

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const getAllUsersUseCase = makeGetAllUsersUseCase() // Creating an instance of the use case for getting all users

  getAllUsersUseCase
    .execute()
    .then((users) => res.status(200).send(users))
    .catch(next) // Pass the error to the error handling middleware
}
