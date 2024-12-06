import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations
import { UserNotFoundError } from '../../errors/UserNotFoundError' // Importing the custom error class

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async findByEmail(email: string) {
    // Method to execute the retrieval of a user by email
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async findById(id: string) {
    // Method to execute the retrieval of a user by ID
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new UserNotFoundError()
    }
    return user
  }
}
