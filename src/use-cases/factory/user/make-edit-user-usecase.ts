import { UserRepository } from '../../../repositories/user.repository'
import { EditUserUseCase } from '../../user/edit-user-usecase'

export const makeEditUserUseCase = () => {
  const userRepository = new UserRepository()
  return new EditUserUseCase(userRepository)
}
