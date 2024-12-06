import { UserRepository } from '../../../repositories/user.repository'
import { GetAllUsersUseCase } from '../../user/get-all-users-usecase' // Importing the GetAllUsersUseCase

export const makeGetAllUsersUseCase = () => {
  const userRepository = new UserRepository() // Pass the User model to the UserRepository
  return new GetAllUsersUseCase(userRepository)
}
