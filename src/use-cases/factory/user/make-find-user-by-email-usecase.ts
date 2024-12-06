import { UserRepository } from '../../../repositories/user.repository'
import { FindUserByEmailUseCase } from '../../user/find-user-by-email-usecase' // Importing the FindUserByEmailUseCase

export const makeFindUserByEmailUseCase = () => {
  const userRepository = new UserRepository() // Pass the User model to the UserRepository
  return new FindUserByEmailUseCase(userRepository)
}
