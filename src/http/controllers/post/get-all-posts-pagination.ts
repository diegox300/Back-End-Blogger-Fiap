import { Request, Response, NextFunction } from 'express'
import { makeGetAllPostsPaginationUseCase } from '../../../use-cases/factory/posts/make-get-all-posts-pagination-usecase'
import { UserType } from '../../../models/user.model'

// Get all posts with pagination
export const getAllPostsPagination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const getAllPostsPaginationUseCase = makeGetAllPostsPaginationUseCase()

  const page = parseInt(req.query.page as string) || 1 // Get the page number from query parameters, default to 1 if not provided
  const limit = 10 // Define the limit of posts per page
  const offset = (page - 1) * limit // Calculate the offset

  getAllPostsPaginationUseCase
    .execute(offset, limit)
    .then((result) => {
      const postsWithAuthor = result.posts.map((post) => ({
        ...post,
        author: (post.author as UserType).name, // Replace the author ID with the author's name
      }))
      res.status(200).send({ posts: postsWithAuthor, total: result.total })
    })
    .catch(next) // Pass the error to the error handling middleware
}
