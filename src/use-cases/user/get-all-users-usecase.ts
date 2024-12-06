import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async execute() {
    // Method to execute the retrieval of all users
    const users = await this.userRepository.findAll()
    return users
  }
}
