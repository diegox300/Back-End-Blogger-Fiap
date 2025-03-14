/* eslint-disable no-undef */
import 'dotenv/config' // Loads environment variables from the .env.test file
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../../app'
import Post, { PostType } from '../../models/post.model'
import User, { UserType } from '../../models/user.model'
import { env } from '../../env/index'
import { Request, Response, NextFunction } from 'express'

// Mockando o middleware de autenticação para ignorá-lo durante os testes
jest.mock('../../middleware/auth', () => ({
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

  // Create a test user and post before each test
  beforeEach(async () => {
    const user = new User({
      name: 'Test User',
      email: 'testusercase@example.com',
      password: 'password123',
      isAdmin: true,
    })
    const savedUser: UserType = await user.save() // Save the user to the database
    userId = savedUser._id.toString() // Store the ID of the saved user

    const post = new Post({
      title: 'Test Post',
      content: 'This is a test post',
      author: userId,
    })
    const savedPost: PostType = await post.save() // Save the post to the database
    postId = savedPost._id.toString() // Store the ID of the saved post

    // Add the post ID to the user's list of posts
    await User.findByIdAndUpdate(userId, { $push: { posts: postId } })
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

  // Test case for deleting a post and removing the post ID from the user's list of posts
  it("should delete a post and remove the post ID from the user's list of posts", async () => {
    const res = await request(app).delete(`/posts/${postId}`) // Attempt to delete the post
    expect(res.statusCode).toEqual(200) // Check if the response status code is 200 (OK)
    expect(res.body).toHaveProperty('message', 'Post deleted successfully') // Check the success message

    const user = await User.findById(userId) // Fetch the user from the database
    expect(user?.posts).not.toContain(postId) // Check if the post ID is removed from the user's list of posts
  })
})
