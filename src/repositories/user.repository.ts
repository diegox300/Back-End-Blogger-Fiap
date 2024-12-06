import User, { UserType } from '../models/user.model' // Import the User model and UserType interface

export class UserRepository {
  // Asynchronous method to create a new user
  async createUser(user: {
    name: string
    email: string
    password: string
  }): Promise<UserType> {
    // Create a new instance of the User model with the provided data
    const newUser = new User(user)

    // Save the new user to the database
    await newUser.save()

    // Return the new user as UserType
    return newUser as UserType
  }

  async findAll(): Promise<UserType[]> {
    return User.find().exec()
  }

  // Asynchronous method to find a user by email
  async findByEmail(email: string): Promise<UserType | null> {
    // Find a user by their email
    return User.findOne({ email }).exec()
  }

  // Asynchronous method to find a user by ID
  async findById(id: string): Promise<UserType | null> {
    // Find a user by their ID
    return User.findById(id).exec()
  }
}
