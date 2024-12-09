import bcrypt from 'bcryptjs' // Importing bcryptjs for comparing passwords
import jwt from 'jsonwebtoken' // Importing jsonwebtoken for generating JWT
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError' // Importing the custom error class
import { UserRepository } from '../../repositories/user.repository' // Importing the UserRepository for database operations

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {} // Injecting the UserRepository dependency

  async handler(email: string, password: string) {
    // Method to execute the login of a user
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? '', {
      expiresIn: '1h',
    })

    // Remove the password from the user object
    const { password: _, ...userWithoutPassword } = user.toObject()

    return { token, isAdmin: user.isAdmin, user: userWithoutPassword }
  }
}
