import { UserRepository } from '../../../repositories/user.repository' // Import the UserRepository
import { GetUserUseCase } from '../../user/get-user-usecase' // Importing the GetUserUseCase

export const makeGetUserUseCase = () => {
  const userRepository = new UserRepository() // Pass the User model to the UserRepository
  return new GetUserUseCase(userRepository)
}
