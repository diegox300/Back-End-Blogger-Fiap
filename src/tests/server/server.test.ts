/* eslint-disable no-undef */

import mongoose from 'mongoose' // Import mongoose for database interaction
import app from '../../app' // Import the application instance
import { setupSwagger } from '../../middleware/swagger' // Import the Swagger setup function
import http from 'http'

jest.mock('../../middleware/swagger') // Mock the Swagger middleware module

let server: http.Server // Variável para manter a instância do servidor

beforeAll(async () => {
  // Setting environment variables for tests
  process.env.MONGO_URI = 'mongodb://localhost:27017/tech-challenge' // Test database URL
  process.env.PORT = '3001' // Set the port for the application

  // Iniciar o servidor manualmente para poder controlar a porta
  server = app.listen(process.env.PORT, () => {
    console.log(`Test server running on port ${process.env.PORT}`)
  })

  // Initialize the app here to make sure it uses the port defined above
  await import('../../server')
})

// Mock console.error to prevent actual error logging during tests
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

afterAll(async () => {
  // Fechar a conexão do MongoDB após os testes
  await mongoose.connection.close()

  // Fechar o servidor após os testes
  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err)
      else {
        console.log('Server closed after tests')
        resolve()
      }
    })
  })

  consoleErrorSpy.mockRestore() // Restore the original console.error implementation
})

describe('Server Setup', () => {
  it('should set up Swagger', () => {
    // Verify that the setupSwagger function was called with the app instance
    expect(setupSwagger).toHaveBeenCalledWith(app)
  })
})
