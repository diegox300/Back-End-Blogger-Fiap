import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations
import { UserNotFoundError } from '../../errors/UserNotFoundError' // Importing the custom error class for user not found

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async handler(email: string) {
    // Method to execute the retrieval of a user by email
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new UserNotFoundError()
    }
    return user
  }
}
