import { UserRepository } from '../../repositories/user.repository'

interface EditUserDTO {
  id: string
  name?: string
  email?: string
  password?: string
  isAdmin?: boolean
}

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handler({ id, name, email, password, isAdmin }: EditUserDTO) {
    // Find the user by ID
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }

    // Update the user fields if they are provided
    if (name) user.name = name
    if (email) user.email = email
    if (password) user.password = password
    if (isAdmin !== undefined) user.isAdmin = isAdmin

    return user
  }
}
