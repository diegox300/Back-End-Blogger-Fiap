import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async findByEmail(email: string) {
    // Method to execute the retrieval of a user by email
    return this.userRepository.findByEmail(email) // Calling the findByEmail method on the repository with email
  }

  async findById(id: string) {
    // Method to execute the retrieval of a user by ID
    return this.userRepository.findById(id) // Calling the findById method on the repository with ID
  }
}
