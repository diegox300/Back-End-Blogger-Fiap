import { UserRepository } from '../../../repositories/user.repository'
import { FindUserByIdUseCase } from '../../user/find-user-by-id-usecase' // Importing the FindUserByIdUseCase

export const makeFindUserByIdUseCase = () => {
  const userRepository = new UserRepository() // Pass the User model to the UserRepository
  return new FindUserByIdUseCase(userRepository)
}
