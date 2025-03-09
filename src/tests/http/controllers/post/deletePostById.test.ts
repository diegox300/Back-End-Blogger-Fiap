/* eslint-disable no-undef */
import 'dotenv/config' // Loads environment variables from the .env.test file
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../../../app'
import Post, { PostType } from '../../../../models/post.model'
import User from '../../../../models/user.model' // Import the User model
import { env } from '../../../../env'
import { Request, Response, NextFunction } from 'express'

// Mockando o middleware de autenticação para ignorá-lo durante os testes
jest.mock('../../../../middleware/auth', () => ({
  authMiddleware: (req: Request, res: Response, next: NextFunction) => next(), // Ignora o middleware, chamando next() diretamente
}))

// MongoDB URI for testing, defaults to a local instance if not provided
const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

// Connect to MongoDB before all tests
beforeAll(async () => {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(mongoUri) // Establish connection to the database
  console.log('Connected to MongoDB')
}, 30000) // Increase timeout to 30 seconds

describe('Delete Post by ID', () => {
  let postId: string // Variable to hold the ID of the post to be deleted
  let userId: string // Variable to hold the ID of the user

  // Create a test post before each test
  beforeEach(async () => {
    // Create a user for the author field
    const user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    })
    const savedUser = await user.save()
    userId = savedUser._id.toString() // Store the ID of the created user

    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
      author: userId, // Set the author as the created user ID
    })
    const savedPost: PostType = await post.save() // Save the post to the database
    postId = savedPost._id.toString() // Store the ID of the saved post
  })

  // Clean up the database after each test
  afterEach(async () => {
    await Post.deleteMany({}) // Delete all posts from the database
    await User.deleteMany({}) // Delete all users from the database
  })

  // Test case for deleting a post with a non-existent ID
  it('should return 404 if post ID is not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString() // Generate a new non-existent ID
    const res = await request(app).delete(`/posts/${nonExistentId}`) // Attempt to delete the post
    expect(res.statusCode).toEqual(404) // Check if the response status code is 404 (Not Found)
    expect(res.body).toHaveProperty('message', `ID ${nonExistentId} not found`) // Check the error message
  })

  // Test case for handling an invalid post ID
  it('should return 400 for invalid post ID', async () => {
    const invalidId = '12345' // Invalid ID format
    const res = await request(app).delete(`/posts/${invalidId}`) // Attempt to delete the post
    expect(res.statusCode).toEqual(400) // Check if the response status code is 400 (Bad Request)
  })

  // Test case to handle errors when deleting a post by ID
  it('should handle error when deleting a post by ID', async () => {
    jest.spyOn(Post, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('Database error') // Simulate a database error
    })
    const res = await request(app).delete(`/posts/${postId}`) // Attempt to delete the post
    expect(res.statusCode).toEqual(500) // Check if the response status code is 500 (Internal Server Error)
  })

  // Test case for successfully deleting a post by its ID
  it('should return 200 and delete the post if the post ID is found', async () => {
    const res = await request(app).delete(`/posts/${postId}`) // Attempt to delete the post
    expect(res.statusCode).toEqual(200) // Check if the response status code is 200 (OK)
    expect(res.body).toHaveProperty('message', 'Post deleted successfully') // Check the success message
  })
})
