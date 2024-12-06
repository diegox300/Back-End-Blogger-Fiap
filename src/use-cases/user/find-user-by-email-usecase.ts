import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async handler(email: string) {
    // Method to execute the retrieval of a user by email
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
