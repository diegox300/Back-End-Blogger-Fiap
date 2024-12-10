import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations
import { EmailAlreadyExistsError } from '../../errors/EmailAlreadyExistsError' // Importing the custom error class

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async handler(user: { name: string; email: string; password: string }) {
    // Check if the email already exists
    const existingUser = await this.userRepository.findByEmail(user.email)
    if (existingUser) {
      throw new EmailAlreadyExistsError() // Throw an instance of EmailAlreadyExistsError if the email already exists
    }
    // Method to execute the creation of a user
    return this.userRepository.createUser(user) // Calling the createUser method on the repository with user data
  }
}
