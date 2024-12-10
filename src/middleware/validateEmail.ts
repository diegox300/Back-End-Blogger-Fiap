import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

// Define the schema for validating the email
const emailSchema = z.object({
  email: z.string().email('Invalid email format'), // Email must be a valid email format
})

// Middleware to validate the email
export const validateEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = emailSchema.safeParse(req.params) // Parse and validate the request parameters
  if (!result.success) {
    return res
      .status(400)
      .json({ message: 'Validation error', errors: result.error.errors }) // Respond with 400 if validation fails
  }
  next() // Proceed to the next middleware if validation passes
}
