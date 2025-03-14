/* eslint-disable no-undef */

// Import necessary modules and configurations
import 'dotenv/config' // Load environment variables from the .env.test file
import request from 'supertest' // Import supertest for HTTP assertions
import mongoose from 'mongoose' // Import mongoose for MongoDB interactions
import app from '../app' // Import the Express application
import { env } from '../env' // Import environment variables
import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model' // Import the User model
import Post from '../models/post.model' // Import the Post model

// Mockando o middleware de autenticação para ignorá-lo durante os testes
jest.mock('../middleware/auth', () => ({
  authMiddleware: (req: Request, res: Response, next: NextFunction) => next(), // Ignora o middleware, chamando next() diretamente
}))

// Define the MongoDB URI, using the environment variable or a local default
const mongoUri =
  env.MONGO_URI || 'mongodb://localhost:27017/tech-challenge-2-test'

// Connect to MongoDB before all tests
beforeAll(async () => {
  try {
    console.log('Connecting to MongoDB...') // Log connection attempt
    await mongoose.connect(mongoUri) // Establish connection to MongoDB
    console.log('Connected to MongoDB') // Log successful connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error) // Log any connection errors
  }
}, 30000) // Set the timeout for connection to 30 seconds

// Clean up the database after each test
afterEach(async () => {
  await Post.deleteMany({}) // Delete all posts from the database
  await User.deleteMany({}) // Delete all users from the database to avoid conflicts
})

// Test suite for Post routes
describe('Post Routes', () => {
  // Test case for creating a new post
  it('should create a new post', async () => {
    // Create a user before creating the post
    const user = new User({
      name: 'Test User',
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    })
    const savedUser = await user.save() // Save the user to the database

    // Send a POST request to the /posts endpoint with the post data
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post', // Set the title of the post
        content: 'This is a test post', // Set the content of the post
        author: savedUser._id.toString(), // Attach the created user as the author of the post
      })
      .set('Authorization', 'Bearer fake_token') // Adding a fake token header to simulate authentication

    // Assertions to verify the response
    expect(res.statusCode).toEqual(201) // Expect a 201 Created status code
    expect(res.body).toHaveProperty('_id') // Expect the response body to contain an '_id' property
    expect(res.body.title).toBe('Test Post') // Expect the title to match the input
  })
})
