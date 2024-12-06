import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async handler(id: string) {
    // Method to execute the retrieval of a user by ID
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
