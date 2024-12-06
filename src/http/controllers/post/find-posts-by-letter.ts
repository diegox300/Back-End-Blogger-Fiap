import { Request, Response } from 'express' // Import Request and Response types from express
import { makeFindPostsByLetterUseCase } from '../../../use-cases/factory/posts/make-find-posts-by-letter-usecase' // Importing the factory function to create the use case for finding posts by letter
import { asyncHandler } from '../../../middleware/asyncHandler' // Importing middleware for handling async operations

// Get posts by letter
export const getPostsByLetter = asyncHandler(
  async (req: Request, res: Response) => {
    const { letter } = req.params // Extracting the letter from the request parameters

    const findPostsByLetterUseCase = makeFindPostsByLetterUseCase() // Creating an instance of the use case for finding posts by letter

    // Fetching the posts using the provided letter
    const posts = await findPostsByLetterUseCase.handler(letter)

    // Respond with the found posts and a 200 status
    res.status(200).send(posts)
  },
)
