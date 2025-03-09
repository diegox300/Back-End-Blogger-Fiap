import { Types } from 'mongoose' // Importing Types from mongoose
import User, { UserType } from '../models/user.model' // Importing the User model and UserType interface

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

  // Asynchronous method to find all users
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

  // Method to add a post to a user's list of posts
  async addPostToUser(
    userId: Types.ObjectId,
    postId: Types.ObjectId,
  ): Promise<void> {
    await User.findByIdAndUpdate(userId, { $push: { posts: postId } }).exec()
  }
}
