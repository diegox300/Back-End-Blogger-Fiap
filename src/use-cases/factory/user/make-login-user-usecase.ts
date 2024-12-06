import { UserRepository } from '../../../repositories/user.repository'
import { LoginUserUseCase } from '../../user/login-user-usecase' // Importing the LoginUserUseCase

export const makeLoginUserUseCase = () => {
  const userRepository = new UserRepository() // Pass the User model to the UserRepository
  return new LoginUserUseCase(userRepository)
}
