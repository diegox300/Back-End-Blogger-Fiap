import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations
import { UserNotFoundError } from '../../errors/UserNotFoundError' // Importing the custom error class

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async handler(id: string) {
    console.log(`Finding user with ID: ${id}`) // Log the ID being searched
    // Method to execute the retrieval of a user by ID
    const user = await this.userRepository.findById(id)
    if (!user) {
      console.log(`User with ID: ${id} not found`) // Log if the user is not found
      throw new UserNotFoundError()
    }
    console.log(`User with ID: ${id} found: ${JSON.stringify(user)}`) // Log the found user
    return user
  }
}
