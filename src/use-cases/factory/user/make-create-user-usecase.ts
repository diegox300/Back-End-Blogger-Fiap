import { UserRepository } from '../../../repositories/user.repository' // Import the UserRepository
import { CreateUserUseCase } from '../../user/create-user-usecase' // Importing the CreateUserUseCase

export const makeCreateUserUseCase = () => {
  const userRepository = new UserRepository() // Pass the User model to the UserRepository
  return new CreateUserUseCase(userRepository)
}
